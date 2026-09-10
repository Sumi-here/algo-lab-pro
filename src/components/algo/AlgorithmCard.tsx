import { Check, Minus } from "lucide-react";
import type { AlgorithmProfileData } from "@/lib/algo/types";
import { cn } from "@/lib/utils";

function Trait({ on, label }: { on: boolean; label: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px]",
        on ? "border-primary/40 bg-primary/10 text-primary" : "border-border bg-muted/40 text-muted-foreground",
      )}
    >
      {on ? <Check className="size-3" /> : <Minus className="size-3" />}
      {label}
    </span>
  );
}

export function AlgorithmCard({
  algorithm,
  selected,
  onSelect,
  compact,
}: {
  algorithm: AlgorithmProfileData;
  selected?: boolean;
  onSelect?: (id: AlgorithmProfileData["id"]) => void;
  compact?: boolean;
}) {
  const interactive = Boolean(onSelect);
  const { complexity } = algorithm;

  return (
    <article
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={onSelect ? () => onSelect(algorithm.id) : undefined}
      onKeyDown={
        onSelect
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(algorithm.id);
              }
            }
          : undefined
      }
      className={cn(
        "panel lift group p-5 text-left outline-none",
        interactive && "cursor-pointer focus-visible:ring-2 focus-visible:ring-ring",
        selected && "border-primary/60 ring-1 ring-primary/40",
      )}
    >
      <header className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold">{algorithm.name}</h3>
        <span className="mono-label shrink-0 text-primary/80">{complexity.average}</span>
      </header>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{algorithm.shortDescription}</p>

      {!compact && (
        <dl className="mt-4 grid grid-cols-2 gap-2 font-mono text-xs sm:grid-cols-4">
          {[
            ["Best", complexity.best],
            ["Avg", complexity.average],
            ["Worst", complexity.worst],
            ["Space", complexity.space],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-border/70 bg-surface/60 px-2 py-1.5">
              <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</dt>
              <dd className="mt-0.5 text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        <Trait on={algorithm.stable} label={algorithm.stable ? "Stable" : "Unstable"} />
        <Trait on={algorithm.adaptive} label={algorithm.adaptive ? "Adaptive" : "Non-adaptive"} />
        <Trait on={algorithm.inPlace} label={algorithm.inPlace ? "In-place" : "Not in-place"} />
      </div>
    </article>
  );
}
