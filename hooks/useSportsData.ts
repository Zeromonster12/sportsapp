import { useState, useEffect } from "react";

interface Sport {
  id: string;
  name: string;
}

export function useSportsData() {
  const [sports, setSports] = useState<Sport[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        const sportsData = data.sports || [];
        const normalized = sportsData.map((s: any) => ({
          id: String(s.sport_id || s.id),
          name: String(s.sport_name || s.name || s.title || "Unknown"),
        }));
        setSports(normalized);
      } catch (error) {
        console.error("Failed to fetch sports:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSports();
  }, []);

  const getSportName = (sportId: string) => {
    const sport = sports.find((s) => s.id === sportId);
    return sport?.name || `Sport ${sportId}`;
  };

  return { sports, getSportName, isLoading };
}
