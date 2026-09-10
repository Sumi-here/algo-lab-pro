import { shapedBars } from "@/lib/algo/mock";
import type { DatasetKind } from "@/lib/algo/types";

export function DatasetPreview({
  kind,
  size,
  bars = 48,
}: {
  kind: DatasetKind;
  size: number;
  bars?: number;
}) {
  const values = shapedBars(kind, bars);

  return (
    <div className="panel overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-border/70 px-4 py-3">
        <p className="mono-label">Dataset preview</p>
        <p className="font-mono text-xs text-muted-foreground">
          {kind} · n={size.toLocaleString()}
        </p>
      </div>
      <div className="grid-field flex h-40 items-end gap-[3px] px-4 py-4">
        {values.map((v, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-[3px] bg-[image:var(--gradient-bar)] opacity-90 transition-[height] duration-500"
            style={{ height: `${v}%` }}
          />
        ))}
      </div>
    </div>
  );
}
