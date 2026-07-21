import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Github } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — StockSense AI" }] }),
  component: LoginPage,
});

function LoginPage() {
  const [show, setShow] = useState(false);
  const nav = useNavigate();

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Sign in to StockSense AI"
      subtitle="Enter your credentials to continue to your dashboard."
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-primary-glow hover:underline">
            Create one
          </Link>
        </>
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Signed in");
          nav({ to: "/" });
        }}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="email" type="email" defaultValue="ava@stocksense.ai" className="h-11 rounded-xl pl-10" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-xs text-primary-glow hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="password" type={show ? "text" : "password"} defaultValue="••••••••" className="h-11 rounded-xl pl-10 pr-10" />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-label="Toggle password"
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <Checkbox defaultChecked /> Remember me for 30 days
        </label>

        <Button type="submit" className="h-11 rounded-xl gradient-primary text-primary-foreground shadow-elegant">
          Sign in
        </Button>

        <div className="relative py-2 text-center text-xs uppercase tracking-wider text-muted-foreground">
          <span className="relative z-10 bg-background px-3">or continue with</span>
          <span className="absolute inset-x-0 top-1/2 h-px bg-border" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button type="button" variant="outline" className="h-11 rounded-xl">
            <Github className="mr-2 h-4 w-4" /> GitHub
          </Button>
          <Button type="button" variant="outline" className="h-11 rounded-xl">
            Google
          </Button>
        </div>
      </form>
    </AuthShell>
  );
}
