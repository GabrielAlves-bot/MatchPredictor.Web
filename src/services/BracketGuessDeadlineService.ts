import { fetchData } from "./BaseRequest";
import type { IBracketGuessDeadline } from "../types/BracketGuessDeadlineType";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_ENDPOINT = `${API_BASE_URL}/BracketGuessDeadline`;

export async function getBracketGuessDeadlines(championshipId: number): Promise<IBracketGuessDeadline[]> {
  const response = await fetchData(`${BASE_ENDPOINT}/${championshipId}`, "GET");

  if (!response.ok)
    throw new Error("Error on get bracket guess deadlines!");

  return response.json();
}

export async function updateBracketGuessDeadlines(bracketGuessDeadlines: IBracketGuessDeadline[]): Promise<boolean> {

  const jsonBody = JSON.stringify(bracketGuessDeadlines);

  const response = await fetchData(BASE_ENDPOINT, "PUT", jsonBody);

  if (!response.ok)
    throw new Error("Error on update bracket guess deadlines!");

  return response.json();
}