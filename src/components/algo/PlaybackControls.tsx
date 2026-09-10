import { Pause, Play, RotateCcw, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import type { RunStatus } from "@/lib/algo/types";

export function PlaybackControls({
  status,
  speed,
  onStatusChange,
  onSpeedChange,
  onStep,
  playLabel = "Play",
}: {
  status: RunStatus;
  speed: number;
  onStatusChange: (status: RunStatus) => void;
  onSpeedChange: (speed: number) => void;
  onStep?: () => void;
  playLabel?: string;
}) {
  const running = status === "running";

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-xl border border-border bg-surface/70 p-3 sm:flex sm:justify-between">
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <Button size="sm" onClick={() => onStatusChange(running ? "paused" : "running")}>
          {running ? <Pause className="size-4" /> : <Play className="size-4" />}
          {running ? "Pause" : playLabel}
        </Button>
        <Button size="sm" variant="outline" onClick={onStep} disabled={running}>
          <SkipForward className="size-4" />
          Step
        </Button>
        <Button size="sm" variant="ghost" onClick={() => onStatusChange("idle")}>
          <RotateCcw className="size-4" />
          Reset
        </Button>
      </div>

      <div className="flex w-full max-w-56 shrink-0 items-center gap-3">
        <span className="mono-label">Speed</span>
        <Slider
          value={[speed]}
          min={0.25}
          max={4}
          step={0.25}
          onValueChange={([v]) => onSpeedChange(v ?? speed)}
        />
        <span className="w-10 shrink-0 text-right font-mono text-xs text-primary">{speed}x</span>
      </div>
    </div>
  );
}
