import { Link } from "@tanstack/react-router";
import { Menu, Play, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TopBar({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:gap-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onOpenMenu} aria-label="Open navigation">
            <Menu className="size-5" />
          </Button>
          <span className="mono-label hidden lg:block">Algorithm Decision &amp; Experiment Lab</span>
        </div>

        <div className="relative min-w-0">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search algorithms, experiments, datasets"
            className="h-9 border-border/70 bg-surface/70 pl-9 text-sm"
          />
        </div>

        <Button asChild size="sm" className="shrink-0">
          <Link to="/decision-lab">
            <Play className="size-4" />
            <span className="hidden sm:inline">Start Experiment</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}
