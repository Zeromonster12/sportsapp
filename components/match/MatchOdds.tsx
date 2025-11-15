import React from "react";
import { OddsInfo } from "@/lib/matchUtils";

interface MatchOddsProps {
  odds: OddsInfo;
  homeTeam: string;
  awayTeam: string;
}

export function MatchOdds({ odds, homeTeam, awayTeam }: MatchOddsProps) {
  const { moneyline, spread, total } = odds;

  if (!moneyline && !spread && !total) return null;

  return (
    <div className="mt-6">
      <div className="text-sm font-medium text-zinc-300 mb-3">Kurzy</div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {moneyline && (
          <div className="rounded bg-zinc-900 p-4">
            <div className="text-xs text-zinc-500 mb-2">Moneyline</div>
            <div className="text-sm text-zinc-300">
              <div className="flex justify-between">
                <span>{homeTeam}</span>
                <span className="font-medium">
                  {moneyline.home ?? moneyline.h ?? "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{awayTeam}</span>
                <span className="font-medium">
                  {moneyline.away ?? moneyline.a ?? "-"}
                </span>
              </div>
              {moneyline.draw != null && (
                <div className="flex justify-between">
                  <span>Remíza</span>
                  <span className="font-medium">{moneyline.draw}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {spread && (
          <div className="rounded bg-zinc-900 p-4">
            <div className="text-xs text-zinc-500 mb-2">Handicap</div>
            <div className="text-sm text-zinc-300">
              <div className="flex justify-between">
                <span>{homeTeam}</span>
                <span className="font-medium">
                  {spread.point_home ??
                    spread.home_point ??
                    spread.hp ??
                    spread.home ??
                    ""}{" "}
                  {spread.price_home ??
                    spread.home_price ??
                    spread.hprice ??
                    ""}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{awayTeam}</span>
                <span className="font-medium">
                  {spread.point_away ??
                    spread.away_point ??
                    spread.ap ??
                    spread.away ??
                    ""}{" "}
                  {spread.price_away ??
                    spread.away_price ??
                    spread.aprice ??
                    ""}
                </span>
              </div>
            </div>
          </div>
        )}

        {total && (
          <div className="rounded bg-zinc-900 p-4">
            <div className="text-xs text-zinc-500 mb-2">Totál</div>
            <div className="text-sm text-zinc-300">
              <div className="flex justify-between">
                <span>Over</span>
                <span className="font-medium">
                  {total.total ?? total.point ?? total.o ?? ""}{" "}
                  {total.over ?? total.o_price ?? ""}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Under</span>
                <span className="font-medium">
                  {total.total ?? total.point ?? total.u ?? ""}{" "}
                  {total.under ?? total.u_price ?? ""}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
