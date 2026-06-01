import type { IPredictionDeadline } from "../types/PredictionDeadline";
import { fetchData } from "./BaseRequest";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_ENDPOINT = `${API_BASE_URL}/PredictionDeadline`;

export async function getPredictionDeadlines(championshipId: number): Promise<IPredictionDeadline[]> {
  const response = await fetchData(`${BASE_ENDPOINT}/${championshipId}`, "GET");

  if (!response.ok)
    throw new Error("Error on get prediction deadlines!");

  return response.json();
}

export async function updatePredictionDeadlines(predictionDeadlines: IPredictionDeadline[]): Promise<boolean> {

  const jsonBody = JSON.stringify(predictionDeadlines);

  const response = await fetchData(BASE_ENDPOINT, "PUT", jsonBody);

  if (!response.ok)
    throw new Error("Error on update prediction deadlines!");

  return response.json();
}