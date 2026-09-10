import { AlertTriangle, ShieldCheck } from "lucide-react";
import { algorithmName } from "@/lib/algo/mock";
import type { StressScenario } from "@/lib/algo/types";
import { cn } from "@/lib/utils";

export function StressTestCard({
  scenario,
  selected,
  onSelect,
}: {
  scenario: StressScenario;
  selected?: boolean;
  onSelect?: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(scenario.id)}
      className={cn(
        "panel lift p-5 text-left",
        selected && "border-primary/60 ring-1 ring-primary/40",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold">{scenario.title}</h3>
        <span className="mono-label shrink-0">{scenario.datasetKind}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{scenario.summary}</p>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground/80">{scenario.pressure}</p>

      <div className="mt-4 space-y-1.5 text-[11px]">
        <p className="flex items-start gap-1.5 text-destructive">
          <AlertTriangle className="mt-px size-3.5 shrink-0" />
          <span className="text-muted-foreground">
            Hurts: {scenario.hurts.map(algorithmName).join(", ")}
          </span>
        </p>
        <p className="flex items-start gap-1.5 text-success">
          <ShieldCheck className="mt-px size-3.5 shrink-0" />
          <span className="text-muted-foreground">
            Favors: {scenario.favors.map(algorithmName).join(", ")}
          </span>
        </p>
      </div>
    </button>
  );
}
