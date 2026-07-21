import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowUpRight,
  Boxes,
  DollarSign,
  Package,
  ShoppingCart,
  Sparkles,
  Users,
  Zap,
  TrendingUp,
  AlertTriangle,
  Truck,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PageHeader, SectionHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { StatusBadge } from "@/components/common/status-badge";
import {
  ACTIVITIES,
  KPIS,
  PRODUCTS,
  REVENUE_TREND,
  SALES,
  TOP_PRODUCTS,
  WEEKLY_SALES,
} from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";

export const Route = createFileRoute("/_app/")({
  head: () => ({
    meta: [
      { title: "Dashboard — StockSense AI" },
      { name: "description", content: "Real-time overview of revenue, inventory, and AI insights." },
    ],
  }),
  component: Dashboard,
});

const ICONS = [DollarSign, ShoppingCart, TrendingUp, Package, Boxes, Users, AlertTriangle, Zap];

function Dashboard() {
  const lowStock = PRODUCTS.filter((p) => p.status !== "in-stock").slice(0, 5);
  const recent = SALES.slice(0, 6);

  return (
    <div className="flex flex-col gap-8">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-border bg-card/60 p-6 shadow-card lg:p-8"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(60% 80% at 90% 0%, color-mix(in oklab, var(--primary-glow) 30%, transparent), transparent 60%), radial-gradient(50% 80% at 10% 100%, color-mix(in oklab, var(--primary) 25%, transparent), transparent 55%)",
          }}
        />
        <div className="relative grid grid-cols-[minmax(0,1fr)_auto] items-start gap-6 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
          <div className="min-w-0">
            <Badge className="mb-3 border-primary/30 bg-primary/15 font-semibold text-primary-glow hover:bg-primary/20">
              <Sparkles className="mr-1 h-3 w-3" /> AI insights ready
            </Badge>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
              Good morning, Ava.
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Revenue is up{" "}
              <span className="font-semibold text-success">12.4%</span> vs last month and{" "}
              <span className="font-semibold text-warning">27 items</span> need restocking. Your
              AI copilot has drafted 4 purchase orders ready to review.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <Button variant="outline" className="h-10 rounded-xl">
              View report
            </Button>
            <Button className="h-10 rounded-xl gradient-primary text-primary-foreground shadow-elegant">
              <Sparkles className="mr-2 h-4 w-4" /> Ask StockSense AI
            </Button>
          </div>
        </div>
      </motion.section>

      {/* KPIs */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPIS.map((k, i) => (
          <StatCard
            key={k.label}
            label={k.label}
            value={k.value}
            delta={k.delta}
            positive={k.positive}
            hint={k.hint}
            icon={ICONS[i % ICONS.length]}
            index={i}
          />
        ))}
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2 overflow-hidden border-border/70 bg-card/70 shadow-card">
          <CardHeader className="pb-2">
            <SectionHeader
              title="Revenue"
              description="Monthly revenue and profit — last 12 months"
              actions={
                <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary-glow">
                  +18.2% YoY
                </Badge>
              }
            />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[300px] w-full">
              <ResponsiveContainer>
                <AreaChart data={REVENUE_TREND} margin={{ top: 10, right: 8, left: -8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="rev" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.55} />
                      <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="prof" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                    formatter={(v: number) => formatCurrency(v)}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="var(--color-chart-1)" strokeWidth={2.5} fill="url(#rev)" />
                  <Area type="monotone" dataKey="profit" stroke="var(--color-chart-2)" strokeWidth={2.5} fill="url(#prof)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-border/70 bg-card/70 shadow-card">
          <CardHeader className="pb-2">
            <SectionHeader title="Sales this week" description="Online vs Point of Sale" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[300px] w-full">
              <ResponsiveContainer>
                <BarChart data={WEEKLY_SALES} margin={{ top: 10, right: 8, left: -12, bottom: 0 }} barCategoryGap={18}>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                    cursor={{ fill: "color-mix(in oklab, var(--primary) 8%, transparent)" }}
                  />
                  <Bar dataKey="online" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="pos" fill="var(--color-chart-3)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Recent sales + Top products + AI insights */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2 border-border/70 bg-card/70 shadow-card">
          <CardHeader className="pb-2">
            <SectionHeader
              title="Recent sales"
              description="Latest orders across all channels"
              actions={
                <Button variant="ghost" size="sm" className="text-primary-glow">
                  View all <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              }
            />
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border">
              {recent.map((s) => (
                <div key={s.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3 sm:flex sm:flex-wrap sm:justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-xs font-semibold text-primary-glow">
                      {s.customer.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium">{s.customer}</div>
                      <div className="truncate text-xs text-muted-foreground">
                        {s.invoice} · {s.channel} · {s.items} items
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-semibold">{formatCurrency(s.amount)}</div>
                    </div>
                    <StatusBadge status={s.status} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <Card className="border-border/70 bg-card/70 shadow-card">
            <CardHeader className="pb-2">
              <SectionHeader title="Top products" description="This month" />
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pt-2">
              {TOP_PRODUCTS.map((p, i) => {
                const pct = Math.round((p.sold / TOP_PRODUCTS[0].sold) * 100);
                return (
                  <div key={p.name} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-muted text-[10px] font-semibold text-muted-foreground">
                          {i + 1}
                        </span>
                        <span className="truncate text-sm font-medium">{p.name}</span>
                      </div>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {p.sold.toLocaleString()} sold
                      </span>
                    </div>
                    <Progress value={pct} className="h-1.5" />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-primary/30 bg-card/70 shadow-card">
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(60% 80% at 100% 0%, color-mix(in oklab, var(--primary-glow) 25%, transparent), transparent 60%)",
              }}
            />
            <CardHeader className="relative pb-2">
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-lg gradient-primary text-primary-foreground">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold">AI insights</div>
                  <div className="text-xs text-muted-foreground">Updated 2m ago</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative flex flex-col gap-3 pt-2 text-sm">
              <p className="text-foreground/90">
                Demand for <span className="font-semibold">Fitness</span> category will spike{" "}
                <span className="font-semibold text-success">+18%</span> in the next 14 days.
                Consider reordering top 5 SKUs.
              </p>
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Aurora Wireless Buds</span> will
                stock out in <span className="font-semibold text-warning">4 days</span> at current velocity.
              </p>
              <Button size="sm" className="mt-2 h-8 w-fit rounded-lg gradient-primary text-primary-foreground">
                Review recommendations
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Low stock + Activity + Deliveries */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="border-border/70 bg-card/70 shadow-card">
          <CardHeader className="pb-2">
            <SectionHeader
              title="Low stock alerts"
              description="Items below reorder point"
              actions={<Badge variant="outline" className="border-warning/30 bg-warning/10 text-warning">27</Badge>}
            />
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {lowStock.map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{p.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{p.sku}</div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-xs text-muted-foreground">{p.stock} left</span>
                  <StatusBadge status={p.status} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/70 shadow-card">
          <CardHeader className="pb-2">
            <SectionHeader title="Recent activity" description="Team + system events" />
          </CardHeader>
          <CardContent>
            <ol className="relative ml-3 flex flex-col gap-4 border-l border-border pl-5">
              {ACTIVITIES.map((a) => (
                <li key={a.id} className="relative">
                  <span className="absolute -left-[26px] top-1.5 grid h-3 w-3 place-items-center rounded-full bg-primary/20 ring-2 ring-background">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-glow" />
                  </span>
                  <div className="text-sm">
                    <span className="font-medium">{a.actor}</span>{" "}
                    <span className="text-muted-foreground">{a.action}</span>{" "}
                    <span className="font-medium text-foreground">{a.target}</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground">{a.at}</div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/70 shadow-card">
          <CardHeader className="pb-2">
            <SectionHeader title="Upcoming deliveries" description="Next 7 days" />
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {[
              { name: "Northwind Co.", eta: "Tomorrow · 10:00", items: 480, on: true },
              { name: "Halo Labs", eta: "Thu · 14:30", items: 220, on: true },
              { name: "Vertex Supply", eta: "Fri · 09:00", items: 96, on: false },
              { name: "Orbit Group", eta: "Mon · 11:00", items: 340, on: true },
            ].map((d) => (
              <div key={d.name} className="flex items-center gap-3 rounded-xl border border-border bg-background/40 p-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary-glow">
                  <Truck className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{d.name}</div>
                  <div className="truncate text-xs text-muted-foreground">
                    {d.eta} · {d.items} items
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={
                    d.on
                      ? "border-success/30 bg-success/10 text-success"
                      : "border-warning/30 bg-warning/10 text-warning"
                  }
                >
                  {d.on ? "On time" : "Delayed"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

// Suppress unused import warning during initial render
void PageHeader;
