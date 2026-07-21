import { createFileRoute } from "@tanstack/react-router";
import { Plus, ClipboardList } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { StatusBadge } from "@/components/common/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";

export const Route = createFileRoute("/_app/purchase-orders")({
  head: () => ({ meta: [{ title: "Purchase Orders — StockSense AI" }] }),
  component: PurchaseOrdersPage,
});

const POS = [
  { id: "PO-10241", supplier: "Northwind Co.", total: 12480, items: 480, eta: "Nov 14", status: "pending" as const },
  { id: "PO-10242", supplier: "Halo Labs", total: 5620, items: 220, eta: "Nov 16", status: "paid" as const },
  { id: "PO-10243", supplier: "Vertex Supply", total: 3210, items: 96, eta: "Nov 17", status: "pending" as const },
  { id: "PO-10244", supplier: "Orbit Group", total: 8940, items: 340, eta: "Nov 20", status: "paid" as const },
  { id: "PO-10245", supplier: "Nimbus Traders", total: 2180, items: 74, eta: "Nov 22", status: "refunded" as const },
];

function PurchaseOrdersPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Procurement"
        title="Purchase orders"
        description="Track POs across your supplier network, with AI-assisted drafting."
        actions={
          <Button className="h-10 rounded-xl gradient-primary text-primary-foreground shadow-elegant">
            <Plus className="mr-2 h-4 w-4" /> New purchase order
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {POS.map((po) => (
          <Card key={po.id} className="border-border/70 bg-card/70 shadow-card transition-all hover:border-primary/30 hover:shadow-elegant">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary-glow">
                    <ClipboardList className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">{po.id}</div>
                    <div className="mt-0.5 font-semibold">{po.supplier}</div>
                  </div>
                </div>
                <StatusBadge status={po.status} />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                <div>
                  <div className="text-muted-foreground">Total</div>
                  <div className="mt-0.5 font-semibold text-foreground">{formatCurrency(po.total)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Items</div>
                  <div className="mt-0.5 font-semibold text-foreground">{po.items}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">ETA</div>
                  <div className="mt-0.5 font-semibold text-foreground">{po.eta}</div>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" size="sm" className="h-8 rounded-lg">View</Button>
                <Button size="sm" className="h-8 rounded-lg gradient-primary text-primary-foreground">Approve</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
