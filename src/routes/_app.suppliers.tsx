import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Download, Plus, Truck } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { StatusBadge } from "@/components/common/status-badge";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { SUPPLIERS } from "@/lib/mock-data";
import type { Supplier } from "@/types";

export const Route = createFileRoute("/_app/suppliers")({
  head: () => ({
    meta: [{ title: "Suppliers — StockSense AI" }, { name: "description", content: "Supplier directory and performance." }],
  }),
  component: SuppliersPage,
});

function SuppliersPage() {
  const columns = useMemo<ColumnDef<Supplier>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Supplier",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary-glow">
              <Truck className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="truncate font-medium">{row.original.name}</div>
              <div className="truncate text-xs text-muted-foreground">{row.original.email}</div>
            </div>
          </div>
        ),
      },
      { accessorKey: "contact", header: "Contact" },
      { accessorKey: "country", header: "Country" },
      { accessorKey: "products", header: "SKUs" },
      {
        accessorKey: "onTime",
        header: "On-time %",
        cell: ({ getValue }) => (
          <span className={Number(getValue()) > 90 ? "text-success" : "text-warning"}>
            {String(getValue())}%
          </span>
        ),
      },
      { accessorKey: "status", header: "Status", cell: ({ getValue }) => <StatusBadge status={String(getValue())} /> },
    ],
    [],
  );

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Procurement"
        title="Suppliers"
        description="Manage vendors, lead times, and performance across your supply chain."
        actions={
          <>
            <Button variant="outline" className="h-10 rounded-xl">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <Button className="h-10 rounded-xl gradient-primary text-primary-foreground shadow-elegant">
              <Plus className="mr-2 h-4 w-4" /> New supplier
            </Button>
          </>
        }
      />
      <DataTable data={SUPPLIERS} columns={columns} searchPlaceholder="Search suppliers..." />
    </div>
  );
}
