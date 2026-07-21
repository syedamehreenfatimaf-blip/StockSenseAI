import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/common/theme-provider";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 h-16 w-16 rounded-2xl gradient-primary shadow-elegant" />
        <h1 className="text-7xl font-bold gradient-text">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-elegant transition-transform hover:scale-[1.02]"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. You can try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-xl gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-elegant"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "StockSense AI — AI-Powered Inventory & Sales Dashboard" },
      {
        name: "description",
        content:
          "StockSense AI is an AI-powered inventory and sales command center for modern commerce teams. Real-time analytics, smart restocking, and beautiful reporting.",
      },
      { name: "author", content: "StockSense AI" },
      { property: "og:title", content: "StockSense AI — AI-Powered Inventory & Sales Dashboard" },
      {
        property: "og:description",
        content:
          "StockSense AI is an AI-powered inventory and sales command center for modern commerce teams. Real-time analytics, smart restocking, and beautiful reporting.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@stocksenseai" },
      { name: "twitter:title", content: "StockSense AI — AI-Powered Inventory & Sales Dashboard" },
      { name: "twitter:description", content: "StockSense AI is an AI-powered inventory and sales command center for modern commerce teams. Real-time analytics, smart restocking, and beautiful reporting." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1453353c-f92d-4e61-81ab-7cedcf881131/id-preview-4817bfb6--c1d2262a-dbfb-4c50-b482-0ddc1d15015e.lovable.app-1783931341230.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1453353c-f92d-4e61-81ab-7cedcf881131/id-preview-4817bfb6--c1d2262a-dbfb-4c50-b482-0ddc1d15015e.lovable.app-1783931341230.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Outlet />
        <Toaster position="top-right" richColors closeButton />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
