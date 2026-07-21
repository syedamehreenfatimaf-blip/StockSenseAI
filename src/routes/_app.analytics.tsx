import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader, SectionHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CATEGORY_MIX, REVENUE_TREND, TOP_PRODUCTS, WEEKLY_SALES } from "@/lib/mock-data";
import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { formatCurrency } from "@/lib/format";

export const Route = createFileRoute("/_app/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — StockSense AI" },
      { name: "description", content: "Deep analytics across revenue, categories, and channels." },
    ],
  }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Insights"
        title="Analytics"
        description="Understand what's driving growth, what's slipping, and where to invest next."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Revenue" value="$1.24M" delta={18.2} positive icon={DollarSign} index={0} />
        <StatCard label="Orders" value="12,842" delta={9.4} positive icon={ShoppingCart} index={1} />
        <StatCard label="Growth" value="+18.2%" delta={4.1} positive icon={TrendingUp} index={2} />
        <StatCard label="New customers" value="1,204" delta={5.9} positive icon={Users} index={3} />
      </div>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2 border-border/70 bg-card/70 shadow-card">
          <CardHeader className="pb-2">
            <SectionHeader title="Revenue vs profit" description="12-month trend" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[320px] w-full">
              <ResponsiveContainer>
                <LineChart data={REVENUE_TREND} margin={{ top: 10, right: 8, left: -8, bottom: 0 }}>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }}
                    formatter={(v: number) => formatCurrency(v)}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="revenue" stroke="var(--color-chart-1)" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="profit" stroke="var(--color-chart-2)" strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/70 shadow-card">
          <CardHeader className="pb-2">
            <SectionHeader title="Category mix" description="Share of revenue" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[260px] w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={CATEGORY_MIX}
                    dataKey="value"
                    innerRadius={62}
                    outerRadius={92}
                    paddingAngle={3}
                    stroke="none"
                  >
                    {CATEGORY_MIX.map((c) => (
                      <Cell key={c.name} fill={c.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }}
                    formatter={(v: number) => `${v}%`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-2 flex flex-col gap-2 text-sm">
              {CATEGORY_MIX.map((c) => (
                <li key={c.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
                    {c.name}
                  </span>
                  <span className="font-medium tabular-nums text-muted-foreground">{c.value}%</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card className="border-border/70 bg-card/70 shadow-card">
          <CardHeader className="pb-2">
            <SectionHeader title="Weekly sales" description="Channel breakdown" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[280px] w-full">
              <ResponsiveContainer>
                <BarChart data={WEEKLY_SALES} margin={{ top: 10, right: 8, left: -12, bottom: 0 }} barCategoryGap={20}>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }}
                    cursor={{ fill: "color-mix(in oklab, var(--primary) 8%, transparent)" }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="online" stackId="a" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="pos" stackId="a" fill="var(--color-chart-3)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/70 shadow-card">
          <CardHeader className="pb-2">
            <SectionHeader title="Top products" description="Revenue leaders" />
          </CardHeader>
          <CardContent className="pt-4">
            <motion.ul initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.06 } } }} className="flex flex-col gap-4">
              {TOP_PRODUCTS.map((p, i) => {
                const pct = Math.round((p.revenue / TOP_PRODUCTS[0].revenue) * 100);
                return (
                  <motion.li key={p.name} variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-3">
                        <span className="grid h-7 w-7 place-items-center rounded-md bg-muted text-xs font-semibold text-muted-foreground">
                          {i + 1}
                        </span>
                        <span className="font-medium">{p.name}</span>
                      </span>
                      <span className="tabular-nums text-muted-foreground">{formatCurrency(p.revenue)}</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        className="h-full rounded-full gradient-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: i * 0.06 }}
                      />
                    </div>
                  </motion.li>
                );
              })}
            </motion.ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
