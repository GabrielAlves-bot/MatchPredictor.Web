import type { IGuess } from "./GuessType";

export interface IUpdateGuessRequest {
  poolParticipantId: number;
  guesses: IGuess[];
}