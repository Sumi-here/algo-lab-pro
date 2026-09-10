import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/AppShell";
import { DatasetSelector } from "@/components/algo/DatasetSelector";
import { DatasetPreview } from "@/components/algo/DatasetPreview";
import { RequirementSelector } from "@/components/algo/RequirementSelector";
import { RecommendationCard } from "@/components/algo/RecommendationCard";
import { MOCK_RECOMMENDATION } from "@/lib/algo/mock";
import type { DatasetConfig, RequirementConfig } from "@/lib/algo/types";

export const Route = createFileRoute("/decision-lab")({
  head: () => ({
    meta: [
      { title: "Decision Lab — ALGO//BATTLE" },
      {
        name: "description",
        content: "Define your dataset shape, size and requirements to get an algorithm recommendation.",
      },
      { property: "og:title", content: "Decision Lab — ALGO//BATTLE" },
      { property: "og:description", content: "Tell the lab what your data looks like and what matters most." },
    ],
  }),
  component: DecisionLab,
});

function DecisionLab() {
  const [dataset, setDataset] = useState<DatasetConfig>({ kind: "nearly-sorted", size: 5000 });
  const [requirements, setRequirements] = useState<RequirementConfig>({
    stabilityRequired: true,
    memoryPriority: "high",
    speedPriority: "balanced",
    scale: "small",
  });

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Step 01 · Define"
        title="Define Your Problem"
        subtitle="Tell us what your data looks like and what matters most."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <DatasetSelector value={dataset} onChange={setDataset} />
          <DatasetPreview kind={dataset.kind} size={dataset.size} />
        </div>
        <RequirementSelector value={requirements} onChange={setRequirements} />
      </div>

      <div className="space-y-3">
        <p className="mono-label">Recommendation preview</p>
        <RecommendationCard recommendation={MOCK_RECOMMENDATION} />
        <p className="text-xs text-muted-foreground">
          Placeholder result — the recommendation engine is not connected yet, so these numbers are illustrative.
        </p>
      </div>
    </div>
  );
}
