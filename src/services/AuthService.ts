import type { ILoginRequest } from "../types/Auth/Requests/LoginRequest";
import type { LoginResponse } from "../types/Auth/Responses/LoginResponse";
import { fetchData } from "./BaseRequest";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_ENDPOINT = `${API_BASE_URL}/Auth`;

export async function loginRequest(credentials: ILoginRequest): Promise<LoginResponse> {

  const jsonBody = JSON.stringify(credentials); 
  console.log(jsonBody);
  const response = await fetchData(`${BASE_ENDPOINT}/Login`, "POST", jsonBody);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Erro ao fazer login." }));
    throw new Error(error?.message ?? "Erro ao fazer login.");
  }

  return response.json();
}
