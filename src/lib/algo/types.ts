/**
 * Core domain types for ALGO//BATTLE.
 *
 * These types are the contract between the UI and the (future) algorithm
 * engine. Components must depend on these types only — never on the mock
 * fixtures — so the real engine can be swapped in without UI changes.
 */

export type AlgorithmId =
  | "bubble-sort"
  | "selection-sort"
  | "insertion-sort"
  | "merge-sort"
  | "quick-sort"
  | "heap-sort";

export type Complexity = string;

export interface AlgorithmProfileData {
  id: AlgorithmId;
  name: string;
  shortDescription: string;
  description: string;
  complexity: {
    best: Complexity;
    average: Complexity;
    worst: Complexity;
    space: Complexity;
  };
  stable: boolean;
  adaptive: boolean;
  inPlace: boolean;
  strengths: string[];
  weaknesses: string[];
  bestSuitedFor: string[];
  worstSuitedFor: string[];
}

export type DatasetKind =
  | "random"
  | "sorted"
  | "reverse-sorted"
  | "nearly-sorted"
  | "duplicate-heavy"
  | "custom";

export interface DatasetConfig {
  kind: DatasetKind;
  size: number;
  /** Only used when kind === "custom". */
  customValues?: number[];
}

export type Priority = "low" | "balanced" | "high";

export interface RequirementConfig {
  stabilityRequired: boolean;
  memoryPriority: Priority;
  speedPriority: Priority;
  scale: "small" | "large";
}

export interface ProblemDefinition {
  dataset: DatasetConfig;
  requirements: RequirementConfig;
}

export interface Recommendation {
  algorithmId: AlgorithmId;
  suitability: number; // 0-100
  reasons: string[];
  properties: string[];
  alternatives: Array<{
    algorithmId: AlgorithmId;
    suitability: number;
    note: string;
  }>;
}

export type MetricKey = "timeMs" | "comparisons" | "swaps" | "writes" | "operations";

export interface Metrics {
  timeMs: number;
  comparisons: number;
  swaps: number;
  writes: number;
  operations: number;
}

export interface ExperimentConfigData {
  dataset: DatasetConfig;
  algorithmIds: AlgorithmId[];
  trials: number;
  metrics: MetricKey[];
}

export type RunStatus = "idle" | "running" | "paused" | "done";

export interface AlgorithmRun {
  algorithmId: AlgorithmId;
  status: RunStatus;
  progress: number; // 0-100
  metrics: Metrics;
}

export interface ExperimentResult {
  id: string;
  name: string;
  createdAt: string;
  dataset: DatasetConfig;
  runs: AlgorithmRun[];
  winnerId: AlgorithmId;
  keyMetric: { key: MetricKey; value: number };
}

export interface StressScenario {
  id: string;
  title: string;
  datasetKind: DatasetKind;
  summary: string;
  pressure: string;
  hurts: AlgorithmId[];
  favors: AlgorithmId[];
}

export interface AutopsySection {
  title: string;
  detail: string;
}

export interface Prediction {
  predictedId: AlgorithmId | null;
  actualId: AlgorithmId | null;
}
