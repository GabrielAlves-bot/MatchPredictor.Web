import type { IRequestMethod } from "../types/RequestMethodType";

type UnauthorizedCallback = () => void;

let onUnauthorizedCallback: UnauthorizedCallback | null = null;

export function registerUnauthorizedCallback(callback: UnauthorizedCallback): void {
  onUnauthorizedCallback = callback;
}

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

  if (response.status === 401) {
    onUnauthorizedCallback?.();
  }

  return response;
}