import { KnockoutStage } from "../enums/KnockoutStage";
import { MatchPhase } from "../enums/MatchPhase";
import type { IMatch } from "../types/MatchType";

export function getUniqueGroups(matches: IMatch[]): string[] {
  const groups = matches
    .filter((m) => m.phase === MatchPhase.GroupStage && m.group)
    .map((m) => m.group as string);
  return [...new Set(groups)].sort();
}

export function getKnockoutStages(matches: IMatch[]): string[] {
  const order = [
    KnockoutStage.RoundOf32,
    KnockoutStage.RoundOf16,
    KnockoutStage.QuarterFinal,
    KnockoutStage.SemiFinal,
    KnockoutStage.Final,
  ];
  const present = new Set(
    matches
      .filter((m) => m.phase === MatchPhase.Knockout && m.knockoutStage !== KnockoutStage.None)
      .map((m) => m.knockoutStage)
  );
  return order.filter((s) => present.has(s)).map(String);
}