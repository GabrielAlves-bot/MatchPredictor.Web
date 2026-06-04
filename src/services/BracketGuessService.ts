import type { IBracketGuess } from "../types/BracketGuess";
import { fetchData } from "./BaseRequest";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_ENDPOINT = `${API_BASE_URL}/BracketGuess`;

export async function getBracketGuesses(idPoolParticipant: number): Promise<IBracketGuess[]> {
  const response = await fetchData(`${BASE_ENDPOINT}?idPoolParticipant=${idPoolParticipant}`, "GET");

  if (!response.ok)
    throw new Error("Error on get bracket guesses!");

  return response.json();
}

export async function updateBracketGuesses(poolParticipantId: number, guesses: IBracketGuess[]): Promise<boolean> {

  const jsonBody = JSON.stringify(guesses);

  const response = await fetchData(`${BASE_ENDPOINT}?idPoolParticipant=${poolParticipantId}`, "PUT", jsonBody);

  if (!response.ok)
    throw new Error("Error on update bracket guesses!");

  return response.json();
}
