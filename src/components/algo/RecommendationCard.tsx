import { Link } from "@tanstack/react-router";
import { ArrowRight, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SuitabilityScore } from "./SuitabilityScore";
import { algorithmName } from "@/lib/algo/mock";
import type { Recommendation } from "@/lib/algo/types";

export function RecommendationCard({
  recommendation,
  showAlternatives = true,
}: {
  recommendation: Recommendation;
  showAlternatives?: boolean;
}) {
  return (
    <section className="panel hero-glow overflow-hidden">
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[auto_minmax(0,1fr)]">
        <div className="flex items-center justify-center">
          <SuitabilityScore score={recommendation.suitability} size={148} />
        </div>

        <div className="min-w-0 space-y-5">
          <div>
            <p className="mono-label">Recommended algorithm</p>
            <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
              {algorithmName(recommendation.algorithmId)}
            </h2>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {recommendation.properties.map((p) => (
              <span
                key={p}
                className="rounded-md border border-primary/40 bg-primary/10 px-2 py-0.5 font-mono text-[11px] text-primary"
              >
                {p}
              </span>
            ))}
          </div>

          <div>
            <p className="mono-label mb-2">Why it was recommended</p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {recommendation.reasons.map((r) => (
                <li key={r} className="flex gap-2 text-sm text-muted-foreground">
                  <CircleCheck className="mt-0.5 size-4 shrink-0 text-success" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button asChild>
              <Link to="/recommendation">
                Test My Decision
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/algorithms">Compare properties</Link>
            </Button>
          </div>
        </div>
      </div>

      {showAlternatives && (
        <div className="border-t border-border/70 bg-surface/40 p-6 sm:p-8">
          <p className="mono-label mb-3">Alternative choices</p>
          <div className="grid gap-3 md:grid-cols-3">
            {recommendation.alternatives.map((alt) => (
              <div key={alt.algorithmId} className="lift rounded-xl border border-border bg-surface/70 p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="truncate text-sm font-medium">{algorithmName(alt.algorithmId)}</p>
                  <span className="font-mono text-xs text-primary">{alt.suitability}%</span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary/70" style={{ width: `${alt.suitability}%` }} />
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{alt.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
