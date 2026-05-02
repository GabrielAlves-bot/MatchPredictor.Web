import type { IGuess } from "../types/GuessType";
import type { IUpdateGuessRequest } from "../types/UpdateGuessRequest";
import { fetchData } from "./BaseRequest";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_ENDPOINT = `${API_BASE_URL}/Guess`;

export async function getGuesses(idPoolParticipant: number): Promise<IGuess[]> {
  const response = await fetchData(`${BASE_ENDPOINT}?idPoolParticipant=${idPoolParticipant}`, "GET");

  if (!response.ok)
    throw new Error("Error on get guesses!");

  return response.json();
}

export async function updateGuesses(poolParticipantId: number, guesses: IGuess[]): Promise<boolean> {

  const body: IUpdateGuessRequest = {
    poolParticipantId,
    guesses,
  };

  const jsonBody = JSON.stringify(body);

  const response = await fetchData(BASE_ENDPOINT, "PUT", jsonBody);

  if (!response.ok)
    throw new Error("Error on get guesses!");

  return response.json();
}