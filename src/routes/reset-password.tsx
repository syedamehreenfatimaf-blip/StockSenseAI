import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Reset password — StockSense AI" }] }),
  component: ResetPage,
});

function ResetPage() {
  const nav = useNavigate();
  return (
    <AuthShell
      eyebrow="New password"
      title="Set a new password"
      subtitle="Choose a strong password you haven't used before."
      footer={
        <Link to="/login" className="font-medium text-primary-glow hover:underline">
          Back to sign in
        </Link>
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Password updated");
          nav({ to: "/login" });
        }}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-1.5">
          <Label>New password</Label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="password" className="h-11 rounded-xl pl-10" />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Confirm password</Label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="password" className="h-11 rounded-xl pl-10" />
          </div>
        </div>
        <Button type="submit" className="h-11 rounded-xl gradient-primary text-primary-foreground shadow-elegant">
          Update password
        </Button>
      </form>
    </AuthShell>
  );
}
