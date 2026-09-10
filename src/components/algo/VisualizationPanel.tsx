import { useEffect, useState } from "react";
import { shapedBars } from "@/lib/algo/mock";
import type { DatasetKind, RunStatus } from "@/lib/algo/types";
import { cn } from "@/lib/utils";

/**
 * Placeholder visualization surface. The real engine will drive `values`
 * (and highlighted indices) frame by frame; the shell stays unchanged.
 */
export function VisualizationPanel({
  kind,
  status,
  speed,
  barCount = 64,
  title = "Visualization",
  subtitle,
  compact,
}: {
  kind: DatasetKind;
  status: RunStatus;
  speed: number;
  barCount?: number;
  title?: string;
  subtitle?: string;
  compact?: boolean;
}) {
  const [values, setValues] = useState(() => shapedBars(kind, barCount));
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    setValues(shapedBars(kind, barCount));
    setCursor(0);
  }, [kind, barCount, status === "idle"]);

  useEffect(() => {
    if (status !== "running") return;
    const id = setInterval(
      () => {
        setValues((prev) => {
          const next = [...prev];
          const i = Math.floor(Math.random() * next.length);
          const j = Math.floor(Math.random() * next.length);
          const a = next[i] ?? 0;
          const b = next[j] ?? 0;
          next[i] = b;
          next[j] = a;
          return next;
        });
        setCursor((c) => (c + 1) % barCount);
      },
      Math.max(40, 240 / speed),
    );
    return () => clearInterval(id);
  }, [status, speed, barCount]);

  return (
    <div className="panel flex flex-col overflow-hidden">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border/70 px-5 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{title}</p>
          {subtitle ? <p className="mono-label truncate">{subtitle}</p> : null}
        </div>
        <span
          className={cn(
            "shrink-0 rounded-md border px-2 py-0.5 font-mono text-[11px] capitalize",
            status === "running"
              ? "border-success/40 bg-success/10 text-success"
              : "border-border bg-muted/40 text-muted-foreground",
          )}
        >
          {status}
        </span>
      </div>

      <div
        className={cn(
          "grid-field flex items-end gap-[2px] px-5 py-6",
          compact ? "h-44" : "h-[320px] lg:h-[420px]",
        )}
      >
        {values.map((v, i) => (
          <div
            key={i}
            className={cn(
              "flex-1 rounded-t-[2px] transition-all duration-200 ease-out",
              i === cursor && status === "running"
                ? "bg-accent"
                : "bg-[image:var(--gradient-bar)] opacity-85",
            )}
            style={{ height: `${v}%` }}
          />
        ))}
      </div>

      <p className="border-t border-border/70 px-5 py-2.5 text-[11px] text-muted-foreground">
        Sample frames only — real algorithm passes will render here once the engine is connected.
      </p>
    </div>
  );
}
