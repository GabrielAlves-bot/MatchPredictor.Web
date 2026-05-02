import type { IRequestMethod } from "../types/RequestMethodType";

export async function fetchData(endpoint: string, requestMethod: IRequestMethod, jsonBody?: string): Promise<Response> {
  const token = localStorage.getItem("token");

  const requestProperties: RequestInit = {
    method: requestMethod,
    headers: {
      ...(jsonBody && { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  if (jsonBody !== undefined) {
    requestProperties.body = jsonBody;
  }

  const response = await fetch(endpoint, requestProperties);
  return response;
}