import { Bell, Menu, Moon, Plus, Search, Sun } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { NOTIFICATIONS } from "@/lib/mock-data";
import { useTheme } from "@/components/common/theme-provider";
import { cn } from "@/lib/utils";

export function AppNavbar({ onOpenMobileSidebar }: { onOpenMobileSidebar: () => void }) {
  const { theme, toggle } = useTheme();
  const unread = NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center gap-3 border-b border-border bg-background/70 px-4 backdrop-blur-xl lg:px-8">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onOpenMobileSidebar}
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Search */}
      <div className="relative flex-1 max-w-xl">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search products, orders, customers..."
          className="h-10 rounded-xl border-border bg-card/60 pl-10 pr-16 text-sm shadow-inner focus-visible:ring-primary/40"
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-border bg-muted/60 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground md:inline-flex">
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button
          variant="outline"
          className="hidden h-10 gap-2 rounded-xl border-border bg-card/60 sm:inline-flex"
        >
          <Plus className="h-4 w-4" />
          Quick action
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          className="h-10 w-10 rounded-xl"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-10 w-10 rounded-xl"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              {unread > 0 && (
                <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-destructive px-1 text-[9px] font-bold text-destructive-foreground">
                  {unread}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              <Badge variant="secondary" className="text-[10px]">
                {unread} new
              </Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {NOTIFICATIONS.slice(0, 4).map((n) => (
              <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-0.5 py-2.5">
                <div className="flex w-full items-center gap-2">
                  <span
                    className={cn(
                      "h-2 w-2 shrink-0 rounded-full",
                      n.type === "warning" && "bg-warning",
                      n.type === "success" && "bg-success",
                      n.type === "danger" && "bg-destructive",
                      n.type === "info" && "bg-primary",
                    )}
                  />
                  <span className="truncate text-sm font-medium">{n.title}</span>
                  <span className="ml-auto text-[10px] text-muted-foreground">{n.at}</span>
                </div>
                <span className="line-clamp-2 pl-4 text-xs text-muted-foreground">
                  {n.description}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center gap-2 rounded-xl border border-border bg-card/60 p-1.5 pr-3 transition-colors hover:bg-card"
              aria-label="Profile menu"
            >
              <Avatar className="h-7 w-7 ring-2 ring-primary/40">
                <AvatarFallback className="bg-primary/20 text-[11px] font-semibold text-primary-glow">
                  AK
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium sm:inline">Ava</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Ava Klein</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Company</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>API keys</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
