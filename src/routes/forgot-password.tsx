import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Forgot password — StockSense AI" }] }),
  component: ForgotPage,
});

function ForgotPage() {
  return (
    <AuthShell
      eyebrow="Password reset"
      title="Forgot your password?"
      subtitle="Enter your email and we'll send you a secure reset link."
      footer={
        <>
          Remembered it?{" "}
          <Link to="/login" className="font-medium text-primary-glow hover:underline">
            Back to sign in
          </Link>
        </>
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Reset link sent to your email");
        }}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-1.5">
          <Label>Email</Label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="email" placeholder="you@company.com" className="h-11 rounded-xl pl-10" />
          </div>
        </div>
        <Button type="submit" className="h-11 rounded-xl gradient-primary text-primary-foreground shadow-elegant">
          Send reset link
        </Button>
      </form>
    </AuthShell>
  );
}
