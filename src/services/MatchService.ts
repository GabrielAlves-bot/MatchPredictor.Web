import type { IMatch } from "../types/MatchType";
import { fetchData } from "./BaseRequest";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_ENDPOINT = `${API_BASE_URL}/Match`;

export async function get(): Promise<IMatch[]> {
    const response = await fetchData(BASE_ENDPOINT, "GET");

    if (response.status !== 200)
        throw new Error("Error on get matches!");

    return await response.json();
}