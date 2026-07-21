import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles, ShieldCheck, Zap, TrendingUp } from "lucide-react";

export function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-2">
      {/* Left panel — form */}
      <div className="relative flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-10 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl gradient-primary shadow-elegant">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="text-lg font-semibold tracking-tight">
              StockSense <span className="text-primary-glow">AI</span>
            </div>
          </Link>

          {eyebrow && (
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-glow">
              {eyebrow}
            </div>
          )}
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}

          <div className="mt-8">{children}</div>

          {footer && <div className="mt-6 text-sm text-muted-foreground">{footer}</div>}
        </div>
      </div>

      {/* Right panel — visual */}
      <div className="relative hidden overflow-hidden bg-sidebar lg:block">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 80% at 100% 0%, color-mix(in oklab, var(--primary-glow) 35%, transparent), transparent 60%), radial-gradient(50% 80% at 0% 100%, color-mix(in oklab, var(--primary) 35%, transparent), transparent 55%)",
          }}
        />
        <div className="relative flex h-full flex-col justify-between p-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Trusted by 2,400+ operators
          </div>

          <div className="max-w-md">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight gradient-text">
              The inventory command center for modern commerce.
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              StockSense AI unifies inventory, sales, and forecasting into one calm, beautiful
              workspace — powered by a copilot that thinks alongside your team.
            </p>

            <ul className="mt-8 flex flex-col gap-3 text-sm">
              {[
                { icon: Zap, text: "AI-drafted purchase orders in one click" },
                { icon: TrendingUp, text: "Live demand forecasting across categories" },
                { icon: ShieldCheck, text: "SOC 2 Type II · Enterprise-ready" },
              ].map((f) => (
                <li key={f.text} className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/15 text-primary-glow">
                    <f.icon className="h-4 w-4" />
                  </span>
                  {f.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur">
            <p className="text-sm text-foreground/90">
              "StockSense cut our stockouts by 62% in the first quarter. It's the first tool my
              team actually wants to open in the morning."
            </p>
            <div className="mt-3 flex items-center gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-primary/20 text-xs font-semibold text-primary-glow">
                LC
              </div>
              <div className="text-xs">
                <div className="font-medium">Lena Carter</div>
                <div className="text-muted-foreground">Head of Ops, Nimbus &amp; Co.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
