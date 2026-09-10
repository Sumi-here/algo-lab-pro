import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, FlaskConical, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlgorithmCard } from "@/components/algo/AlgorithmCard";
import { ALGORITHMS } from "@/lib/algo/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ALGO//BATTLE — Choose. Test. Understand." },
      {
        name: "description",
        content:
          "An algorithm experiment laboratory: define your problem, get a recommendation, run controlled sorting experiments and understand why the results change.",
      },
      { property: "og:title", content: "ALGO//BATTLE — Choose. Test. Understand." },
      {
        property: "og:description",
        content: "Define, recommend, experiment, stress test and compare sorting algorithms in one lab.",
      },
    ],
  }),
  component: Home,
});

const STAGES = [
  {
    step: "01",
    label: "DEFINE",
    icon: SlidersHorizontal,
    text: "Configure the problem and dataset.",
    to: "/decision-lab" as const,
  },
  {
    step: "02",
    label: "TEST",
    icon: FlaskConical,
    text: "Run controlled algorithm experiments.",
    to: "/experiment-lab" as const,
  },
  {
    step: "03",
    label: "UNDERSTAND",
    icon: BarChart3,
    text: "Analyze performance and discover why the results changed.",
    to: "/analysis" as const,
  },
];

function Home() {
  return (
    <div className="space-y-16 pb-4">
      <section className="panel hero-glow rise-in relative overflow-hidden px-6 py-14 sm:px-10 sm:py-20">
        <div className="grid-field pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative max-w-3xl">
          <p className="mono-label">Algorithm Decision &amp; Experiment Lab</p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            ALGO<span className="text-primary">//</span>BATTLE
          </h1>
          <p className="mt-4 font-display text-xl text-foreground/90 sm:text-2xl">Choose. Test. Understand.</p>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Explore how algorithms behave under different conditions. Get a recommendation, run controlled
            experiments, stress-test your choice, and discover why the results change.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/decision-lab">
                Start Experiment
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/algorithms">Explore Algorithms</Link>
            </Button>
          </div>
        </div>
      </section>

      <section>
        <p className="mono-label">Decision → Experiment → Insight</p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Three stages, one continuous workflow</h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {STAGES.map(({ step, label, icon: Icon, text, to }) => (
            <Link key={label} to={to} className="panel lift group p-6">
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/25">
                  <Icon className="size-5" />
                </span>
                <span className="font-mono text-xs text-muted-foreground">{step}</span>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold tracking-wide">{label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-xs text-primary">
                Open
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div className="min-w-0">
            <p className="mono-label">The contenders</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Six sorting algorithms</h2>
          </div>
          <Button asChild variant="ghost" size="sm" className="shrink-0">
            <Link to="/algorithms">
              Full library
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {ALGORITHMS.map((algorithm) => (
            <AlgorithmCard key={algorithm.id} algorithm={algorithm} compact />
          ))}
        </div>
      </section>
    </div>
  );
}
