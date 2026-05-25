import type { IScoringRule } from "../types/ScoringRuleType";
import { fetchData } from "./BaseRequest";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_ENDPOINT = `${API_BASE_URL}/ScoringRule`;

export async function getScoringRules(poolId: number): Promise<IScoringRule[]> {
  const response = await fetchData(`${BASE_ENDPOINT}?poolId=${poolId}`, "GET");

  if (!response.ok)
    throw new Error("Error on get scoring rules!");

  return response.json();
}

export async function updateScoringRules(scoringRules: IScoringRule[]): Promise<boolean> {

  const jsonBody = JSON.stringify(scoringRules);

  const response = await fetchData(BASE_ENDPOINT, "PUT", jsonBody);

  if (!response.ok)
    throw new Error("Error on update scoring rules!");

  return response.json();
}