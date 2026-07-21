import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Download, Plus, Users, Star, ShoppingBag, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { StatusBadge } from "@/components/common/status-badge";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CUSTOMERS } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Customer } from "@/types";

export const Route = createFileRoute("/_app/customers")({
  head: () => ({
    meta: [
      { title: "Customers — StockSense AI" },
      { name: "description", content: "Customer directory, segments, and lifetime value." },
    ],
  }),
  component: CustomersPage,
});

function CustomersPage() {
  const columns = useMemo<ColumnDef<Customer>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Customer",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary/15 text-[11px] font-semibold text-primary-glow">
                {row.original.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="truncate font-medium">{row.original.name}</div>
              <div className="truncate text-xs text-muted-foreground">{row.original.email}</div>
            </div>
          </div>
        ),
      },
      { accessorKey: "company", header: "Company", cell: ({ getValue }) => getValue() ?? <span className="text-muted-foreground">—</span> },
      { accessorKey: "orders", header: "Orders" },
      { accessorKey: "spent", header: "Lifetime value", cell: ({ getValue }) => <span className="font-semibold tabular-nums">{formatCurrency(Number(getValue()))}</span> },
      { accessorKey: "status", header: "Status", cell: ({ getValue }) => <StatusBadge status={String(getValue())} /> },
      { accessorKey: "joined", header: "Joined", cell: ({ getValue }) => <span className="text-xs text-muted-foreground">{formatDate(String(getValue()))}</span> },
    ],
    [],
  );

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="CRM"
        title="Customers"
        description="Everyone who buys from you — with segments, LTV, and history."
        actions={
          <>
            <Button variant="outline" className="h-10 rounded-xl">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <Button className="h-10 rounded-xl gradient-primary text-primary-foreground shadow-elegant">
              <Plus className="mr-2 h-4 w-4" /> New customer
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total customers" value="9,412" delta={5.9} positive icon={Users} index={0} />
        <StatCard label="VIP" value="284" delta={12.1} positive icon={Star} index={1} />
        <StatCard label="Repeat rate" value="42%" delta={1.8} positive icon={ShoppingBag} index={2} />
        <StatCard label="Avg. LTV" value="$412" delta={4.2} positive icon={TrendingUp} index={3} />
      </div>

      <DataTable data={CUSTOMERS} columns={columns} searchPlaceholder="Search customers..." />
    </div>
  );
}
