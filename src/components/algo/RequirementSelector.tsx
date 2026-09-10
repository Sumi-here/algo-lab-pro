import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import type { Priority, RequirementConfig } from "@/lib/algo/types";

const PRIORITIES: Priority[] = ["low", "balanced", "high"];

function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="inline-flex w-full rounded-lg border border-border bg-surface/60 p-1">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(
            "flex-1 rounded-md px-3 py-1.5 text-xs capitalize transition-colors",
            value === opt ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export function RequirementSelector({
  value,
  onChange,
}: {
  value: RequirementConfig;
  onChange: (next: RequirementConfig) => void;
}) {
  return (
    <section className="panel space-y-6 p-5 sm:p-6">
      <div>
        <h2 className="text-lg font-semibold">Requirements</h2>
        <p className="mt-1 text-sm text-muted-foreground">What matters most for this workload.</p>
      </div>

      <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface/60 p-4">
        <div className="min-w-0">
          <p className="text-sm font-medium">Stability required</p>
          <p className="mt-1 text-xs text-muted-foreground">Equal keys must keep their original order.</p>
        </div>
        <Switch
          checked={value.stabilityRequired}
          onCheckedChange={(stabilityRequired) => onChange({ ...value, stabilityRequired })}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <p className="mono-label">Memory priority</p>
          <Segmented
            options={PRIORITIES}
            value={value.memoryPriority}
            onChange={(memoryPriority) => onChange({ ...value, memoryPriority })}
          />
        </div>
        <div className="space-y-2">
          <p className="mono-label">Speed priority</p>
          <Segmented
            options={PRIORITIES}
            value={value.speedPriority}
            onChange={(speedPriority) => onChange({ ...value, speedPriority })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <p className="mono-label">Scale</p>
        <Segmented
          options={["small", "large"] as const}
          value={value.scale}
          onChange={(scale) => onChange({ ...value, scale })}
        />
      </div>
    </section>
  );
}
