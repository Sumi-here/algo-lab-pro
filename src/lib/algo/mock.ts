/**
 * Mock fixtures for the UI foundation phase.
 * Replaceable: every export here matches a type in ./types and will be
 * produced by the real algorithm engine later.
 */
import type {
  AlgorithmId,
  AlgorithmProfileData,
  AutopsySection,
  ExperimentResult,
  Metrics,
  Recommendation,
  StressScenario,
} from "./types";

export const ALGORITHMS: AlgorithmProfileData[] = [
  {
    id: "bubble-sort",
    name: "Bubble Sort",
    shortDescription: "Repeatedly swaps neighbours until the pass is clean.",
    description:
      "Compares adjacent pairs and swaps them until a full pass produces no swaps. Simple to reason about and useful as a teaching baseline, but the swap count explodes on unordered data.",
    complexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)" },
    stable: true,
    adaptive: true,
    inPlace: true,
    strengths: ["Detects already sorted input", "Trivial implementation", "No extra memory"],
    weaknesses: ["Very high swap count", "Poor on large inputs", "Quadratic average case"],
    bestSuitedFor: ["Tiny arrays", "Nearly sorted data", "Teaching and demonstrations"],
    worstSuitedFor: ["Large datasets", "Reverse sorted data"],
  },
  {
    id: "selection-sort",
    name: "Selection Sort",
    shortDescription: "Finds the minimum each pass and places it once.",
    description:
      "Scans the unsorted region for the smallest element and moves it into place with a single swap per pass. Predictable comparison count, minimal writes, but never faster than quadratic.",
    complexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)", space: "O(1)" },
    stable: false,
    adaptive: false,
    inPlace: true,
    strengths: ["Minimal number of writes", "Predictable behaviour", "In-place"],
    weaknesses: ["Never adapts to order", "Quadratic even on sorted input", "Unstable"],
    bestSuitedFor: ["Write-expensive storage", "Small arrays"],
    worstSuitedFor: ["Large datasets", "Stability-sensitive records"],
  },
  {
    id: "insertion-sort",
    name: "Insertion Sort",
    shortDescription: "Grows a sorted prefix by inserting each element.",
    description:
      "Takes each element and shifts it left until it sits in order. Extremely fast when the data is already close to sorted, and the default choice for small partitions inside hybrid sorts.",
    complexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)" },
    stable: true,
    adaptive: true,
    inPlace: true,
    strengths: ["Near-linear on nearly sorted data", "Stable", "Low constant factors"],
    weaknesses: ["Quadratic on random data", "Many shifts on reverse order"],
    bestSuitedFor: ["Nearly sorted data", "Small datasets", "Streaming inserts"],
    worstSuitedFor: ["Large random datasets", "Reverse sorted data"],
  },
  {
    id: "merge-sort",
    name: "Merge Sort",
    shortDescription: "Splits, sorts halves, then merges in order.",
    description:
      "Divides the array, sorts each half recursively and merges the results. Guarantees O(n log n) regardless of input shape and preserves the order of equal keys, at the cost of extra memory.",
    complexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)", space: "O(n)" },
    stable: true,
    adaptive: false,
    inPlace: false,
    strengths: ["Guaranteed O(n log n)", "Stable", "Excellent on linked structures"],
    weaknesses: ["Needs O(n) auxiliary memory", "Overhead on tiny arrays"],
    bestSuitedFor: ["Large datasets", "Stability-sensitive records", "External sorting"],
    worstSuitedFor: ["Memory-constrained environments", "Very small arrays"],
  },
  {
    id: "quick-sort",
    name: "Quick Sort",
    shortDescription: "Partitions around a pivot and recurses.",
    description:
      "Picks a pivot, partitions elements around it and recurses on both sides. The fastest general purpose choice in practice thanks to cache friendliness, but sensitive to pivot quality.",
    complexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)", space: "O(log n)" },
    stable: false,
    adaptive: false,
    inPlace: true,
    strengths: ["Fastest average case in practice", "Cache friendly", "In-place"],
    weaknesses: ["Quadratic worst case", "Unstable", "Degrades on many duplicates"],
    bestSuitedFor: ["Large random datasets", "Speed-first workloads"],
    worstSuitedFor: ["Adversarial input", "Stability-sensitive records"],
  },
  {
    id: "heap-sort",
    name: "Heap Sort",
    shortDescription: "Builds a heap, then extracts the maximum repeatedly.",
    description:
      "Turns the array into a binary heap and repeatedly pulls the largest element to the end. Worst-case O(n log n) with constant memory, but weak locality makes it slower than quick sort in practice.",
    complexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)", space: "O(1)" },
    stable: false,
    adaptive: false,
    inPlace: true,
    strengths: ["Worst case O(n log n)", "Constant extra memory", "No recursion needed"],
    weaknesses: ["Poor cache locality", "Unstable", "Higher constants than quick sort"],
    bestSuitedFor: ["Memory-tight systems", "Worst-case guarantees"],
    worstSuitedFor: ["Stability-sensitive records", "Latency-critical small arrays"],
  },
];

export const ALGORITHM_MAP: Record<AlgorithmId, AlgorithmProfileData> = ALGORITHMS.reduce(
  (acc, a) => ({ ...acc, [a.id]: a }),
  {} as Record<AlgorithmId, AlgorithmProfileData>,
);

export function algorithmName(id: AlgorithmId): string {
  return ALGORITHM_MAP[id]?.name ?? id;
}

export const MOCK_RECOMMENDATION: Recommendation = {
  algorithmId: "insertion-sort",
  suitability: 92,
  reasons: [
    "Dataset is nearly sorted, so few shifts are required",
    "Only a small number of elements are out of place",
    "Adaptive behaviour approaches linear time here",
    "Memory priority is high and this sort works in place",
  ],
  properties: ["Stable", "Adaptive", "In-place", "O(1) space"],
  alternatives: [
    { algorithmId: "merge-sort", suitability: 74, note: "Guaranteed O(n log n), but needs O(n) memory" },
    { algorithmId: "quick-sort", suitability: 68, note: "Faster on random data, ignores existing order" },
    { algorithmId: "bubble-sort", suitability: 55, note: "Also adaptive, but far more swaps" },
  ],
};

function metrics(timeMs: number, comparisons: number, swaps: number, writes: number): Metrics {
  return { timeMs, comparisons, swaps, writes, operations: comparisons + swaps + writes };
}

export const MOCK_METRICS: Record<AlgorithmId, Metrics> = {
  "bubble-sort": metrics(48.2, 12_486, 6_193, 12_386),
  "selection-sort": metrics(31.7, 12_490, 498, 996),
  "insertion-sort": metrics(4.1, 1_842, 921, 1_842),
  "merge-sort": metrics(6.9, 3_984, 0, 4_488),
  "quick-sort": metrics(5.2, 4_231, 1_106, 2_212),
  "heap-sort": metrics(7.8, 5_120, 2_048, 4_096),
};

export const MOCK_BATTLE_IDS: AlgorithmId[] = ["quick-sort", "merge-sort", "insertion-sort"];

export const STRESS_SCENARIOS: StressScenario[] = [
  {
    id: "nearly-sorted",
    title: "Nearly Sorted",
    datasetKind: "nearly-sorted",
    summary: "Most elements already sit in position; only a handful drift.",
    pressure: "Rewards adaptive sorts, punishes fixed-cost partitioning.",
    hurts: ["selection-sort", "merge-sort"],
    favors: ["insertion-sort", "bubble-sort"],
  },
  {
    id: "reverse-sorted",
    title: "Reverse Sorted",
    datasetKind: "reverse-sorted",
    summary: "Every pair is out of order — the maximum possible inversions.",
    pressure: "Worst case for shift-based sorts, stress for naive pivots.",
    hurts: ["insertion-sort", "bubble-sort"],
    favors: ["merge-sort", "heap-sort"],
  },
  {
    id: "duplicate-heavy",
    title: "Duplicate Heavy",
    datasetKind: "duplicate-heavy",
    summary: "A tiny set of distinct keys repeated across the dataset.",
    pressure: "Unbalanced partitions and stability differences show up here.",
    hurts: ["quick-sort"],
    favors: ["merge-sort"],
  },
  {
    id: "already-sorted",
    title: "Already Sorted",
    datasetKind: "sorted",
    summary: "The input is fully ordered before the run begins.",
    pressure: "Separates sorts that detect order from sorts that never look.",
    hurts: ["selection-sort", "quick-sort"],
    favors: ["insertion-sort", "bubble-sort"],
  },
  {
    id: "random",
    title: "Random",
    datasetKind: "random",
    summary: "Uniformly shuffled values with no exploitable structure.",
    pressure: "The neutral baseline every other scenario is measured against.",
    hurts: ["bubble-sort"],
    favors: ["quick-sort"],
  },
  {
    id: "large-dataset",
    title: "Large Dataset",
    datasetKind: "random",
    summary: "Scale pushed high enough for growth rates to dominate.",
    pressure: "Quadratic sorts collapse; memory overhead becomes visible.",
    hurts: ["bubble-sort", "selection-sort", "insertion-sort"],
    favors: ["quick-sort", "merge-sort", "heap-sort"],
  },
];

export const MOCK_AUTOPSY: AutopsySection[] = [
  {
    title: "Dataset characteristics",
    detail:
      "The dataset was nearly sorted: roughly 4% of elements were displaced, and no element sat more than three positions from its final index.",
  },
  {
    title: "Algorithm properties",
    detail:
      "Insertion sort is adaptive — the inner loop exits as soon as an element is in order, so a short prefix scan replaces a full pass.",
  },
  {
    title: "Measured metrics",
    detail:
      "1,842 comparisons against 4,231 for quick sort, with zero auxiliary allocation and 921 shifts total across the run.",
  },
  {
    title: "Complexity in context",
    detail:
      "Asymptotically O(n²), but on this input the effective behaviour collapses toward O(n + d) where d is the number of inversions.",
  },
  {
    title: "Practical behaviour",
    detail:
      "Tight sequential access keeps the working set in cache, so per-operation cost stays far below the divide-and-conquer alternatives.",
  },
];

export const MOCK_HISTORY: ExperimentResult[] = [
  {
    id: "exp-014",
    name: "Nearly sorted · 5k · adaptive check",
    createdAt: "2026-09-08T14:12:00Z",
    dataset: { kind: "nearly-sorted", size: 5000 },
    runs: [],
    winnerId: "insertion-sort",
    keyMetric: { key: "timeMs", value: 4.1 },
  },
  {
    id: "exp-013",
    name: "Random · 20k · speed first",
    createdAt: "2026-09-07T09:48:00Z",
    dataset: { kind: "random", size: 20000 },
    runs: [],
    winnerId: "quick-sort",
    keyMetric: { key: "timeMs", value: 18.6 },
  },
  {
    id: "exp-012",
    name: "Duplicate heavy · 12k · stability",
    createdAt: "2026-09-05T17:03:00Z",
    dataset: { kind: "duplicate-heavy", size: 12000 },
    runs: [],
    winnerId: "merge-sort",
    keyMetric: { key: "comparisons", value: 21_480 },
  },
  {
    id: "exp-011",
    name: "Reverse sorted · 8k · worst case",
    createdAt: "2026-09-03T11:27:00Z",
    dataset: { kind: "reverse-sorted", size: 8000 },
    runs: [],
    winnerId: "heap-sort",
    keyMetric: { key: "swaps", value: 9_204 },
  },
];

/** Deterministic pseudo-random bars for placeholder visualizations. */
export function sampleBars(count: number, seed = 7): number[] {
  const out: number[] = [];
  let s = seed;
  for (let i = 0; i < count; i++) {
    s = (s * 1103515245 + 12345) % 2147483648;
    out.push(8 + (s % 92));
  }
  return out;
}

export function shapedBars(kind: string, count = 48): number[] {
  const base = sampleBars(count, 13);
  switch (kind) {
    case "sorted":
      return [...base].sort((a, b) => a - b);
    case "reverse-sorted":
      return [...base].sort((a, b) => b - a);
    case "nearly-sorted": {
      const sorted = [...base].sort((a, b) => a - b);
      for (let i = 3; i < sorted.length; i += 11) {
        const a = sorted[i] ?? 0;
        const b = sorted[i - 2] ?? 0;
        sorted[i] = b;
        sorted[i - 2] = a;
      }
      return sorted;
    }
    case "duplicate-heavy": {
      const levels = [18, 42, 66, 90];
      return base.map((v) => levels[v % 4] ?? 50);
    }
    default:
      return base;
  }
}
