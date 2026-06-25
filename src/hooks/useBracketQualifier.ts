import { useCallback, useEffect, useMemo, useState } from "react";
import { KnockoutStage } from "../enums/KnockoutStage";
import { MatchPhase } from "../enums/MatchPhase";
import type { IBracketQualifier } from "../types/BracketQualifierType";
import type { ITeam } from "../types/TeamType";
import { getBracketQualifiers, updateBracketQualifiers } from "../services/BracketQualifierService";
import { getTeams } from "../services/TeamService";
import KNOCKOUT_LABELS from "../constants/KnockoutLabels";
import {
  STAGE_ORDER,
  SLOTS_PER_STAGE,
  PREDECESSOR_STAGE,
} from "./useBracket";
import { settle } from "../services/PoolService";

export interface QualifierSlot {
  slotIndex: number;
  stage: KnockoutStage;
  team: ITeam | null;
  qualifierId: number;
}

export interface QualifierStageView {
  stage: KnockoutStage;
  label: string;
  slots: QualifierSlot[];
  filledCount: number;
  totalSlots: number;
  availableTeams: ITeam[];
}

interface UseBracketQualifierResult {
  stages: QualifierStageView[];
  activeStage: KnockoutStage;
  setActiveStage: (s: KnockoutStage) => void;
  teams: ITeam[];
  isLoading: boolean;
  isSaving: boolean;
  isReadOnly: boolean;
  error: string | null;
  selectTeam: (stage: KnockoutStage, slotIndex: number, team: ITeam) => void;
  clearSlot: (stage: KnockoutStage, slotIndex: number) => void;
  save: () => Promise<void>;
}

function stageKey(stage: KnockoutStage, slotIndex: number) {
  return `${stage}_${slotIndex}`;
}

function getTeamsInStage(slots: Map<string, QualifierSlot>, stage: KnockoutStage): ITeam[] {
  const count = SLOTS_PER_STAGE[stage];
  const result: ITeam[] = [];
  for (let i = 0; i < count; i++) {
    const team = slots.get(stageKey(stage, i))?.team;
    if (team) result.push(team);
  }
  return result;
}

export function useBracketQualifier(isAdmin: boolean): UseBracketQualifierResult {
  const [slots, setSlots] = useState<Map<string, QualifierSlot>>(new Map());
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeStage, setActiveStage] = useState<KnockoutStage>(KnockoutStage.RoundOf32);

  const isReadOnly = !isAdmin;

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    Promise.all([getTeams(), getBracketQualifiers()])
      .then(([allTeams, qualifiers]) => {
        setTeams(allTeams);
        const teamMap = new Map(allTeams.map((t) => [t.id, t]));
        const map = new Map<string, QualifierSlot>();

        for (const stage of STAGE_ORDER) {
          const stageQualifiers = qualifiers.filter((q) => q.knockoutStage === stage);

          const filled = stageQualifiers.filter((q) => q.teamId != null).sort((a, b) => a.id - b.id);
          const empty = stageQualifiers.filter((q) => q.teamId == null).sort((a, b) => a.id - b.id);
          const ordered = [...filled, ...empty];

          ordered.forEach((q, idx) => {
            const key = stageKey(stage, idx);
            map.set(key, {
              slotIndex: idx,
              stage,
              team: q.teamId != null ? (teamMap.get(q.teamId) ?? null) : null,
              qualifierId: q.id,
            });
          });

          const expected = SLOTS_PER_STAGE[stage];
          for (let i = ordered.length; i < expected; i++) {
            const key = stageKey(stage, i);
            if (!map.has(key)) {
              map.set(key, { slotIndex: i, stage, team: null, qualifierId: 0 });
            }
          }
        }

        setSlots(map);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const stages = useMemo<QualifierStageView[]>(() => {
    return STAGE_ORDER.map((stage) => {
      const stageSlots = Array.from(
        { length: SLOTS_PER_STAGE[stage] },
        (_, i) =>
          slots.get(stageKey(stage, i)) ?? {
            slotIndex: i,
            stage,
            team: null,
            qualifierId: 0,
          }
      );

      const pickedIdsInStage = new Set(
        stageSlots.map((s) => s.team?.id).filter((id): id is number => id != null)
      );

      const predecessorStage = PREDECESSOR_STAGE[stage];
      const teamPool = predecessorStage
        ? getTeamsInStage(slots, predecessorStage)
        : teams;

      const availableTeams = teamPool.filter((t) => !pickedIdsInStage.has(t.id));

      return {
        stage,
        label: KNOCKOUT_LABELS[stage] ?? String(stage),
        slots: stageSlots,
        filledCount: stageSlots.filter((s) => s.team !== null).length,
        totalSlots: SLOTS_PER_STAGE[stage],
        availableTeams,
      };
    });
  }, [slots, teams]);

  const selectTeam = useCallback(
    (stage: KnockoutStage, slotIndex: number, team: ITeam) => {
      if (isReadOnly) return;

      setSlots((prev) => {
        const count = SLOTS_PER_STAGE[stage];
        for (let i = 0; i < count; i++) {
          if (i === slotIndex) continue;
          if (prev.get(stageKey(stage, i))?.team?.id === team.id) return prev;
        }

        const predecessorStage = PREDECESSOR_STAGE[stage];
        if (predecessorStage) {
          const predecessorTeams = getTeamsInStage(prev, predecessorStage);
          if (!predecessorTeams.some((t) => t.id === team.id)) return prev;
        }

        const next = new Map(prev);
        const key = stageKey(stage, slotIndex);
        const existing = next.get(key);
        if (!existing) return prev;
        next.set(key, { ...existing, team });
        return next;
      });
    },
    [isReadOnly]
  );

  const clearSlot = useCallback(
    (stage: KnockoutStage, slotIndex: number) => {
      if (isReadOnly) return;

      setSlots((prev) => {
        const next = new Map(prev);
        const key = stageKey(stage, slotIndex);
        const existing = next.get(key);
        if (!existing || !existing.team) return prev;

        const removedTeamId = existing.team.id;
        next.set(key, { ...existing, team: null });

        const stageIdx = STAGE_ORDER.indexOf(stage);
        for (let s = stageIdx + 1; s < STAGE_ORDER.length; s++) {
          const laterStage = STAGE_ORDER[s];
          for (let i = 0; i < SLOTS_PER_STAGE[laterStage]; i++) {
            const lKey = stageKey(laterStage, i);
            const lSlot = next.get(lKey);
            if (lSlot?.team?.id === removedTeamId) {
              next.set(lKey, { ...lSlot, team: null });
            }
          }
        }

        return next;
      });
    },
    [isReadOnly]
  );

  const save = useCallback(async () => {
    if (isReadOnly) return;

    setIsSaving(true);
    setError(null);
    try {
      const qualifiers: IBracketQualifier[] = [];
      for (const stage of STAGE_ORDER) {
        for (let i = 0; i < SLOTS_PER_STAGE[stage]; i++) {
          const slot = slots.get(stageKey(stage, i));
          if (!slot) continue;
          qualifiers.push({
            id: slot.qualifierId,
            teamId: slot.team?.id ?? null,
            knockoutStage: stage,
            matchPhase: MatchPhase.Knockout,
          });
        }
      }
      await updateBracketQualifiers(qualifiers);
      settle(1);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSaving(false);
    }
  }, [isReadOnly, slots]);

  return {
    stages,
    activeStage,
    setActiveStage,
    teams,
    isLoading,
    isSaving,
    isReadOnly,
    error,
    selectTeam,
    clearSlot,
    save,
  };
}