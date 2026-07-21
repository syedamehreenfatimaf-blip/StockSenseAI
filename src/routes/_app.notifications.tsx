import { createFileRoute } from "@tanstack/react-router";
import { CheckCheck } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NOTIFICATIONS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/notifications")({
  head: () => ({ meta: [{ title: "Notifications — StockSense AI" }] }),
  component: NotificationsPage,
});

function NotificationsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Inbox"
        title="Notifications"
        description="Every important thing happening in your business — grouped and searchable."
        actions={
          <Button variant="outline" className="h-10 rounded-xl">
            <CheckCheck className="mr-2 h-4 w-4" /> Mark all as read
          </Button>
        }
      />

      <Card className="border-border/70 bg-card/70 shadow-card">
        <CardContent className="p-0">
          <ul className="divide-y divide-border">
            {NOTIFICATIONS.map((n) => (
              <li key={n.id} className="flex items-start gap-4 p-5 transition-colors hover:bg-muted/30">
                <span
                  className={cn(
                    "mt-1 h-2.5 w-2.5 shrink-0 rounded-full",
                    n.type === "warning" && "bg-warning",
                    n.type === "success" && "bg-success",
                    n.type === "danger" && "bg-destructive",
                    n.type === "info" && "bg-primary",
                  )}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <div className="truncate font-medium">{n.title}</div>
                    <div className="shrink-0 text-xs text-muted-foreground">{n.at}</div>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{n.description}</p>
                </div>
                {!n.read && (
                  <span className="ml-auto shrink-0 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary-glow">
                    New
                  </span>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
