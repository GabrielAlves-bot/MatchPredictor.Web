import type { IGuess } from "../types/GuessType";
import { fetchData } from "./BaseRequest";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_ENDPOINT = `${API_BASE_URL}/Guess`;

export async function getGuesses(idPoolParticipant: number): Promise<IGuess[]> {
    const response = await fetchData(`${BASE_ENDPOINT}?idPoolParticipant=${idPoolParticipant}`, "GET");

  if (!response.ok)
    throw new Error("Error on get guesses!");

  return response.json();
}