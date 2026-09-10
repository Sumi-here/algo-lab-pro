import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { algorithmName } from "@/lib/algo/mock";
import type { AlgorithmId, MetricKey, Metrics } from "@/lib/algo/types";

export const METRIC_LABELS: Record<MetricKey, string> = {
  timeMs: "Execution time",
  comparisons: "Comparisons",
  swaps: "Swaps",
  writes: "Writes",
  operations: "Operations",
};

export function PerformanceChart({
  data,
  metric,
  height = 320,
}: {
  data: Array<{ algorithmId: AlgorithmId; metrics: Metrics }>;
  metric: MetricKey;
  height?: number;
}) {
  const rows = data.map((d) => ({
    name: algorithmName(d.algorithmId).replace(" Sort", ""),
    value: d.metrics[metric],
  }));

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rows} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="var(--color-border)" vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={56}
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
          />
          <Tooltip
            cursor={{ fill: "var(--color-muted)", opacity: 0.35 }}
            contentStyle={{
              background: "var(--color-popover)",
              border: "1px solid var(--color-border)",
              borderRadius: 12,
              color: "var(--color-popover-foreground)",
              fontSize: 12,
            }}
            formatter={(v: number) => [v.toLocaleString(), METRIC_LABELS[metric]]}
          />
          <Bar dataKey="value" fill="var(--color-primary)" radius={[6, 6, 0, 0]} maxBarSize={54} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
