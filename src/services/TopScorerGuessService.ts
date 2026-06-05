import type { ITopScorerGuess } from "../types/TopScorerGuessType";
import { fetchData } from "./BaseRequest";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_ENDPOINT = `${API_BASE_URL}/TopScorerGuess`;

export async function getTopScorerGuess(idPoolParticipant: number): Promise<ITopScorerGuess> {
  const response = await fetchData(`${BASE_ENDPOINT}?idPoolParticipant=${idPoolParticipant}`, "GET");

  if (!response.ok)
    throw new Error("Error on get guesses!");

  return response.json();
}

export async function updateTopScorerGuesses(playerName: string, poolParticipantId: number): Promise<boolean> {

  const body = {
    playerName,
    poolParticipantId
  };

  const jsonBody = JSON.stringify(body);

  const response = await fetchData(BASE_ENDPOINT, "PUT", jsonBody);

  if (!response.ok)
    throw new Error("Error on update guesses!");

  return response.json();
}