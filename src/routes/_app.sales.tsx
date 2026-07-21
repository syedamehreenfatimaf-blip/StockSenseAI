import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { Download, Filter, Plus, DollarSign, ShoppingCart, Receipt, TrendingUp } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { StatusBadge } from "@/components/common/status-badge";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SALES } from "@/lib/mock-data";
import { formatCurrency, formatDateTime } from "@/lib/format";
import type { Sale } from "@/types";

export const Route = createFileRoute("/_app/sales")({
  head: () => ({
    meta: [
      { title: "Sales — StockSense AI" },
      { name: "description", content: "Track sales, invoices, and customer orders." },
    ],
  }),
  component: SalesPage,
});

function SalesPage() {
  const columns = useMemo<ColumnDef<Sale>[]>(
    () => [
      { accessorKey: "invoice", header: "Invoice",
        cell: ({ getValue }) => <span className="font-mono text-xs">{String(getValue())}</span> },
      {
        accessorKey: "customer",
        header: "Customer",
        cell: ({ row }) => (
          <div className="min-w-0">
            <div className="truncate font-medium">{row.original.customer}</div>
            <div className="truncate text-xs text-muted-foreground">{row.original.email}</div>
          </div>
        ),
      },
      { accessorKey: "channel", header: "Channel",
        cell: ({ getValue }) => <Badge variant="outline" className="border-border bg-muted/40">{String(getValue())}</Badge> },
      { accessorKey: "items", header: "Items" },
      { accessorKey: "amount", header: "Amount",
        cell: ({ getValue }) => <span className="font-semibold tabular-nums">{formatCurrency(Number(getValue()))}</span> },
      { accessorKey: "status", header: "Status",
        cell: ({ getValue }) => <StatusBadge status={String(getValue())} /> },
      { accessorKey: "date", header: "Date",
        cell: ({ getValue }) => <span className="text-xs text-muted-foreground">{formatDateTime(String(getValue()))}</span> },
    ],
    [],
  );

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Commerce"
        title="Sales"
        description="Every order across online, POS, and wholesale — in one place."
        actions={
          <>
            <Button variant="outline" className="h-10 rounded-xl">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <Button className="h-10 rounded-xl gradient-primary text-primary-foreground shadow-elegant">
              <Plus className="mr-2 h-4 w-4" /> New sale
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Revenue (MTD)" value="$284,921" delta={12.4} positive icon={DollarSign} index={0} />
        <StatCard label="Orders" value="3,842" delta={8.1} positive icon={ShoppingCart} index={1} />
        <StatCard label="AOV" value="$74" delta={2.6} positive icon={TrendingUp} index={2} />
        <StatCard label="Refunds" value="42" delta={-4.2} positive icon={Receipt} index={3} />
      </div>

      <DataTable
        data={SALES}
        columns={columns}
        searchPlaceholder="Search invoices, customers..."
        toolbar={
          <Button variant="outline" className="h-10 rounded-xl">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        }
      />
    </div>
  );
}
