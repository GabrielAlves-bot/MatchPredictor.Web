import type { IPoolSummary } from "../types/PoolSummary";
import { fetchData } from "./BaseRequest";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_ENDPOINT = `${API_BASE_URL}/PoolParticipant`;

export async function getMyPools(): Promise<IPoolSummary[]> {
    const response = await fetchData(BASE_ENDPOINT, "GET");

    if (response.status !== 200)
        throw new Error("Error on get pool participant summary!");

    return await response.json();
}