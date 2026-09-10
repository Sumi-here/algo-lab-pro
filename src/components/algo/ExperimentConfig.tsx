import { Slider } from "@/components/ui/slider";
import { ALGORITHMS } from "@/lib/algo/mock";
import { METRIC_LABELS } from "./PerformanceChart";
import type { AlgorithmId, DatasetKind, ExperimentConfigData, MetricKey } from "@/lib/algo/types";
import { cn } from "@/lib/utils";

const KINDS: DatasetKind[] = ["random", "sorted", "reverse-sorted", "nearly-sorted", "duplicate-heavy"];
const METRICS: MetricKey[] = ["timeMs", "comparisons", "swaps", "writes", "operations"];

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg border border-border bg-surface/60 px-3 py-1.5 text-xs transition-colors hover:border-primary/40",
        active && "border-primary/60 bg-primary/10 text-primary",
      )}
    >
      {children}
    </button>
  );
}

export function ExperimentConfig({
  value,
  onChange,
}: {
  value: ExperimentConfigData;
  onChange: (next: ExperimentConfigData) => void;
}) {
  const toggle = <T,>(list: T[], item: T): T[] =>
    list.includes(item) ? list.filter((x) => x !== item) : [...list, item];

  return (
    <section className="panel space-y-6 p-5">
      <div>
        <p className="mono-label">Configuration</p>
        <h2 className="mt-1 text-lg font-semibold">Experiment setup</h2>
      </div>

      <div className="space-y-2">
        <p className="mono-label">Dataset</p>
        <div className="flex flex-wrap gap-2">
          {KINDS.map((kind) => (
            <Chip
              key={kind}
              active={value.dataset.kind === kind}
              onClick={() => onChange({ ...value, dataset: { ...value.dataset, kind } })}
            >
              {kind}
            </Chip>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="mono-label">Dataset size</p>
          <span className="font-mono text-xs text-primary">{value.dataset.size.toLocaleString()}</span>
        </div>
        <Slider
          value={[value.dataset.size]}
          min={100}
          max={50_000}
          step={100}
          onValueChange={([size]) =>
            onChange({ ...value, dataset: { ...value.dataset, size: size ?? value.dataset.size } })
          }
        />
      </div>

      <div className="space-y-2">
        <p className="mono-label">Algorithms to compare</p>
        <div className="flex flex-wrap gap-2">
          {ALGORITHMS.map((a) => (
            <Chip
              key={a.id}
              active={value.algorithmIds.includes(a.id)}
              onClick={() => onChange({ ...value, algorithmIds: toggle<AlgorithmId>(value.algorithmIds, a.id) })}
            >
              {a.name.replace(" Sort", "")}
            </Chip>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="mono-label">Number of trials</p>
          <span className="font-mono text-xs text-primary">{value.trials}</span>
        </div>
        <Slider
          value={[value.trials]}
          min={1}
          max={20}
          step={1}
          onValueChange={([trials]) => onChange({ ...value, trials: trials ?? value.trials })}
        />
      </div>

      <div className="space-y-2">
        <p className="mono-label">Metrics</p>
        <div className="flex flex-wrap gap-2">
          {METRICS.map((m) => (
            <Chip
              key={m}
              active={value.metrics.includes(m)}
              onClick={() => onChange({ ...value, metrics: toggle<MetricKey>(value.metrics, m) })}
            >
              {METRIC_LABELS[m]}
            </Chip>
          ))}
        </div>
      </div>
    </section>
  );
}
