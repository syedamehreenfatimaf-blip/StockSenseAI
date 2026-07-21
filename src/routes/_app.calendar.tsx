import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/calendar")({
  head: () => ({ meta: [{ title: "Calendar — StockSense AI" }] }),
  component: CalendarPage,
});

const EVENTS: Record<number, { title: string; type: "delivery" | "restock" | "meeting" }[]> = {
  4: [{ title: "Northwind delivery", type: "delivery" }],
  9: [{ title: "Restock: Aurora Buds", type: "restock" }],
  12: [{ title: "Supplier review", type: "meeting" }, { title: "Halo Labs delivery", type: "delivery" }],
  16: [{ title: "Vertex delivery", type: "delivery" }],
  22: [{ title: "Team OKRs", type: "meeting" }],
  27: [{ title: "Restock: Fitness", type: "restock" }],
};

function CalendarPage() {
  const [monthOffset, setMonthOffset] = useState(0);
  const now = new Date();
  const view = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
  const monthName = view.toLocaleString("en-US", { month: "long", year: "numeric" });
  const firstDay = view.getDay();
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const cells = Array.from({ length: 42 }).map((_, i) => {
    const d = i - firstDay + 1;
    return d > 0 && d <= daysInMonth ? d : null;
  });

  const typeStyle = {
    delivery: "bg-primary/15 text-primary-glow border-primary/30",
    restock: "bg-success/15 text-success border-success/30",
    meeting: "bg-warning/15 text-warning border-warning/30",
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Planning"
        title="Calendar"
        description="Deliveries, restocks, meetings — all in one place."
        actions={
          <Button className="h-10 rounded-xl gradient-primary text-primary-foreground shadow-elegant">
            <Plus className="mr-2 h-4 w-4" /> New event
          </Button>
        }
      />

      <Card className="border-border/70 bg-card/70 shadow-card">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">{monthName}</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg" onClick={() => setMonthOffset((v) => v - 1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="h-9 rounded-lg" onClick={() => setMonthOffset(0)}>
                Today
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg" onClick={() => setMonthOffset((v) => v + 1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="px-2 py-1.5">{d}</div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-2">
            {cells.map((d, i) => {
              const isToday = d === now.getDate() && monthOffset === 0;
              const evts = d ? EVENTS[d] ?? [] : [];
              return (
                <div
                  key={i}
                  className={cn(
                    "min-h-[92px] rounded-xl border border-border bg-background/40 p-2 text-xs transition-colors",
                    !d && "opacity-40",
                    isToday && "border-primary/50 bg-primary/5",
                  )}
                >
                  <div className={cn("mb-1 font-semibold", isToday && "text-primary-glow")}>{d ?? ""}</div>
                  <div className="flex flex-col gap-1">
                    {evts.map((e) => (
                      <Badge key={e.title} variant="outline" className={cn("truncate justify-start text-[10px]", typeStyle[e.type])}>
                        {e.title}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
