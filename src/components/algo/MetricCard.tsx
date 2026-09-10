import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function MetricCard({
  label,
  value,
  unit,
  icon: Icon,
  hint,
  emphasis,
}: {
  label: string;
  value: string | number;
  unit?: string;
  icon?: LucideIcon;
  hint?: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface/70 p-4 transition-colors",
        emphasis && "border-primary/50 bg-primary/10",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="mono-label truncate">{label}</p>
        {Icon ? <Icon className="size-4 shrink-0 text-muted-foreground" /> : null}
      </div>
      <p className="mt-2 font-mono text-xl tabular-nums">
        {typeof value === "number" ? value.toLocaleString() : value}
        {unit ? <span className="ml-1 text-xs text-muted-foreground">{unit}</span> : null}
      </p>
      {hint ? <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
