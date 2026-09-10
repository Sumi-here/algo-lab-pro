import { Sparkles, Target } from "lucide-react";
import { ALGORITHMS, algorithmName } from "@/lib/algo/mock";
import type { AlgorithmId } from "@/lib/algo/types";
import { cn } from "@/lib/utils";

export function PredictionCard({
  predictedId,
  actualId,
  onPredict,
}: {
  predictedId: AlgorithmId | null;
  actualId: AlgorithmId | null;
  onPredict: (id: AlgorithmId) => void;
}) {
  const resolved = Boolean(predictedId && actualId);
  const correct = resolved && predictedId === actualId;

  return (
    <section className="panel p-6 sm:p-8">
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
          <Target className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="mono-label">Prediction mode</p>
          <h2 className="mt-1 text-lg font-semibold">Which algorithm do you think will win?</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Lock in a call before the run, then see how the measurements land.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {ALGORITHMS.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => onPredict(a.id)}
            className={cn(
              "rounded-xl border border-border bg-surface/60 px-3 py-3 text-left text-xs transition-all hover:-translate-y-0.5 hover:border-primary/40",
              predictedId === a.id && "border-primary/60 bg-primary/10 text-primary",
            )}
          >
            <span className="block font-medium">{a.name.replace(" Sort", "")}</span>
            <span className="mono-label mt-1 block">{a.complexity.average}</span>
          </button>
        ))}
      </div>

      {resolved && (
        <div className="mt-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
          <div className="rounded-xl border border-border bg-surface/60 p-4">
            <p className="mono-label">You predicted</p>
            <p className="mt-1 font-display text-lg font-bold uppercase">{algorithmName(predictedId!)}</p>
          </div>
          <div className="rounded-xl border border-accent/40 bg-accent/10 p-4">
            <p className="mono-label">Actual winner</p>
            <p className="mt-1 font-display text-lg font-bold uppercase text-accent">{algorithmName(actualId!)}</p>
          </div>
          <div
            className={cn(
              "flex items-center gap-2 rounded-xl border p-4 text-sm",
              correct ? "border-success/40 bg-success/10 text-success" : "border-border bg-surface/60",
            )}
          >
            <Sparkles className="size-4 shrink-0" />
            <span className={correct ? undefined : "text-muted-foreground"}>
              {correct ? "Called it." : "Not this time — check the autopsy."}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
