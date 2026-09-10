import { Trophy } from "lucide-react";
import { algorithmName } from "@/lib/algo/mock";
import type { AlgorithmId, Metrics } from "@/lib/algo/types";
import { cn } from "@/lib/utils";

export interface PerformanceRow {
  algorithmId: AlgorithmId;
  metrics: Metrics;
  result: string;
}

export function PerformanceTable({
  rows,
  winnerId,
}: {
  rows: PerformanceRow[];
  winnerId?: AlgorithmId;
}) {
  return (
    <div className="panel overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-border/70 text-left">
              {["Algorithm", "Time", "Comparisons", "Swaps", "Writes", "Result"].map((h) => (
                <th key={h} className="mono-label px-4 py-3 font-normal">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const won = row.algorithmId === winnerId;
              return (
                <tr
                  key={row.algorithmId}
                  className={cn(
                    "border-b border-border/50 last:border-0 transition-colors hover:bg-surface-raised/60",
                    won && "bg-primary/10",
                  )}
                >
                  <td className="px-4 py-3 font-medium">
                    <span className="flex items-center gap-2">
                      {won ? <Trophy className="size-4 text-accent" /> : null}
                      {algorithmName(row.algorithmId)}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono tabular-nums">{row.metrics.timeMs.toFixed(1)} ms</td>
                  <td className="px-4 py-3 font-mono tabular-nums">{row.metrics.comparisons.toLocaleString()}</td>
                  <td className="px-4 py-3 font-mono tabular-nums">{row.metrics.swaps.toLocaleString()}</td>
                  <td className="px-4 py-3 font-mono tabular-nums">{row.metrics.writes.toLocaleString()}</td>
                  <td className={cn("px-4 py-3", won ? "text-accent" : "text-muted-foreground")}>{row.result}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
