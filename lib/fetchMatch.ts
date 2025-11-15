import { apiRequestMultiple } from "./api";

export async function fetchMatch(id: string): Promise<any | null> {
  const paths = [`/events/${id}`, `/event/${id}`];
  const data = await apiRequestMultiple<any>(paths);

  if (data) {
    return data.event || data;
  }

  return null;
}
