import type { ITeam } from "../types/TeamType";
import type { MatchPhase } from "../enums/MatchPhase";
import type { KnockoutStage } from "../enums/KnockoutStage";

export interface BracketGroupView {
  key: string;
  label: string;
  teams: ITeam[];
  selectedIds: number[];
  maxSelectable: number;
  thirdPlaceFull: boolean;
  isComplete: boolean;
}

export interface BracketPhaseView {
  phase: MatchPhase;
  label: string;
  groups: BracketGroupView[];
  knockoutStage?: KnockoutStage;
}

export interface UseBracketResult {
  phases: BracketPhaseView[];
  activeTab: number;
  setActiveTab: (index: number) => void;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  totalSelected: number;
  totalSlots: number;
  toggle: (groupKey: string, teamId: number) => void;
  save: (poolParticipantId: number) => Promise<void>;
}
