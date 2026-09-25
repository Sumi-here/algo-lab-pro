import { ALGORITHMS } from "./mock";
import type {
  AlgorithmId,
  DatasetConfig,
  Recommendation,
  RequirementConfig,
} from "./types";

export function getRecommendation(
  dataset: DatasetConfig,
  requirements: RequirementConfig,
): Recommendation {
  const scores: Record<AlgorithmId, number> = {
    "bubble-sort": 50,
    "selection-sort": 50,
    "insertion-sort": 50,
    "merge-sort": 50,
    "quick-sort": 50,
    "heap-sort": 50,
  };

  const reasons: Record<AlgorithmId, string[]> = {
    "bubble-sort": [],
    "selection-sort": [],
    "insertion-sort": [],
    "merge-sort": [],
    "quick-sort": [],
    "heap-sort": [],
  };

  const add = (id: AlgorithmId, points: number, reason: string) => {
    scores[id] += points;
    reasons[id].push(reason);
  };

  // Dataset-based reasoning
  if (dataset.kind === "nearly-sorted") {
    add(
      "insertion-sort",
      30,
      "The dataset is nearly sorted, which strongly suits insertion sort's adaptive behaviour.",
    );
  }

  if (dataset.kind === "sorted") {
    add(
      "insertion-sort",
      35,
      "Already sorted data lets insertion sort finish with very little movement.",
    );
  }

  if (dataset.kind === "reverse-sorted") {
    add(
      "merge-sort",
      20,
      "Merge sort keeps predictable O(n log n) growth even on reverse-sorted data.",
    );
    add(
      "heap-sort",
      20,
      "Heap sort maintains O(n log n) worst-case time without requiring auxiliary arrays.",
    );
  }

  if (dataset.kind === "duplicate-heavy") {
    add(
      "merge-sort",
      15,
      "Merge sort provides predictable performance when many values are duplicated.",
    );
    add(
      "quick-sort",
      10,
      "Quick sort can perform well on duplicate-heavy data when partitioning is favourable.",
    );
  }

  if (dataset.kind === "random") {
    add(
      "quick-sort",
      25,
      "Random data is a common workload where quick sort often provides strong practical performance.",
    );
    add(
      "merge-sort",
      15,
      "Merge sort provides predictable O(n log n) behaviour on random data.",
    );
  }

  // Stability requirement
  if (requirements.stabilityRequired) {
    add(
      "bubble-sort",
      20,
      "Bubble sort is stable.",
    );
    add(
      "insertion-sort",
      20,
      "Insertion sort is stable.",
    );
    add(
      "merge-sort",
      20,
      "Merge sort is stable.",
    );

    add(
      "selection-sort",
      -15,
      "Selection sort is not stable in its standard form.",
    );
    add(
      "quick-sort",
      -15,
      "Quick sort is not stable in its standard in-place form.",
    );
    add(
      "heap-sort",
      -15,
      "Heap sort is not stable.",
    );
  }

  // Memory preference
  if (requirements.memoryPriority === "high") {
    add(
      "quick-sort",
      10,
      "Quick sort is typically in-place, keeping auxiliary memory relatively low.",
    );
    add(
      "heap-sort",
      15,
      "Heap sort is in-place and provides O(1) auxiliary space.",
    );
    add(
      "insertion-sort",
      15,
      "Insertion sort requires only O(1) auxiliary space.",
    );

    add(
      "merge-sort",
      -10,
      "Merge sort normally requires O(n) auxiliary space for arrays.",
    );
  }

  // Speed preference
  if (requirements.speedPriority === "high") {
    add(
      "quick-sort",
      20,
      "Quick sort has average O(n log n) time and is often efficient in practice.",
    );
    add(
      "merge-sort",
      15,
      "Merge sort guarantees O(n log n) worst-case time.",
    );
    add(
      "heap-sort",
      12,
      "Heap sort guarantees O(n log n) worst-case time.",
    );

    add(
      "bubble-sort",
      -20,
      "Bubble sort has quadratic average and worst-case behaviour.",
    );
    add(
      "selection-sort",
      -15,
      "Selection sort requires quadratic comparisons.",
    );
  }

  // Scale
  if (requirements.scale === "large" || dataset.size >= 5000) {
    add(
      "quick-sort",
      15,
      "Large datasets make O(n log n) algorithms more appropriate than quadratic algorithms.",
    );
    add(
      "merge-sort",
      15,
      "Merge sort scales predictably with O(n log n) time.",
    );
    add(
      "heap-sort",
      15,
      "Heap sort maintains O(n log n) worst-case time as the dataset grows.",
    );

    add("bubble-sort", -20, "Quadratic growth becomes costly on large datasets.");
    add("selection-sort", -15, "Quadratic comparisons become costly at larger scales.");
    add("insertion-sort", -10, "Insertion sort becomes less suitable as unsorted dataset size grows.");
  }

  // Small / nearly sorted data
  if (
    requirements.scale === "small" &&
    (dataset.kind === "nearly-sorted" || dataset.kind === "sorted")
  ) {
    add(
      "insertion-sort",
      15,
      "For a small, structured dataset, insertion sort avoids unnecessary algorithmic overhead.",
    );
  }

  // Keep every score inside a sensible range.
  const normalizedScores = Object.fromEntries(
    Object.entries(scores).map(([id, score]) => [
      id,
      Math.max(0, Math.min(100, score)),
    ]),
  ) as Record<AlgorithmId, number>;

  const ranked = (Object.keys(normalizedScores) as AlgorithmId[]).sort(
    (a, b) => normalizedScores[b] - normalizedScores[a],
  );

  const winner = ranked[0];

  if (!winner) {
    throw new Error("Unable to determine an algorithm recommendation.");
  }

  const profile = ALGORITHMS.find((algorithm) => algorithm.id === winner);

  if (!profile) {
    throw new Error(`Missing algorithm profile: ${winner}`);
  }

  const winnerReasons = reasons[winner].slice(0, 4);

  if (winnerReasons.length === 0) {
    winnerReasons.push(
      `${profile.name} matches the selected dataset and requirements based on its algorithm properties.`,
    );
  }

  const alternatives = ranked.slice(1, 4).map((id) => ({
    algorithmId: id,
    suitability: normalizedScores[id],
    note:
      reasons[id][0] ??
      `${ALGORITHMS.find((algorithm) => algorithm.id === id)?.name ?? id} remains a viable alternative.`,
  }));

  return {
    algorithmId: winner,
    suitability: normalizedScores[winner],
    reasons: winnerReasons,
    properties: [
      profile.stable ? "Stable" : "Unstable",
      profile.adaptive ? "Adaptive" : "Non-adaptive",
      profile.inPlace ? "In-place" : "Extra memory",
      `Avg ${profile.complexity.average}`,
    ],
    alternatives,
  };
}