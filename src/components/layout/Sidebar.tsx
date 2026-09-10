import { Link } from "@tanstack/react-router";
import {
  BarChart3,
  Beaker,
  BookOpen,
  FlaskConical,
  Gauge,
  History,
  Home,
  Swords,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const NAV_ITEMS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/decision-lab", label: "Decision Lab", icon: Beaker },
  { to: "/experiment-lab", label: "Experiment Lab", icon: FlaskConical },
  { to: "/battle", label: "Battle", icon: Swords },
  { to: "/stress-lab", label: "Stress Lab", icon: Gauge },
  { to: "/analysis", label: "Analysis", icon: BarChart3 },
  { to: "/history", label: "History", icon: History },
  { to: "/algorithms", label: "Algorithms", icon: BookOpen },
] as const;

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col gap-6 bg-sidebar px-4 py-6">
      <Link to="/" onClick={onNavigate} className="flex items-center gap-3 px-2">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
          <Zap className="size-4" />
        </span>
        <span className="min-w-0">
          <span className="block font-display text-sm font-bold tracking-tight text-sidebar-foreground">
            ALGO<span className="text-primary">//</span>BATTLE
          </span>
          <span className="mono-label block">Experiment Lab</span>
        </span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            activeOptions={{ exact: to === "/" }}
            className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[status=active]:bg-sidebar-accent data-[status=active]:text-sidebar-accent-foreground"
          >
            <Icon className="size-4 shrink-0 opacity-70 transition-opacity group-hover:opacity-100" />
            <span className="truncate">{label}</span>
          </Link>
        ))}
      </nav>

      <div className="panel-glass space-y-3 p-4">
        <p className="mono-label">Primary flow</p>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Define a problem, take the recommendation, then verify it with a controlled run.
        </p>
        <Button asChild size="sm" className="w-full">
          <Link to="/decision-lab" onClick={onNavigate}>
            Start Experiment
          </Link>
        </Button>
      </div>
    </div>
  );
}
