import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronsLeft, LogOut, Sparkles } from "lucide-react";
import { NAV_SECTIONS } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  collapsed: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
  className?: string;
};

export function AppSidebar({ collapsed, onToggle, onNavigate, className }: Props) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-300 ease-out",
        collapsed ? "w-[76px]" : "w-[280px]",
        className,
      )}
    >
      {/* Brand */}
      <div className="flex h-[72px] items-center justify-between px-4">
        <Link to="/" onClick={onNavigate} className="flex min-w-0 items-center gap-3">
          <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl gradient-primary shadow-elegant">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
            <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-success ring-2 ring-sidebar" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold tracking-tight">
                StockSense <span className="text-primary-glow">AI</span>
              </div>
              <div className="truncate text-[11px] text-muted-foreground">
                Inventory intelligence
              </div>
            </div>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="hidden h-8 w-8 text-muted-foreground hover:text-foreground lg:inline-flex"
          aria-label="Toggle sidebar"
        >
          <ChevronsLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        </Button>
      </div>

      {/* Nav */}
      <ScrollArea className="flex-1 px-3">
        <nav className="flex flex-col gap-6 py-2">
          {NAV_SECTIONS.map((section) => (
            <div key={section.title} className="flex flex-col gap-1">
              {!collapsed && (
                <div className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">
                  {section.title}
                </div>
              )}
              {section.items.map((item) => {
                const active =
                  item.to === "/"
                    ? pathname === "/"
                    : pathname === item.to || pathname.startsWith(item.to + "/");
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={onNavigate}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                      active
                        ? "bg-sidebar-accent text-foreground"
                        : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="active-nav"
                        className="absolute inset-y-1 left-0 w-1 rounded-r-full gradient-primary"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <Icon className={cn("h-[18px] w-[18px] shrink-0", active && "text-primary-glow")} />
                    {!collapsed && (
                      <span className="flex flex-1 items-center justify-between gap-2 truncate">
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className="border-primary/30 bg-primary/15 text-[10px] font-semibold text-primary-glow"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Footer profile */}
      <div className="border-t border-sidebar-border p-3">
        {collapsed ? (
          <div className="flex flex-col items-center gap-2">
            <Avatar className="h-9 w-9 ring-2 ring-primary/40">
              <AvatarFallback className="bg-primary/20 text-xs font-semibold text-primary-glow">
                AK
              </AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-xl border border-sidebar-border bg-sidebar-accent/40 p-2.5">
            <Avatar className="h-9 w-9 shrink-0 ring-2 ring-primary/40">
              <AvatarFallback className="bg-primary/20 text-xs font-semibold text-primary-glow">
                AK
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold">Ava Klein</div>
              <div className="truncate text-[11px] text-muted-foreground">Operations Lead</div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
}
