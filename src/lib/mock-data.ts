import type {
  Activity,
  Customer,
  KPI,
  Notification,
  Product,
  Sale,
  Supplier,
} from "@/types";

export const KPIS: KPI[] = [
  { label: "Total Revenue", value: "$284,921", delta: 12.4, positive: true, hint: "vs last month" },
  { label: "Sales", value: "3,842", delta: 8.1, positive: true, hint: "orders this month" },
  { label: "Gross Profit", value: "$91,204", delta: 4.6, positive: true, hint: "32% margin" },
  { label: "Orders", value: "1,204", delta: -2.3, positive: false, hint: "vs last week" },
  { label: "Inventory Value", value: "$612k", delta: 1.8, positive: true, hint: "across 4 warehouses" },
  { label: "Active Customers", value: "9,412", delta: 5.9, positive: true, hint: "last 30 days" },
  { label: "Low Stock", value: "27", delta: 3, positive: false, hint: "items need attention" },
  { label: "AI Actions", value: "148", delta: 22.1, positive: true, hint: "auto-optimizations" },
];

export const REVENUE_TREND = [
  { month: "Jan", revenue: 42000, profit: 12800, orders: 320 },
  { month: "Feb", revenue: 51000, profit: 15400, orders: 388 },
  { month: "Mar", revenue: 48500, profit: 14100, orders: 362 },
  { month: "Apr", revenue: 62200, profit: 19100, orders: 461 },
  { month: "May", revenue: 71800, profit: 22400, orders: 512 },
  { month: "Jun", revenue: 68400, profit: 20900, orders: 498 },
  { month: "Jul", revenue: 79100, profit: 25100, orders: 561 },
  { month: "Aug", revenue: 88400, profit: 28600, orders: 612 },
  { month: "Sep", revenue: 82100, profit: 26200, orders: 588 },
  { month: "Oct", revenue: 96200, profit: 31700, orders: 671 },
  { month: "Nov", revenue: 104500, profit: 34800, orders: 722 },
  { month: "Dec", revenue: 118900, profit: 40200, orders: 812 },
];

export const CATEGORY_MIX = [
  { name: "Electronics", value: 42, color: "var(--chart-1)" },
  { name: "Apparel", value: 24, color: "var(--chart-2)" },
  { name: "Home", value: 18, color: "var(--chart-3)" },
  { name: "Beauty", value: 10, color: "var(--chart-4)" },
  { name: "Other", value: 6, color: "var(--chart-5)" },
];

export const WEEKLY_SALES = [
  { day: "Mon", online: 2400, pos: 1600 },
  { day: "Tue", online: 2800, pos: 1900 },
  { day: "Wed", online: 3100, pos: 2100 },
  { day: "Thu", online: 2700, pos: 2400 },
  { day: "Fri", online: 3900, pos: 3100 },
  { day: "Sat", online: 4600, pos: 3600 },
  { day: "Sun", online: 4100, pos: 2900 },
];

export const TOP_PRODUCTS = [
  { name: "Aurora Wireless Buds", sold: 1284, revenue: 92640 },
  { name: "Nimbus Smart Kettle", sold: 942, revenue: 47100 },
  { name: "Orbit Fitness Band", sold: 812, revenue: 56840 },
  { name: "Halo Desk Lamp", sold: 704, revenue: 21120 },
  { name: "Vertex Mechanical Kbd", sold: 621, revenue: 74520 },
];

const CATEGORIES = ["Electronics", "Apparel", "Home", "Beauty", "Fitness", "Office"];
const SUPPLIERS_NAMES = ["Northwind Co.", "Halo Labs", "Vertex Supply", "Orbit Group", "Nimbus Traders"];

export const PRODUCTS: Product[] = Array.from({ length: 42 }).map((_, i) => {
  const stock = [0, 4, 12, 38, 62, 128, 320, 8, 22][i % 9];
  const status: Product["status"] =
    stock === 0 ? "out-of-stock" : stock < 15 ? "low-stock" : "in-stock";
  const price = 19 + ((i * 13) % 320);
  return {
    id: `p_${1000 + i}`,
    sku: `SS-${String(2400 + i).padStart(5, "0")}`,
    name: [
      "Aurora Wireless Buds",
      "Nimbus Smart Kettle",
      "Orbit Fitness Band",
      "Halo Desk Lamp",
      "Vertex Mech Keyboard",
      "Solstice Backpack",
      "Ember Ceramic Mug",
      "Pulse Yoga Mat",
      "Lumen Standing Lamp",
      "Cove Linen Shirt",
      "Atlas Travel Cube",
      "Zen Aroma Diffuser",
    ][i % 12] + (i > 11 ? ` v${Math.floor(i / 12) + 1}` : ""),
    category: CATEGORIES[i % CATEGORIES.length],
    price,
    cost: Math.round(price * 0.62),
    stock,
    reorderPoint: 20,
    supplier: SUPPLIERS_NAMES[i % SUPPLIERS_NAMES.length],
    status,
    updatedAt: new Date(Date.now() - i * 3600_000 * 7).toISOString(),
  };
});

export const SALES: Sale[] = Array.from({ length: 36 }).map((_, i) => {
  const statuses: Sale["status"][] = ["paid", "paid", "paid", "pending", "refunded", "failed"];
  const channels: Sale["channel"][] = ["Online", "POS", "Wholesale"];
  const names = [
    "Alicia Chen", "Marcus Reed", "Priya Shah", "Diego Alvarez", "Emma Watson",
    "Liam O'Brien", "Sofia Rossi", "Noah Kim", "Ava Nguyen", "Elias Weber",
  ];
  const n = names[i % names.length];
  return {
    id: `s_${9000 + i}`,
    invoice: `INV-${String(20481 + i).padStart(6, "0")}`,
    customer: n,
    email: `${n.split(" ")[0].toLowerCase()}@example.com`,
    amount: 40 + ((i * 71) % 1400),
    items: 1 + (i % 6),
    status: statuses[i % statuses.length],
    channel: channels[i % channels.length],
    date: new Date(Date.now() - i * 3600_000 * 11).toISOString(),
  };
});

export const CUSTOMERS: Customer[] = Array.from({ length: 24 }).map((_, i) => {
  const names = [
    "Alicia Chen", "Marcus Reed", "Priya Shah", "Diego Alvarez", "Emma Watson",
    "Liam O'Brien", "Sofia Rossi", "Noah Kim", "Ava Nguyen", "Elias Weber",
    "Zara Ahmed", "Julian Park",
  ];
  const n = names[i % names.length] + (i > 11 ? ` ${Math.floor(i / 12)}` : "");
  const orders = 2 + ((i * 3) % 40);
  return {
    id: `c_${5000 + i}`,
    name: n,
    email: `${n.split(" ")[0].toLowerCase()}${i}@example.com`,
    company: i % 3 === 0 ? ["Northwind", "Acme Co", "Globex", "Initech"][i % 4] : undefined,
    orders,
    spent: orders * (80 + (i * 17) % 220),
    status: i % 7 === 0 ? "vip" : i % 9 === 0 ? "inactive" : "active",
    joined: new Date(Date.now() - i * 86400_000 * 21).toISOString(),
  };
});

export const SUPPLIERS: Supplier[] = SUPPLIERS_NAMES.map((n, i) => ({
  id: `sup_${100 + i}`,
  name: n,
  contact: ["Ava Chen", "Marcus Reed", "Priya Shah", "Diego Alvarez", "Emma Watson"][i],
  email: `hello@${n.toLowerCase().replace(/[^a-z]/g, "")}.com`,
  country: ["USA", "Germany", "Vietnam", "Portugal", "Japan"][i],
  products: 12 + i * 7,
  onTime: 82 + i * 3,
  status: i === 4 ? "onboarding" : i === 3 ? "paused" : "active",
}));

export const ACTIVITIES: Activity[] = [
  { id: "a1", actor: "AI Assistant", action: "auto-generated purchase order for", target: "Aurora Wireless Buds", at: "2m ago", type: "ai" },
  { id: "a2", actor: "Alicia Chen", action: "placed order", target: "#INV-020487", at: "6m ago", type: "sale" },
  { id: "a3", actor: "System", action: "low stock alert on", target: "Halo Desk Lamp", at: "18m ago", type: "alert" },
  { id: "a4", actor: "Marcus Reed", action: "updated pricing for", target: "Nimbus Smart Kettle", at: "42m ago", type: "stock" },
  { id: "a5", actor: "Priya Shah", action: "invited team member", target: "Diego Alvarez", at: "1h ago", type: "user" },
  { id: "a6", actor: "AI Assistant", action: "predicted 18% demand spike for", target: "Fitness category", at: "2h ago", type: "ai" },
  { id: "a7", actor: "System", action: "reconciled 128 orders from", target: "Shopify sync", at: "3h ago", type: "stock" },
];

export const NOTIFICATIONS: Notification[] = [
  { id: "n1", title: "AI restock recommendation", description: "Reorder 240 units of Aurora Wireless Buds within 3 days.", at: "just now", read: false, type: "info" },
  { id: "n2", title: "Low stock alert", description: "27 SKUs are below reorder point.", at: "12m ago", read: false, type: "warning" },
  { id: "n3", title: "New wholesale order", description: "Northwind Co. placed a $12,480 order.", at: "1h ago", read: false, type: "success" },
  { id: "n4", title: "Payment failed", description: "INV-020431 payment failed after 3 retries.", at: "3h ago", read: true, type: "danger" },
  { id: "n5", title: "Weekly report ready", description: "Your weekly business report is available.", at: "yesterday", read: true, type: "info" },
];
