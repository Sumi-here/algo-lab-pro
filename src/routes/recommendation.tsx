import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/AppShell";
import { SuitabilityScore } from "@/components/algo/SuitabilityScore";
import { AlgorithmCard } from "@/components/algo/AlgorithmCard";
import { ALGORITHM_MAP, MOCK_RECOMMENDATION, algorithmName } from "@/lib/algo/mock";

export const Route = createFileRoute("/recommendation")({
  head: () => ({
    meta: [
      { title: "Recommendation — ALGO//BATTLE" },
      {
        name: "description",
        content: "Evidence-based algorithm recommendation with a suitability score, reasoning and alternatives.",
      },
      { property: "og:title", content: "Recommendation — ALGO//BATTLE" },
      { property: "og:description", content: "See which algorithm fits your problem definition, and why." },
    ],
  }),
  component: RecommendationPage,
});

function RecommendationPage() {
  const rec = MOCK_RECOMMENDATION;
  const winner = ALGORITHM_MAP[rec.algorithmId];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Step 02 · Recommend"
        title="Recommendation"
        subtitle="Derived from your dataset shape and stated requirements."
        actions={
          <Button asChild>
            <Link to="/experiment-lab">
              Run Controlled Experiment
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        }
      />

      <section className="panel hero-glow grid gap-8 p-6 sm:p-8 lg:grid-cols-[auto_minmax(0,1fr)]">
        <div className="flex items-center justify-center">
          <SuitabilityScore score={rec.suitability} size={180} />
        </div>
        <div className="min-w-0 space-y-5">
          <div>
            <p className="mono-label">Recommended algorithm</p>
            <h2 className="mt-2 font-display text-3xl font-bold uppercase sm:text-5xl">
              {algorithmName(rec.algorithmId)}
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            {[
              ["Best", winner.complexity.best],
              ["Average", winner.complexity.average],
              ["Worst", winner.complexity.worst],
              ["Space", winner.complexity.space],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-border/70 bg-surface/60 p-3">
                <p className="mono-label">{label}</p>
                <p className="mt-1 font-mono text-sm">{value}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {rec.properties.map((p) => (
              <span
                key={p}
                className="rounded-md border border-primary/40 bg-primary/10 px-2 py-0.5 font-mono text-[11px] text-primary"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section>
        <p className="mono-label">Evidence</p>
        <h2 className="mt-2 text-xl font-bold">Why this choice?</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {rec.reasons.map((reason, i) => (
            <div key={reason} className="panel lift flex gap-3 p-5">
              <CircleCheck className="mt-0.5 size-5 shrink-0 text-success" />
              <div>
                <p className="mono-label">Factor {String(i + 1).padStart(2, "0")}</p>
                <p className="mt-1 text-sm leading-relaxed">{reason}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <p className="mono-label">Other candidates</p>
        <h2 className="mt-2 text-xl font-bold">Close alternatives</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {rec.alternatives.map((alt) => (
            <div key={alt.algorithmId} className="space-y-3">
              <AlgorithmCard algorithm={ALGORITHM_MAP[alt.algorithmId]} />
              <div className="rounded-lg border border-border bg-surface/60 p-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="mono-label">Suitability</span>
                  <span className="font-mono text-primary">{alt.suitability}%</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{alt.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <p className="text-xs text-muted-foreground">
        Mock recommendation for the UI foundation phase — no measurements have been taken yet.
      </p>
    </div>
  );
}
