import { NextRequest, NextResponse } from "next/server";
import { fetchEvents } from "../../../lib/fetchEvents";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sport = searchParams.get("sport") || undefined;

    const events = await fetchEvents(sport);

    return NextResponse.json({ events, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error("Events API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch events", events: [] },
      { status: 500 }
    );
  }
}
