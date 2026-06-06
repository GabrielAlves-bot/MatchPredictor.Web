import type { ITeam } from "../types/TeamType";
import { fetchData } from "./BaseRequest";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_ENDPOINT = `${API_BASE_URL}/Team`;

export async function getTeams(): Promise<ITeam[]> {
    console.log("Fetching teams from API...");
  const response = await fetchData(BASE_ENDPOINT, "GET");
  if (!response.ok)
    throw new Error("Error on get teams!");

  return response.json();
}