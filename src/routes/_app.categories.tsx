import { createFileRoute } from "@tanstack/react-router";
import { Plus, Tags } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CATEGORY_MIX } from "@/lib/mock-data";
import { motion } from "framer-motion";

export const Route = createFileRoute("/_app/categories")({
  head: () => ({ meta: [{ title: "Categories — StockSense AI" }] }),
  component: CategoriesPage,
});

const CATEGORY_DETAILS = [
  { name: "Electronics", skus: 320, revenue: "$486k", trend: "+14%" },
  { name: "Apparel", skus: 214, revenue: "$282k", trend: "+8%" },
  { name: "Home", skus: 188, revenue: "$211k", trend: "+3%" },
  { name: "Beauty", skus: 96, revenue: "$118k", trend: "+11%" },
  { name: "Fitness", skus: 142, revenue: "$174k", trend: "+22%" },
  { name: "Office", skus: 82, revenue: "$64k", trend: "-1%" },
];

function CategoriesPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Catalog"
        title="Categories"
        description="Group your products, monitor category performance, and shape merchandising."
        actions={
          <Button className="h-10 rounded-xl gradient-primary text-primary-foreground shadow-elegant">
            <Plus className="mr-2 h-4 w-4" /> New category
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {CATEGORY_DETAILS.map((c, i) => {
          const share = CATEGORY_MIX.find((m) => m.name === c.name)?.value ?? 8;
          const up = c.trend.startsWith("+");
          return (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border-border/70 bg-card/70 shadow-card transition-all hover:border-primary/30 hover:shadow-elegant">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary-glow">
                      <Tags className="h-5 w-5" />
                    </div>
                    <span className={`text-xs font-semibold ${up ? "text-success" : "text-destructive"}`}>{c.trend}</span>
                  </div>
                  <div className="mt-4 text-lg font-semibold">{c.name}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {c.skus} SKUs · {c.revenue} revenue
                  </div>
                  <div className="mt-4">
                    <div className="mb-1.5 flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>Share of revenue</span>
                      <span className="font-medium text-foreground">{share}%</span>
                    </div>
                    <Progress value={share * 2.5} className="h-1.5" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
