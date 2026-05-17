import type { IUserProfile } from "../types/UserProfile";
import { fetchData } from "./BaseRequest";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_ENDPOINT = `${API_BASE_URL}/User`;

export async function getMe(): Promise<IUserProfile> {
    const response = await fetchData(BASE_ENDPOINT, "GET");

    if (response.status !== 200)
        throw new Error("Error on get user profile!");

    return await response.json();
}