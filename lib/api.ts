import axios, { AxiosError } from "axios";

const API_HOST =
  process.env.RUNDOWN_API_HOST || "therundown-therundown-v1.p.rapidapi.com";
const API_KEY = process.env.RUNDOWN_API_KEY || "";

interface ApiRequestOptions {
  params?: Record<string, any>;
  silent404?: boolean;
}

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T | null> {
  try {
    const { data } = await axios.get(`https://${API_HOST}${path}`, {
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": API_HOST,
      },
      params: options.params,
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const is404 = error.response?.status === 404;
      if (!is404 || !options.silent404) {
        console.warn(
          `API error [${path}]:`,
          error.response?.status,
          error.message
        );
      }
    }
    return null;
  }
}

export async function apiRequestMultiple<T>(
  paths: string[],
  options: ApiRequestOptions = {}
): Promise<T | null> {
  for (const path of paths) {
    const result = await apiRequest<T>(path, { ...options, silent404: true });
    if (result) return result;
  }
  return null;
}
