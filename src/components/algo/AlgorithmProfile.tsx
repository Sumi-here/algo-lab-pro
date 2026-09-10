import { ThumbsDown, ThumbsUp } from "lucide-react";
import type { AlgorithmProfileData } from "@/lib/algo/types";

function List({ title, items, tone }: { title: string; items: string[]; tone: "good" | "bad" }) {
  return (
    <div>
      <p className="mono-label mb-2 flex items-center gap-1.5">
        {tone === "good" ? <ThumbsUp className="size-3" /> : <ThumbsDown className="size-3" />}
        {title}
      </p>
      <ul className="space-y-1.5 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className={tone === "good" ? "text-success" : "text-destructive"}>—</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AlgorithmProfile({ algorithm }: { algorithm: AlgorithmProfileData }) {
  const { complexity } = algorithm;
  return (
    <div className="space-y-6 pt-2">
      <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">{algorithm.description}</p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Best case", complexity.best],
          ["Average case", complexity.average],
          ["Worst case", complexity.worst],
          ["Space", complexity.space],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-border/70 bg-surface/60 p-3">
            <p className="mono-label">{label}</p>
            <p className="mt-1 font-mono text-sm">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["Stability", algorithm.stable ? "Stable" : "Unstable"],
          ["Adaptiveness", algorithm.adaptive ? "Adaptive" : "Non-adaptive"],
          ["Memory", algorithm.inPlace ? "In-place" : "Needs auxiliary space"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-border/70 bg-surface/60 p-3">
            <p className="mono-label">{label}</p>
            <p className="mt-1 text-sm">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <List title="Strengths" items={algorithm.strengths} tone="good" />
        <List title="Weaknesses" items={algorithm.weaknesses} tone="bad" />
        <List title="Best suited for" items={algorithm.bestSuitedFor} tone="good" />
        <List title="Worst suited for" items={algorithm.worstSuitedFor} tone="bad" />
      </div>
    </div>
  );
}
