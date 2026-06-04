import { useCallback, useEffect, useMemo, useState } from "react";
import { MatchPhase } from "../enums/MatchPhase";
import type { IBracketGuess } from "../types/BracketGuess";
import type { IGroupMatch } from "../types/GroupMatch";
import {
  getBracketGuesses,
  updateBracketGuesses,
} from "../services/BracketGuessService";
import { getGroupMatches } from "../services/MatchService";
import {
  buildSelectionOrder,
  buildGroupStagePhase,
  buildDerivedGuesses,
  computeGroupStageTotals,
  countSelectedThirdPlace,
} from "../helpers/bracketHelpers";
import { GROUP_QUALIFIERS, MAX_SELECTABLE_PER_GROUP, THIRD_PLACE_SLOTS } from "../constants/bracketConstants";
import type { UseBracketResult } from "../types/BracketTypes";

export function useBracket(poolParticipantId: number): UseBracketResult {
  const [groupMatches, setGroupMatches] = useState<IGroupMatch[]>([]);
  const [savedGuesses, setSavedGuesses] = useState<IBracketGuess[]>([]);
  const [selectionOrder, setSelectionOrder] = useState<Map<string, number[]>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (!poolParticipantId) return;

    setIsLoading(true);

    Promise.all([
      getGroupMatches(),
      getBracketGuesses(poolParticipantId),
    ])
      .then(([matches, guesses]: [IGroupMatch[], IBracketGuess[]]) => {
        setGroupMatches(matches);
        setSavedGuesses(guesses);
        setSelectionOrder(buildSelectionOrder(matches, guesses));
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [poolParticipantId]);

  const thirdPlaceFull = useMemo(
    () => countSelectedThirdPlace(groupMatches, selectionOrder) >= THIRD_PLACE_SLOTS,
    [groupMatches, selectionOrder]
  );

  const phases = useMemo(
    () => [buildGroupStagePhase(groupMatches, selectionOrder, thirdPlaceFull)],
    [groupMatches, selectionOrder, thirdPlaceFull, savedGuesses]
  );

  const { totalSelected, totalSlots } = useMemo(() => {
    const activePhase = phases[activeTab];
    if (!activePhase) return { totalSelected: 0, totalSlots: 0 };

    if (activePhase.phase === MatchPhase.GroupStage) {
      return computeGroupStageTotals(activePhase);
    }

    return { totalSelected: 0, totalSlots: 0 };
  }, [phases, activeTab]);

  const derivedGuesses = useMemo(
    () => buildDerivedGuesses(groupMatches, selectionOrder),
    [groupMatches, selectionOrder]
  );

  const isReadOnly = useMemo(
    () => savedGuesses.length > 0 && savedGuesses.every((g) => g.blocked),
    [savedGuesses]
  );

  const toggle = useCallback((groupKey: string, teamId: number) => {
    if (isReadOnly) return;

    setSelectionOrder((prev) => {
      const current = prev.get(groupKey) ?? [];
      const isSelected = current.includes(teamId);

      const totalSelected = Array.from(prev.values()).reduce(
        (sum, ids) => sum + ids.length,
        0
      );

      if (isSelected) {
        if (totalSelected >= 32 && current.length <= GROUP_QUALIFIERS) {
          return prev;
        }
        return new Map(prev).set(groupKey, current.filter((id) => id !== teamId));
      }

      if (totalSelected >= 32) {
        return prev;
      }

      const thirdPlaceCount = countSelectedThirdPlace(groupMatches, prev);
      const thirdPlaceFull = thirdPlaceCount >= THIRD_PLACE_SLOTS;
      const groupHasThirdSelected = current.length > GROUP_QUALIFIERS;

      const maxSelectable =
        thirdPlaceFull && !groupHasThirdSelected
          ? GROUP_QUALIFIERS
          : MAX_SELECTABLE_PER_GROUP;

      if (current.length >= maxSelectable) {
        return prev;
      }

      return new Map(prev).set(groupKey, [...current, teamId]);
    });
  }, [groupMatches, isReadOnly]);

  const save = useCallback(
    async (participantId: number) => {
      setIsSaving(true);
      setError(null);
      try {
        await updateBracketGuesses(participantId, derivedGuesses);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsSaving(false);
      }
    },
    [derivedGuesses]
  );

  return {
    phases,
    activeTab,
    setActiveTab,
    isLoading,
    isSaving,
    error,
    totalSelected,
    totalSlots,
    toggle,
    save,
    isReadOnly,
  };
}