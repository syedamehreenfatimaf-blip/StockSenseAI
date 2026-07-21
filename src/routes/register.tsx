import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Mail, Lock, User as UserIcon } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — StockSense AI" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const nav = useNavigate();
  return (
    <AuthShell
      eyebrow="Get started"
      title="Create your account"
      subtitle="Free 14-day trial. No credit card required."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary-glow hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Account created");
          nav({ to: "/" });
        }}
        className="flex flex-col gap-5"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label>First name</Label>
            <div className="relative">
              <UserIcon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input defaultValue="Ava" className="h-11 rounded-xl pl-10" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Last name</Label>
            <Input defaultValue="Klein" className="h-11 rounded-xl" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Work email</Label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="email" defaultValue="ava@stocksense.ai" className="h-11 rounded-xl pl-10" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Password</Label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="password" defaultValue="••••••••" className="h-11 rounded-xl pl-10" />
          </div>
          <p className="text-xs text-muted-foreground">Use at least 8 characters, including a number.</p>
        </div>

        <Button type="submit" className="h-11 rounded-xl gradient-primary text-primary-foreground shadow-elegant">
          Create account
        </Button>
        <p className="text-xs text-muted-foreground">
          By continuing, you agree to our{" "}
          <a className="underline">Terms</a> and{" "}
          <a className="underline">Privacy Policy</a>.
        </p>
      </form>
    </AuthShell>
  );
}
