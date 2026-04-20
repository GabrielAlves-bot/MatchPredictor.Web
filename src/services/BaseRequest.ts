import type { RequestMethod } from "../types/RequestMethodType";

export async function fetchData(endpoint: string, requestMethod: RequestMethod, jsonBody?: string): Promise<Response>{
    let requestProperties: RequestInit  = {
        method: requestMethod,
        headers: {'Content-Type': 'application/json', },
    }

    if(jsonBody){
        requestProperties.body = jsonBody;
    }

    const response = await fetch(endpoint, requestProperties);
    return response;
}