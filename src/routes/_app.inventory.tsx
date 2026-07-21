import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { Download, Filter, Plus, Package, AlertTriangle, TrendingUp, Boxes } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { StatusBadge } from "@/components/common/status-badge";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PRODUCTS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";
import type { Product } from "@/types";

export const Route = createFileRoute("/_app/inventory")({
  head: () => ({
    meta: [
      { title: "Inventory — StockSense AI" },
      { name: "description", content: "Manage products, stock levels, and suppliers." },
    ],
  }),
  component: InventoryPage,
});

function InventoryPage() {
  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Product",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary-glow">
              <Package className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="truncate font-medium">{row.original.name}</div>
              <div className="truncate text-xs text-muted-foreground">{row.original.sku}</div>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ getValue }) => (
          <Badge variant="outline" className="border-border bg-muted/40 font-medium">
            {String(getValue())}
          </Badge>
        ),
      },
      {
        accessorKey: "stock",
        header: "Stock",
        cell: ({ row }) => (
          <span className="font-medium tabular-nums">{row.original.stock}</span>
        ),
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ getValue }) => (
          <span className="tabular-nums">{formatCurrency(Number(getValue()))}</span>
        ),
      },
      { accessorKey: "supplier", header: "Supplier" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => <StatusBadge status={String(getValue())} />,
      },
      {
        id: "actions",
        header: "",
        enableSorting: false,
        cell: () => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8">
                ···
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View</DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Reorder</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Archive</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [],
  );

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Inventory"
        title="Products"
        description="Manage SKUs, stock levels, and reorder logic across warehouses."
        actions={
          <>
            <Button variant="outline" className="h-10 rounded-xl">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <Button className="h-10 rounded-xl gradient-primary text-primary-foreground shadow-elegant">
              <Plus className="mr-2 h-4 w-4" /> New product
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total SKUs" value="1,284" delta={4.2} positive icon={Boxes} index={0} />
        <StatCard label="Inventory value" value="$612k" delta={1.8} positive icon={TrendingUp} index={1} />
        <StatCard label="Low stock" value="27" delta={3} positive={false} icon={AlertTriangle} index={2} />
        <StatCard label="Out of stock" value="4" delta={-1} positive icon={Package} index={3} />
      </div>

      <DataTable
        data={PRODUCTS}
        columns={columns}
        searchPlaceholder="Search products, SKUs, suppliers..."
        toolbar={
          <>
            <Button variant="outline" className="h-10 rounded-xl">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
            <Button variant="outline" className="h-10 rounded-xl">
              Bulk actions
            </Button>
          </>
        }
      />
    </div>
  );
}
