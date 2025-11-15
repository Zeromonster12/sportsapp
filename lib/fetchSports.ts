import { apiRequest } from "./api";

export async function fetchSports(): Promise<any[]> {
  const data = await apiRequest<{ sports?: any[] }>("/sports");
  return data?.sports || [];
}

export const revalidate = 300;
