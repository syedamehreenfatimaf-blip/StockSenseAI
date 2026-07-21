import { useState, type ReactNode } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsUpDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  searchKey?: string;
  searchPlaceholder?: string;
  toolbar?: ReactNode;
  pageSize?: number;
  emptyState?: ReactNode;
};

export function DataTable<T>({
  data,
  columns,
  searchKey,
  searchPlaceholder = "Search...",
  toolbar,
  pageSize = 8,
  emptyState,
}: Props<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
    globalFilterFn: (row, _, value) => {
      const v = String(value).toLowerCase();
      return Object.values(row.original as Record<string, unknown>).some((cell) =>
        String(cell ?? "").toLowerCase().includes(v),
      );
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:flex-wrap sm:justify-between">
        {searchKey !== "__hide" && (
          <Input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder={searchPlaceholder}
            className="h-10 max-w-sm rounded-xl border-border bg-card/60"
          />
        )}
        {toolbar && <div className="flex shrink-0 flex-wrap items-center gap-2">{toolbar}</div>}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card/60">
        <div className="scrollbar-thin overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id} className="border-border hover:bg-transparent">
                  {hg.headers.map((h) => (
                    <TableHead key={h.id} className="whitespace-nowrap text-xs uppercase tracking-wider text-muted-foreground">
                      {h.isPlaceholder ? null : (
                        <button
                          className={cn(
                            "inline-flex items-center gap-1.5 font-semibold",
                            h.column.getCanSort() && "cursor-pointer hover:text-foreground",
                          )}
                          onClick={h.column.getToggleSortingHandler()}
                        >
                          {flexRender(h.column.columnDef.header, h.getContext())}
                          {h.column.getCanSort() && (
                            <ChevronsUpDown className="h-3 w-3 opacity-50" />
                          )}
                        </button>
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="border-border transition-colors hover:bg-muted/30"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="whitespace-nowrap py-3.5 text-sm">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-40 text-center">
                    {emptyState ?? (
                      <span className="text-sm text-muted-foreground">No results.</span>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 text-xs text-muted-foreground sm:flex sm:justify-between">
        <div className="truncate">
          Showing{" "}
          <span className="font-medium text-foreground">
            {table.getRowModel().rows.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-foreground">
            {table.getFilteredRowModel().rows.length}
          </span>{" "}
          results
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 rounded-lg"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="rounded-lg border border-border bg-card/60 px-3 py-1.5 text-xs">
            Page{" "}
            <span className="font-medium text-foreground">
              {table.getState().pagination.pageIndex + 1}
            </span>{" "}
            / {table.getPageCount() || 1}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="h-8 rounded-lg"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
