import { apiRequest } from "./api";

export async function fetchEvents(sport: string): Promise<any[]> {
  const today = new Date().toISOString().split("T")[0];
  const path = `/sports/${sport}/events/${today}`;
  const data = await apiRequest<{ events?: any[] }>(path);
  return data?.events || [];
}
