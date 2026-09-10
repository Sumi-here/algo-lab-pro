import { CalendarDays, Database, Trophy } from "lucide-react";
import { algorithmName } from "@/lib/algo/mock";
import { METRIC_LABELS } from "./PerformanceChart";
import type { ExperimentResult } from "@/lib/algo/types";

export function ExperimentHistoryCard({ experiment }: { experiment: ExperimentResult }) {
  const date = new Date(experiment.createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="panel lift grid gap-4 p-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
      <div className="min-w-0">
        <h3 className="truncate text-sm font-semibold">{experiment.name}</h3>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5" /> {date}
          </span>
          <span className="flex items-center gap-1.5">
            <Database className="size-3.5" /> {experiment.dataset.kind} · n=
            {experiment.dataset.size.toLocaleString()}
          </span>
          <span className="font-mono">
            {METRIC_LABELS[experiment.keyMetric.key]}: {experiment.keyMetric.value.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-3 py-2">
        <Trophy className="size-4 shrink-0 text-accent" />
        <span className="text-xs">
          <span className="mono-label block">Winner</span>
          <span className="font-medium">{algorithmName(experiment.winnerId)}</span>
        </span>
      </div>
    </article>
  );
}
