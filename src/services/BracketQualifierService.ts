import type { IBracketQualifier } from "../types/BracketQualifierType";
import { fetchData } from "./BaseRequest";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_ENDPOINT = `${API_BASE_URL}/BracketQualifier`;

export async function getBracketQualifiers(): Promise<IBracketQualifier[]> {
  const response = await fetchData(`${BASE_ENDPOINT}`, "GET");

  if (!response.ok)
    throw new Error("Error on get bracket guesses!");

  return response.json();
}

export async function updateBracketQualifiers(guesses: IBracketQualifier[]): Promise<boolean> {

  const jsonBody = JSON.stringify(guesses);

  const response = await fetchData(`${BASE_ENDPOINT}`, "PUT", jsonBody);

  if (!response.ok)
    throw new Error("Error on update bracket guesses!");

  return response.json();
}
