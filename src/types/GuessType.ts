export interface IGuess {
    id: number;
    poolParticipantId: number;
    matchId: number;
    homeGoals?: number;
    awayGoals?: number;
}