import { useCallback, useEffect, useMemo, useState } from "react";
import { KnockoutStage } from "../enums/KnockoutStage";
import { MatchPhase } from "../enums/MatchPhase";
import type { IBracketGuess } from "../types/BracketGuess";
import type { ITeam } from "../types/TeamType";
import { getBracketGuesses, updateBracketGuesses } from "../services/BracketGuessService";
import { getTeams } from "../services/TeamService";
import KNOCKOUT_LABELS from "../constants/KnockoutLabels";

export const STAGE_ORDER: KnockoutStage[] = [
  KnockoutStage.RoundOf32,
  KnockoutStage.RoundOf16,
  KnockoutStage.QuarterFinal,
  KnockoutStage.SemiFinal,
  KnockoutStage.Final,
  KnockoutStage.Champion
];

export const SLOTS_PER_STAGE: Record<KnockoutStage, number> = {
  [KnockoutStage.None]: 0,
  [KnockoutStage.RoundOf32]: 32,
  [KnockoutStage.RoundOf16]: 16,
  [KnockoutStage.QuarterFinal]: 8,
  [KnockoutStage.SemiFinal]: 4,
  [KnockoutStage.ThirdPlaceMatch]: 2,
  [KnockoutStage.Final]: 2,
  [KnockoutStage.Champion]: 1,
};

export const PREDECESSOR_STAGE: Partial<Record<KnockoutStage, KnockoutStage>> = {
  [KnockoutStage.RoundOf16]: KnockoutStage.RoundOf32,
  [KnockoutStage.QuarterFinal]: KnockoutStage.RoundOf16,
  [KnockoutStage.SemiFinal]: KnockoutStage.QuarterFinal,  
  [KnockoutStage.ThirdPlaceMatch]: KnockoutStage.SemiFinal,
  [KnockoutStage.Final]: KnockoutStage.SemiFinal,
  [KnockoutStage.Champion]: KnockoutStage.Final,
};

export interface BracketSlot {
  slotIndex: number;
  stage: KnockoutStage;
  team: ITeam | null;
  guessId: number;
}

export interface StageView {
  stage: KnockoutStage;
  label: string;
  slots: BracketSlot[];
  filledCount: number;
  totalSlots: number;
  availableTeams: ITeam[];
}

interface UseBracketResult {
  stages: StageView[];
  activeStage: KnockoutStage;
  setActiveStage: (s: KnockoutStage) => void;
  teams: ITeam[];
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  selectTeam: (stage: KnockoutStage, slotIndex: number, team: ITeam) => void;
  clearSlot: (stage: KnockoutStage, slotIndex: number) => void;
  save: () => Promise<void>;
}

function stageKey(stage: KnockoutStage, slotIndex: number) {
  return `${stage}_${slotIndex}`;
}

function getTeamsInStage(slots: Map<string, BracketSlot>, stage: KnockoutStage): ITeam[] {
  const count = SLOTS_PER_STAGE[stage];
  const result: ITeam[] = [];
  for (let i = 0; i < count; i++) {
    const team = slots.get(stageKey(stage, i))?.team;
    if (team) result.push(team);
  }
  return result;
}

export function useBracket(poolParticipantId: number): UseBracketResult {
  const [slots, setSlots] = useState<Map<string, BracketSlot>>(new Map());
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeStage, setActiveStage] = useState<KnockoutStage>(KnockoutStage.RoundOf32);

  useEffect(() => {
    if (poolParticipantId == null) return;

    setIsLoading(true);
    setError(null);

    Promise.all([getTeams(), getBracketGuesses(poolParticipantId)])
      .then(([allTeams, guesses]) => {
        setTeams(allTeams);
        const teamMap = new Map(allTeams.map((t) => [t.id, t]));

        const map = new Map<string, BracketSlot>();

        for (const stage of STAGE_ORDER) {
          const stageGuesses = guesses
            .filter((g) => g.knockoutStage === stage)
            .sort((a, b) => a.id - b.id);

          stageGuesses.forEach((g, idx) => {
            const key = stageKey(stage, idx);
            map.set(key, {
              slotIndex: idx,
              stage,
              team: g.teamId != null ? (teamMap.get(g.teamId) ?? null) : null,
              guessId: g.id,
            });
          });

          const expected = SLOTS_PER_STAGE[stage];
          for (let i = stageGuesses.length; i < expected; i++) {
            const key = stageKey(stage, i);
            if (!map.has(key)) {
              map.set(key, { slotIndex: i, stage, team: null, guessId: 0 });
            }
          }
        }

        setSlots(map);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [poolParticipantId]);

  const stages = useMemo<StageView[]>(() => {
    return STAGE_ORDER.map((stage) => {
      const stageSlots = Array.from(
        { length: SLOTS_PER_STAGE[stage] },
        (_, i) =>
          slots.get(stageKey(stage, i)) ?? {
            slotIndex: i,
            stage,
            team: null,
            guessId: 0,
          }
      );

      const pickedIdsInStage = new Set(
        stageSlots.map((s) => s.team?.id).filter((id): id is number => id != null)
      );

      const predecessorStage = PREDECESSOR_STAGE[stage];
      let teamPool: ITeam[];

      if (!predecessorStage) {
        teamPool = teams;
      } else {
        teamPool = getTeamsInStage(slots, predecessorStage);
      }

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
    []
  );

  const clearSlotCascading = useCallback((stage: KnockoutStage, slotIndex: number) => {
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
        const slotCount = SLOTS_PER_STAGE[laterStage];
        for (let i = 0; i < slotCount; i++) {
          const lKey = stageKey(laterStage, i);
          const lSlot = next.get(lKey);
          if (lSlot?.team?.id === removedTeamId) {
            next.set(lKey, { ...lSlot, team: null });
          }
        }
      }

      return next;
    });
  }, []);

  const save = useCallback(async () => {
    setIsSaving(true);
    setError(null);
    try {
      const guesses: IBracketGuess[] = [];
      for (const stage of STAGE_ORDER) {
        for (let i = 0; i < SLOTS_PER_STAGE[stage]; i++) {
          const slot = slots.get(stageKey(stage, i));
          if (!slot) continue;
          guesses.push({
            id: slot.guessId,
            teamId: slot.team?.id ?? null,
            knockoutStage: stage,
            matchPhase: MatchPhase.Knockout,
          });
        }
      }
      await updateBracketGuesses(poolParticipantId, guesses);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSaving(false);
    }
  }, [slots, poolParticipantId]);

  return {
    stages,
    activeStage,
    setActiveStage,
    teams,
    isLoading,
    isSaving,
    error,
    selectTeam,
    clearSlot: clearSlotCascading,
    save,
  };
}