import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText, TrendingUp, Package, Users, DollarSign } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/_app/reports")({
  head: () => ({ meta: [{ title: "Reports — StockSense AI" }] }),
  component: ReportsPage,
});

const REPORTS: { icon: LucideIcon; title: string; description: string; period: string }[] = [
  { icon: DollarSign, title: "Revenue report", description: "Sales, refunds, taxes across all channels", period: "Monthly" },
  { icon: Package, title: "Inventory valuation", description: "Cost, retail value, and turnover metrics", period: "Weekly" },
  { icon: TrendingUp, title: "Growth report", description: "MoM/YoY performance across categories", period: "Monthly" },
  { icon: Users, title: "Customer cohorts", description: "Retention curves and LTV by acquisition month", period: "Quarterly" },
  { icon: FileText, title: "Tax export", description: "Ready-to-file transactional export", period: "Quarterly" },
  { icon: TrendingUp, title: "AI forecast", description: "Next 90 days demand and revenue forecast", period: "Weekly" },
];

function ReportsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Insights"
        title="Reports"
        description="One-click reports for finance, ops, and leadership."
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {REPORTS.map((r) => (
          <Card key={r.title} className="border-border/70 bg-card/70 shadow-card transition-all hover:border-primary/30 hover:shadow-elegant">
            <CardContent className="p-5">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary-glow">
                <r.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{r.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{r.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{r.period}</span>
                <Button size="sm" variant="outline" className="h-8 rounded-lg">
                  <Download className="mr-2 h-3.5 w-3.5" /> Export
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
