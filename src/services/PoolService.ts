import type { IPoolRanking } from "../types/PoolRankingType";
import { fetchData } from "./BaseRequest";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_ENDPOINT = `${API_BASE_URL}/Pool`;

export async function getPoolRanking(poolId: number): Promise<IPoolRanking[]> {
    const response = await fetchData(`${BASE_ENDPOINT}/${poolId}/ranking`, "GET");

    if (response.status !== 200)
        throw new Error("Error on get matches!");

    return await response.json();
}