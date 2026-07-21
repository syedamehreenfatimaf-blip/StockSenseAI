import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const map: Record<string, string> = {
    "in-stock": "bg-success/15 text-success border-success/30",
    "low-stock": "bg-warning/15 text-warning border-warning/30",
    "out-of-stock": "bg-destructive/15 text-destructive border-destructive/30",
    paid: "bg-success/15 text-success border-success/30",
    pending: "bg-warning/15 text-warning border-warning/30",
    refunded: "bg-muted-foreground/15 text-muted-foreground border-muted-foreground/20",
    failed: "bg-destructive/15 text-destructive border-destructive/30",
    active: "bg-success/15 text-success border-success/30",
    vip: "bg-primary/15 text-primary-glow border-primary/30",
    inactive: "bg-muted-foreground/15 text-muted-foreground border-muted-foreground/20",
    onboarding: "bg-info/15 text-info border-info/30",
    paused: "bg-warning/15 text-warning border-warning/30",
  };
  const label = status.replace(/-/g, " ");
  return (
    <Badge
      variant="outline"
      className={cn("capitalize font-medium", map[status] ?? "border-border", className)}
    >
      {label}
    </Badge>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 px-6 py-14 text-center">
      {icon && (
        <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary-glow">
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
