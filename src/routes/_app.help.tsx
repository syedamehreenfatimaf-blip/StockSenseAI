import { createFileRoute } from "@tanstack/react-router";
import { Book, LifeBuoy, MessageCircle, Rocket, Search, Video } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/help")({
  head: () => ({ meta: [{ title: "Help Center — StockSense AI" }] }),
  component: HelpPage,
});

const TOPICS = [
  { icon: Rocket, title: "Getting started", count: 12 },
  { icon: Book, title: "Inventory basics", count: 24 },
  { icon: Video, title: "Video tutorials", count: 8 },
  { icon: LifeBuoy, title: "Troubleshooting", count: 18 },
];

const FAQS = [
  { q: "How does AI restock work?", a: "StockSense AI analyzes 90 days of sales velocity, supplier lead times, and seasonality to draft purchase orders. You approve — we execute." },
  { q: "Can I connect Shopify?", a: "Yes. Head to Settings → Integrations and one-click connect Shopify, WooCommerce, or Amazon." },
  { q: "How do I invite my team?", a: "In Settings → Roles you can invite unlimited team members and assign granular permissions." },
  { q: "Is my data secure?", a: "All data is encrypted in transit and at rest, and we're SOC 2 Type II certified." },
];

function HelpPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Support"
        title="Help center"
        description="Guides, FAQs, and a real human on the other side when you need one."
      />

      <Card className="relative overflow-hidden border-border/70 bg-card/70 shadow-card">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(60% 100% at 100% 0%, color-mix(in oklab, var(--primary-glow) 25%, transparent), transparent 60%)",
          }}
        />
        <CardContent className="relative p-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold">How can we help?</h2>
            <div className="relative mt-5">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search articles..." className="h-12 rounded-xl border-border bg-background/60 pl-11 text-sm" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {TOPICS.map((t) => (
          <Card key={t.title} className="cursor-pointer border-border/70 bg-card/70 shadow-card transition-all hover:border-primary/30 hover:shadow-elegant">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary-glow">
                <t.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">{t.title}</div>
                <div className="text-xs text-muted-foreground">{t.count} articles</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-border/70 bg-card/70 shadow-card">
          <CardContent className="p-6">
            <h3 className="mb-2 text-lg font-semibold">Frequently asked questions</h3>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-border">
                  <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/70 shadow-card">
          <CardContent className="flex h-full flex-col items-start gap-3 p-6">
            <div className="grid h-11 w-11 place-items-center rounded-xl gradient-primary text-primary-foreground">
              <MessageCircle className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold">Still stuck?</h3>
            <p className="text-sm text-muted-foreground">Our team responds in under 30 minutes on business days.</p>
            <Button className="mt-auto h-10 w-full rounded-xl gradient-primary text-primary-foreground">Contact support</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
