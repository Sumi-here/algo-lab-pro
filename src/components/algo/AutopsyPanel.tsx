import { Microscope } from "lucide-react";
import type { AutopsySection } from "@/lib/algo/types";

export function AutopsyPanel({
  sections,
  winnerName,
}: {
  sections: AutopsySection[];
  winnerName: string;
}) {
  return (
    <section className="panel hero-glow p-6 sm:p-8">
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent ring-1 ring-accent/30">
          <Microscope className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="mono-label">Algorithm autopsy</p>
          <h2 className="mt-1 text-xl font-bold sm:text-2xl">Why Did It Win?</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Evidence behind {winnerName} — placeholder narrative until measurements are wired in.
          </p>
        </div>
      </div>

      <ol className="mt-6 space-y-0 border-l border-border/70 pl-6">
        {sections.map((section, i) => (
          <li key={section.title} className="relative pb-6 last:pb-0">
            <span className="absolute -left-[31px] grid size-5 place-items-center rounded-full border border-primary/40 bg-background font-mono text-[10px] text-primary">
              {i + 1}
            </span>
            <p className="text-sm font-medium">{section.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{section.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
