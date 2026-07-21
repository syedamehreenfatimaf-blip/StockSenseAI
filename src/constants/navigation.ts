import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Sparkles,
  FileText,
  Settings,
  LifeBuoy,
  Bell,
  Calendar,
  Users,
  Truck,
  Tags,
  Receipt,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  to: string;
  icon: LucideIcon;
  badge?: string;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export const NAV_SECTIONS: NavSection[] = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", to: "/", icon: LayoutDashboard },
      { label: "Inventory", to: "/inventory", icon: Package },
      { label: "Sales", to: "/sales", icon: ShoppingCart },
      { label: "Analytics", to: "/analytics", icon: BarChart3, badge: "New" },
    ],
  },
  {
    title: "AI",
    items: [{ label: "AI Assistant", to: "/ai", icon: Sparkles, badge: "Beta" }],
  },
  {
    title: "Workspace",
    items: [
      { label: "Customers", to: "/customers", icon: Users },
      { label: "Suppliers", to: "/suppliers", icon: Truck },
      { label: "Categories", to: "/categories", icon: Tags },
      { label: "Invoices", to: "/invoices", icon: Receipt },
      { label: "Purchase Orders", to: "/purchase-orders", icon: ClipboardList },
      { label: "Calendar", to: "/calendar", icon: Calendar },
      { label: "Notifications", to: "/notifications", icon: Bell },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Reports", to: "/reports", icon: FileText },
      { label: "Settings", to: "/settings", icon: Settings },
      { label: "Help Center", to: "/help", icon: LifeBuoy },
    ],
  },
];
