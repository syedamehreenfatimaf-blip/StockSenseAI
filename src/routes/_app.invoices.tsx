import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Download, Plus, Receipt } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { StatusBadge } from "@/components/common/status-badge";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { SALES } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Sale } from "@/types";

export const Route = createFileRoute("/_app/invoices")({
  head: () => ({ meta: [{ title: "Invoices — StockSense AI" }] }),
  component: InvoicesPage,
});

function InvoicesPage() {
  const columns = useMemo<ColumnDef<Sale>[]>(
    () => [
      {
        accessorKey: "invoice",
        header: "Invoice",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary-glow">
              <Receipt className="h-4 w-4" />
            </div>
            <span className="font-mono text-xs">{row.original.invoice}</span>
          </div>
        ),
      },
      { accessorKey: "customer", header: "Customer" },
      { accessorKey: "amount", header: "Amount", cell: ({ getValue }) => <span className="font-semibold tabular-nums">{formatCurrency(Number(getValue()))}</span> },
      { accessorKey: "status", header: "Status", cell: ({ getValue }) => <StatusBadge status={String(getValue())} /> },
      { accessorKey: "date", header: "Issued", cell: ({ getValue }) => <span className="text-xs text-muted-foreground">{formatDate(String(getValue()))}</span> },
    ],
    [],
  );

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Billing"
        title="Invoices"
        description="All invoices issued from StockSense AI."
        actions={
          <>
            <Button variant="outline" className="h-10 rounded-xl">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <Button className="h-10 rounded-xl gradient-primary text-primary-foreground shadow-elegant">
              <Plus className="mr-2 h-4 w-4" /> New invoice
            </Button>
          </>
        }
      />
      <DataTable data={SALES} columns={columns} searchPlaceholder="Search invoices..." />
    </div>
  );
}
