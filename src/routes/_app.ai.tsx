import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, MessageSquarePlus, Sparkles, Zap, TrendingUp, Package, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/common/page-header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/ai")({
  head: () => ({
    meta: [
      { title: "AI Assistant — StockSense AI" },
      { name: "description", content: "Chat with your AI operations copilot." },
    ],
  }),
  component: AIPage,
});

type Msg = { id: string; role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  { icon: TrendingUp, label: "Which products should I restock this week?" },
  { icon: Package, label: "Show me slow-moving SKUs this quarter" },
  { icon: Zap, label: "Draft a purchase order for our top 5 fastest sellers" },
  { icon: RefreshCw, label: "Compare this month's revenue to last month" },
];

const HISTORY = [
  "Restock recommendations",
  "Q3 category performance",
  "Supplier lead-time analysis",
  "Pricing optimization for Fitness",
];

function AIPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Based on the last 30 days, I'd prioritize restocking Aurora Wireless Buds (4 days of cover), Nimbus Smart Kettle (6 days), and Halo Desk Lamp (7 days). I've drafted a purchase order totaling $18,240 across 3 suppliers — want me to open it for review?",
        },
      ]);
      setTyping(false);
    }, 1100);
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="AI Copilot"
        title="AI Assistant"
        description="Ask anything about your inventory, sales, and customers. Get instant analysis and suggested actions."
        actions={
          <Button className="h-10 rounded-xl gradient-primary text-primary-foreground shadow-elegant">
            <MessageSquarePlus className="mr-2 h-4 w-4" /> New chat
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        {/* History */}
        <Card className="hidden h-fit border-border/70 bg-card/70 shadow-card lg:block">
          <CardContent className="p-3">
            <div className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              History
            </div>
            <div className="flex flex-col gap-1">
              {HISTORY.map((h, i) => (
                <button
                  key={h}
                  className={cn(
                    "truncate rounded-lg px-3 py-2 text-left text-sm transition-colors",
                    i === 0 ? "bg-primary/15 text-foreground" : "text-muted-foreground hover:bg-muted/40",
                  )}
                >
                  {h}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="flex min-h-[70vh] flex-col overflow-hidden border-border/70 bg-card/70 shadow-card">
          <ScrollArea className="flex-1">
            <div ref={scrollRef} className="flex flex-col gap-6 p-6">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-6 py-14 text-center">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl gradient-primary shadow-elegant animate-pulse-glow">
                    <Sparkles className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">How can I help today?</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Try one of the suggestions or ask anything about your store.
                    </p>
                  </div>
                  <div className="grid w-full max-w-2xl grid-cols-1 gap-2 sm:grid-cols-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s.label}
                        onClick={() => send(s.label)}
                        className="flex items-center gap-3 rounded-xl border border-border bg-background/40 p-3 text-left text-sm transition-all hover:border-primary/40 hover:bg-primary/5"
                      >
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary-glow">
                          <s.icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0 truncate">{s.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {messages.map((m) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn("flex gap-3", m.role === "user" && "flex-row-reverse")}
                    >
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback
                          className={cn(
                            "text-[10px] font-semibold",
                            m.role === "user"
                              ? "bg-muted text-foreground"
                              : "gradient-primary text-primary-foreground",
                          )}
                        >
                          {m.role === "user" ? "AK" : "AI"}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                          m.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "border border-border bg-background/60",
                        )}
                      >
                        {m.content}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}

              {typing && (
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="gradient-primary text-[10px] font-semibold text-primary-foreground">
                      AI
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-1.5 rounded-2xl border border-border bg-background/60 px-4 py-3">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary-glow [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary-glow [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary-glow" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Composer */}
          <div className="border-t border-border bg-background/40 p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="relative"
            >
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                placeholder="Ask StockSense AI anything..."
                className="min-h-[60px] resize-none rounded-2xl border-border bg-card pr-14 pl-4 py-4 text-sm"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim()}
                className="absolute bottom-3 right-3 h-9 w-9 rounded-xl gradient-primary text-primary-foreground shadow-elegant disabled:opacity-50"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
