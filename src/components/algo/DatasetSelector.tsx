import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { DatasetConfig, DatasetKind } from "@/lib/algo/types";

const KINDS: Array<{ kind: DatasetKind; label: string; hint: string }> = [
  { kind: "random", label: "Random", hint: "No exploitable order" },
  { kind: "sorted", label: "Sorted", hint: "Already in order" },
  { kind: "reverse-sorted", label: "Reverse sorted", hint: "Maximum inversions" },
  { kind: "nearly-sorted", label: "Nearly sorted", hint: "A few elements drift" },
  { kind: "duplicate-heavy", label: "Duplicate heavy", hint: "Few distinct keys" },
  { kind: "custom", label: "Custom data", hint: "Paste your own values" },
];

export function DatasetSelector({
  value,
  onChange,
}: {
  value: DatasetConfig;
  onChange: (next: DatasetConfig) => void;
}) {
  return (
    <section className="panel space-y-6 p-5 sm:p-6">
      <div>
        <h2 className="text-lg font-semibold">Dataset</h2>
        <p className="mt-1 text-sm text-muted-foreground">Shape and scale decide which properties matter.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {KINDS.map((k) => (
          <button
            key={k.kind}
            type="button"
            onClick={() => onChange({ ...value, kind: k.kind })}
            className={cn(
              "lift rounded-xl border border-border bg-surface/60 p-4 text-left",
              value.kind === k.kind && "border-primary/60 bg-primary/10 ring-1 ring-primary/30",
            )}
          >
            <p className="text-sm font-medium">{k.label}</p>
            <p className="mt-1 text-xs text-muted-foreground">{k.hint}</p>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="mono-label">Dataset size</p>
          <p className="font-mono text-sm text-primary">{value.size.toLocaleString()}</p>
        </div>
        <Slider
          value={[value.size]}
          min={100}
          max={50_000}
          step={100}
          onValueChange={([size]) => onChange({ ...value, size: size ?? value.size })}
        />
        <div className="flex justify-between font-mono text-[11px] text-muted-foreground">
          <span>100</span>
          <span>50,000</span>
        </div>
      </div>

      {value.kind === "custom" && (
        <div className="space-y-2">
          <p className="mono-label">Custom values</p>
          <Textarea
            rows={3}
            placeholder="42, 7, 19, 3, 88 …"
            className="bg-surface/60 font-mono text-sm"
            onChange={(e) =>
              onChange({
                ...value,
                customValues: e.target.value
                  .split(/[,\s]+/)
                  .map((n) => Number(n))
                  .filter((n) => Number.isFinite(n)),
              })
            }
          />
          <p className="text-xs text-muted-foreground">Parsed locally for now — the engine will validate later.</p>
        </div>
      )}
    </section>
  );
}
