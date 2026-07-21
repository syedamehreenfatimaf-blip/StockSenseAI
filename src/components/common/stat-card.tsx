import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  delta,
  positive,
  hint,
  icon: Icon,
  index = 0,
}: {
  label: string;
  value: string;
  delta?: number;
  positive?: boolean;
  hint?: string;
  icon?: LucideIcon;
  index?: number;
}) {
  const up = positive ?? (delta ?? 0) >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35, ease: "easeOut" }}
    >
      <Card className="group relative overflow-hidden border-border/70 bg-card/80 shadow-card transition-all hover:border-primary/30 hover:shadow-elegant">
        <div className="pointer-events-none absolute inset-x-0 -top-24 h-40 opacity-0 blur-3xl transition-opacity group-hover:opacity-60"
             style={{ background: "radial-gradient(60% 100% at 50% 0%, color-mix(in oklab, var(--primary) 45%, transparent), transparent)" }} />
        <CardContent className="relative p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {label}
              </div>
              <div className="mt-2 truncate text-2xl font-semibold tracking-tight">{value}</div>
            </div>
            {Icon && (
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary-glow">
                <Icon className="h-5 w-5" />
              </div>
            )}
          </div>
          <div className="mt-4 flex items-center gap-2">
            {typeof delta === "number" && (
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                  up
                    ? "bg-success/15 text-success"
                    : "bg-destructive/15 text-destructive",
                )}
              >
                {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {Math.abs(delta)}%
              </span>
            )}
            {hint && <span className="truncate text-[11px] text-muted-foreground">{hint}</span>}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
