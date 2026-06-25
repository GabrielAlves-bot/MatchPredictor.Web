import type { IBracketQualifierRule } from "../types/BracketQualifierRuleType";
import { fetchData } from "./BaseRequest";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_ENDPOINT = `${API_BASE_URL}/BracketQualifierRule`;

export async function getBracketQualifierRules(poolId: number): Promise<IBracketQualifierRule[]> {
  const response = await fetchData(`${BASE_ENDPOINT}?poolId=${poolId}`, "GET");

  if (!response.ok)
    throw new Error("Error on get scoring rules!");

  return response.json();
}

export async function updateBracketQualifierRules(bracketQualifierRules: IBracketQualifierRule[]): Promise<boolean> {

  const jsonBody = JSON.stringify(bracketQualifierRules);

  const response = await fetchData(BASE_ENDPOINT, "PUT", jsonBody);

  if (!response.ok)
    throw new Error("Error on update scoring rules!");

  return response.json();
}