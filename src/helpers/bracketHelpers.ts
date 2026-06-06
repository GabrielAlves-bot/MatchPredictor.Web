// import { MatchPhase } from "../enums/MatchPhase";
// import type { IBracketGuess } from "../types/BracketGuess";
// import type { IGroupMatch } from "../types/GroupMatch";
// import {
//   GROUP_QUALIFIERS,
//   MAX_SELECTABLE_PER_GROUP,
//   THIRD_PLACE_SLOTS,
// } from "../constants/bracketConstants";
// import type { BracketPhaseView, BracketGroupView } from "../types/BracketTypes";
// import { KnockoutStage } from "../enums/KnockoutStage";

// export function groupKeyFor(match: IGroupMatch): string {
//   if (match.phase === MatchPhase.GroupStage) {
//     return `group_${match.group}`;
//   }

//   throw new Error(
//     `groupKeyFor: fase não suportada — ${match.phase}. ` +
//     "Implemente o suporte ao mata-mata antes de usar partidas desta fase."
//   );
// }

// export function buildSelectionOrder(
//   matches: IGroupMatch[],
//   savedGuesses: IBracketGuess[]
// ): Map<string, number[]> {
//   const groupMatches = matches.filter(
//     (m) => m.phase === MatchPhase.GroupStage
//   );

//   const order = new Map<string, number[]>();

//   for (const match of groupMatches) {
//     const key = groupKeyFor(match);
//     const teamIdsInGroup = new Set(match.teams.map((t) => t.id));

//     const selectedInGroup = savedGuesses
//       .filter((g) => g.enabled && teamIdsInGroup.has(g.teamId))
//       .map((g) => g.teamId);

//     if (selectedInGroup.length > 0) {
//       order.set(key, selectedInGroup);
//     }
//   }

//   return order;
// }

// export function countSelectedThirdPlace(
//   groupMatches: IGroupMatch[],
//   selectionOrder: Map<string, number[]>
// ): number {
//   return groupMatches
//     .filter((m) => m.phase === MatchPhase.GroupStage)
//     .reduce((total, match) => {
//       const selected = selectionOrder.get(groupKeyFor(match)) ?? [];
//       return total + (selected.length > GROUP_QUALIFIERS ? 1 : 0);
//     }, 0);
// }

// export function buildGroupStagePhase(
//   groupMatches: IGroupMatch[],
//   selectionOrder: Map<string, number[]>,
//   thirdPlaceFull: boolean
// ): BracketPhaseView {
//   const groups: BracketGroupView[] = groupMatches
//     .filter((m) => m.phase === MatchPhase.GroupStage)
//     .sort((a, b) => (a.group ?? "").localeCompare(b.group ?? ""))
//     .map((match) => {
//       const key = groupKeyFor(match);
//       const selected = selectionOrder.get(key) ?? [];

//       const groupHasThirdSelected = selected.length > GROUP_QUALIFIERS;

//       const maxSelectable =
//         thirdPlaceFull && !groupHasThirdSelected
//           ? GROUP_QUALIFIERS
//           : MAX_SELECTABLE_PER_GROUP;

//       return {
//         key,
//         label: `Grupo ${match.group}`,
//         teams: match.teams,
//         selectedIds: selected,
//         maxSelectable,
//         thirdPlaceFull,
//         isComplete: selected.length >= GROUP_QUALIFIERS,
//       };
//     });

//   return {
//     phase: MatchPhase.GroupStage,
//     label: "Fase de Grupos",
//     groups,
//   };
// }

// export function computeGroupStageTotals(phase: BracketPhaseView): {
//   totalSelected: number;
//   totalSlots: number;
// } {
//   const numberOfGroups = phase.groups.length;
//   const totalSlots = numberOfGroups * GROUP_QUALIFIERS + THIRD_PLACE_SLOTS;
//   const totalSelected = phase.groups.reduce(
//     (sum, group) => sum + group.selectedIds.length,
//     0
//   );
//   return { totalSelected, totalSlots };
// }

// export function buildDerivedGuesses(
//   groupMatches: IGroupMatch[],
//   selectionOrder: Map<string, number[]>
// ): IBracketGuess[] {
//   return groupMatches
//     .filter((m) => m.phase === MatchPhase.GroupStage)
//     .flatMap((match) => {
//       const key = groupKeyFor(match);
//       const selected = new Set(selectionOrder.get(key) ?? []);

//       return match.teams.map((team) => ({
//         id: 0,
//         teamId: team.id,
//         enabled: selected.has(team.id),
//         knockoutStage: KnockoutStage.None,
//         matchPhase: MatchPhase.GroupStage,   
//       }));
//     });
// }