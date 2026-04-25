import type { IGuess } from "../types/GuessType";
import { fetchData } from "./BaseRequest";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_ENDPOINT = `${API_BASE_URL}/Guess?idPoolParticipant=1`;

export async function getGuesses(): Promise<IGuess[]> {
    const response = await fetchData(BASE_ENDPOINT, "GET");

    if (response.status !== 200)
        throw new Error("Error on get matches!");

    return await response.json();
}