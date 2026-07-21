import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bell,
  Building2,
  CreditCard,
  Key,
  Palette,
  Plug,
  Shield,
  Sliders,
  User,
  Users2,
  Activity as ActivityIcon,
  Copy,
  Trash2,
  Plus,
} from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/common/status-badge";
import { useTheme } from "@/components/common/theme-provider";
import { cn } from "@/lib/utils";
import { ACTIVITIES } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings — StockSense AI" }] }),
  component: SettingsPage,
});

const TABS = [
  { key: "general", label: "General", icon: Sliders },
  { key: "business", label: "Business", icon: Building2 },
  { key: "profile", label: "Profile", icon: User },
  { key: "theme", label: "Theme", icon: Palette },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "security", label: "Security", icon: Shield },
  { key: "billing", label: "Billing", icon: CreditCard },
  { key: "api", label: "API Keys", icon: Key },
  { key: "roles", label: "Roles", icon: Users2 },
  { key: "activity", label: "Activity", icon: ActivityIcon },
  { key: "integrations", label: "Integrations", icon: Plug },
] as const;

type TabKey = (typeof TABS)[number]["key"];

function SettingsPage() {
  const [tab, setTab] = useState<TabKey>("general");

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Workspace"
        title="Settings"
        description="Manage your workspace, team, and integrations."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <Card className="h-fit border-border/70 bg-card/70 shadow-card">
          <CardContent className="p-2">
            <nav className="flex flex-col gap-0.5">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    tab === t.key
                      ? "bg-primary/15 text-foreground"
                      : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                  )}
                >
                  <t.icon className={cn("h-4 w-4", tab === t.key && "text-primary-glow")} />
                  {t.label}
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        <div>
          {tab === "general" && <GeneralTab />}
          {tab === "business" && <BusinessTab />}
          {tab === "profile" && <ProfileTab />}
          {tab === "theme" && <ThemeTab />}
          {tab === "notifications" && <NotificationsTab />}
          {tab === "security" && <SecurityTab />}
          {tab === "billing" && <BillingTab />}
          {tab === "api" && <ApiKeysTab />}
          {tab === "roles" && <RolesTab />}
          {tab === "activity" && <ActivityTab />}
          {tab === "integrations" && <IntegrationsTab />}
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="border-border/70 bg-card/70 shadow-card">
      <CardHeader>
        <h3 className="text-base font-semibold">{title}</h3>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </CardHeader>
      <Separator />
      <CardContent className="p-6">{children}</CardContent>
    </Card>
  );
}

function GeneralTab() {
  return (
    <Section title="General" description="Workspace basics">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label>Workspace name</Label>
          <Input defaultValue="StockSense AI Demo" className="h-10 rounded-xl" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Default currency</Label>
          <Input defaultValue="USD" className="h-10 rounded-xl" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Timezone</Label>
          <Input defaultValue="America/New_York" className="h-10 rounded-xl" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Fiscal year start</Label>
          <Input defaultValue="January" className="h-10 rounded-xl" />
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="outline" className="h-10 rounded-xl">Cancel</Button>
        <Button className="h-10 rounded-xl gradient-primary text-primary-foreground" onClick={() => toast.success("Settings saved")}>
          Save changes
        </Button>
      </div>
    </Section>
  );
}

function BusinessTab() {
  return (
    <Section title="Business profile" description="Public information about your company">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <Label>Legal name</Label>
          <Input defaultValue="StockSense AI, Inc." className="h-10 rounded-xl" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Tax ID</Label>
          <Input defaultValue="EIN 12-3456789" className="h-10 rounded-xl" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Support email</Label>
          <Input defaultValue="support@stocksense.ai" className="h-10 rounded-xl" />
        </div>
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <Label>Address</Label>
          <Textarea defaultValue="228 Park Ave S, PMB 12345, New York, NY 10003" className="min-h-[90px] rounded-xl" />
        </div>
      </div>
    </Section>
  );
}

function ProfileTab() {
  return (
    <Section title="Your profile" description="How you appear to your team">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <Avatar className="h-20 w-20 ring-4 ring-primary/30">
          <AvatarFallback className="bg-primary/20 text-lg font-semibold text-primary-glow">AK</AvatarFallback>
        </Avatar>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="h-9 rounded-xl">Upload photo</Button>
          <Button variant="ghost" className="h-9 rounded-xl text-destructive">Remove</Button>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label>Full name</Label>
          <Input defaultValue="Ava Klein" className="h-10 rounded-xl" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Email</Label>
          <Input defaultValue="ava@stocksense.ai" className="h-10 rounded-xl" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Job title</Label>
          <Input defaultValue="Operations Lead" className="h-10 rounded-xl" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Phone</Label>
          <Input defaultValue="+1 (555) 018-4272" className="h-10 rounded-xl" />
        </div>
      </div>
    </Section>
  );
}

function ThemeTab() {
  const { theme, setTheme } = useTheme();
  return (
    <Section title="Theme" description="Choose your preferred appearance">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {(["dark", "light"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={cn(
              "flex flex-col items-start gap-3 rounded-2xl border p-4 text-left transition-all",
              theme === t
                ? "border-primary/50 bg-primary/5 shadow-elegant"
                : "border-border bg-card/40 hover:border-primary/30",
            )}
          >
            <div className={cn("h-24 w-full rounded-lg border border-border", t === "dark" ? "bg-[#0F172A]" : "bg-[#F8FAFC]")}>
              <div className="flex h-full items-end gap-2 p-3">
                <span className={cn("h-2 flex-1 rounded", t === "dark" ? "bg-primary" : "bg-primary/80")} />
                <span className={cn("h-4 flex-1 rounded", t === "dark" ? "bg-primary-glow" : "bg-primary")} />
                <span className={cn("h-6 flex-1 rounded", t === "dark" ? "bg-primary/60" : "bg-primary/50")} />
              </div>
            </div>
            <div className="flex w-full items-center justify-between">
              <span className="font-medium capitalize">{t}</span>
              {theme === t && <Badge className="border-primary/30 bg-primary/15 text-primary-glow">Active</Badge>}
            </div>
          </button>
        ))}
      </div>
    </Section>
  );
}

function NotificationsTab() {
  const rows = [
    { title: "Product updates", description: "New features and releases" },
    { title: "Low stock alerts", description: "SKUs below reorder point" },
    { title: "Sales digest", description: "Daily summary at 6 PM" },
    { title: "AI recommendations", description: "Auto-drafted POs and pricing tips" },
    { title: "Security alerts", description: "Sign-ins and permission changes" },
  ];
  return (
    <Section title="Notifications" description="Choose what lands in your inbox">
      <div className="flex flex-col gap-1">
        {rows.map((r, i) => (
          <div key={r.title}>
            <div className="flex items-center justify-between gap-4 py-3.5">
              <div>
                <div className="font-medium">{r.title}</div>
                <div className="text-xs text-muted-foreground">{r.description}</div>
              </div>
              <Switch defaultChecked={i !== 0} />
            </div>
            {i < rows.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </Section>
  );
}

function SecurityTab() {
  return (
    <Section title="Security" description="Keep your account safe">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-background/40 p-4">
          <div>
            <div className="font-medium">Two-factor authentication</div>
            <div className="text-xs text-muted-foreground">Require a code on new devices</div>
          </div>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-background/40 p-4">
          <div>
            <div className="font-medium">Single sign-on (SSO)</div>
            <div className="text-xs text-muted-foreground">SAML SSO for enterprise plans</div>
          </div>
          <Button variant="outline" className="h-9 rounded-xl">Configure</Button>
        </div>
        <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-background/40 p-4">
          <div>
            <div className="font-medium">Sessions</div>
            <div className="text-xs text-muted-foreground">3 active sessions on 2 devices</div>
          </div>
          <Button variant="outline" className="h-9 rounded-xl text-destructive">Sign out all</Button>
        </div>
      </div>
    </Section>
  );
}

function BillingTab() {
  return (
    <div className="flex flex-col gap-6">
      <Section title="Plan" description="Your current subscription">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-5">
          <div>
            <div className="text-xs uppercase tracking-wider text-primary-glow">Current plan</div>
            <div className="mt-1 text-xl font-semibold">Scale · $99/mo</div>
            <div className="mt-1 text-xs text-muted-foreground">Renews on Dec 12, 2026</div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="h-10 rounded-xl">Cancel plan</Button>
            <Button className="h-10 rounded-xl gradient-primary text-primary-foreground">Upgrade</Button>
          </div>
        </div>
      </Section>
      <Section title="Payment method" description="Charged monthly">
        <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/40 p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-14 place-items-center rounded-md bg-primary/15 text-xs font-semibold text-primary-glow">VISA</div>
            <div>
              <div className="text-sm font-medium">•••• •••• •••• 4242</div>
              <div className="text-xs text-muted-foreground">Expires 08/28</div>
            </div>
          </div>
          <Button variant="outline" className="h-9 rounded-xl">Update</Button>
        </div>
      </Section>
    </div>
  );
}

function ApiKeysTab() {
  const keys = [
    { name: "Production", key: "ss_live_7f42••••••••••••••••3021", created: "Aug 2, 2026" },
    { name: "Staging", key: "ss_test_11cd••••••••••••••••90a7", created: "Sep 21, 2026" },
  ];
  return (
    <Section
      title="API keys"
      description="Programmatic access — treat these like passwords"
    >
      <div className="flex flex-col gap-3">
        {keys.map((k) => (
          <div key={k.name} className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-background/40 p-4">
            <div className="min-w-0 flex-1">
              <div className="font-medium">{k.name}</div>
              <div className="mt-0.5 truncate font-mono text-xs text-muted-foreground">{k.key}</div>
            </div>
            <div className="text-xs text-muted-foreground">Created {k.created}</div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg" onClick={() => toast.success("Key copied")}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        <Button className="mt-2 h-10 w-fit rounded-xl gradient-primary text-primary-foreground">
          <Plus className="mr-2 h-4 w-4" /> Create new key
        </Button>
      </div>
    </Section>
  );
}

function RolesTab() {
  const members = [
    { name: "Ava Klein", email: "ava@stocksense.ai", role: "Owner" },
    { name: "Marcus Reed", email: "marcus@stocksense.ai", role: "Admin" },
    { name: "Priya Shah", email: "priya@stocksense.ai", role: "Editor" },
    { name: "Diego Alvarez", email: "diego@stocksense.ai", role: "Viewer" },
  ];
  return (
    <Section title="Team & roles" description="Invite people and define permissions">
      <div className="flex flex-col gap-2">
        {members.map((m) => (
          <div key={m.email} className="flex items-center gap-3 rounded-xl border border-border bg-background/40 p-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary/15 text-[11px] font-semibold text-primary-glow">
                {m.name.split(" ").map((w) => w[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="truncate font-medium">{m.name}</div>
              <div className="truncate text-xs text-muted-foreground">{m.email}</div>
            </div>
            <Badge variant="outline" className="border-border">{m.role}</Badge>
          </div>
        ))}
        <Button className="mt-2 h-10 w-fit rounded-xl gradient-primary text-primary-foreground">
          <Plus className="mr-2 h-4 w-4" /> Invite team member
        </Button>
      </div>
    </Section>
  );
}

function ActivityTab() {
  return (
    <Section title="Activity log" description="Every action performed in this workspace">
      <ol className="relative ml-3 flex flex-col gap-4 border-l border-border pl-5">
        {ACTIVITIES.concat(ACTIVITIES).slice(0, 10).map((a, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[26px] top-1.5 grid h-3 w-3 place-items-center rounded-full bg-primary/20 ring-2 ring-background">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-glow" />
            </span>
            <div className="text-sm">
              <span className="font-medium">{a.actor}</span>{" "}
              <span className="text-muted-foreground">{a.action}</span>{" "}
              <span className="font-medium">{a.target}</span>
            </div>
            <div className="text-[11px] text-muted-foreground">{a.at}</div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function IntegrationsTab() {
  const integrations = [
    { name: "Shopify", desc: "Sync orders and inventory", status: "active" },
    { name: "QuickBooks", desc: "Financial reporting", status: "active" },
    { name: "Slack", desc: "Team notifications", status: "onboarding" },
    { name: "Stripe", desc: "Payments and payouts", status: "active" },
    { name: "Google Analytics", desc: "Traffic and conversion", status: "paused" },
    { name: "Zapier", desc: "Custom automations", status: "onboarding" },
  ];
  return (
    <Section title="Integrations" description="Connect the tools you already use">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {integrations.map((i) => (
          <div key={i.name} className="flex items-center gap-3 rounded-xl border border-border bg-background/40 p-4">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-xs font-bold text-primary-glow">
              {i.name.slice(0, 2)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium">{i.name}</div>
              <div className="truncate text-xs text-muted-foreground">{i.desc}</div>
            </div>
            <StatusBadge status={i.status} />
          </div>
        ))}
      </div>
    </Section>
  );
}
