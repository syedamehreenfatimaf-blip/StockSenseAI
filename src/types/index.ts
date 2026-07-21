export type KPI = {
  label: string;
  value: string;
  delta: number;
  positive?: boolean;
  hint?: string;
};

export type Product = {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  reorderPoint: number;
  supplier: string;
  status: "in-stock" | "low-stock" | "out-of-stock";
  updatedAt: string;
};

export type Sale = {
  id: string;
  invoice: string;
  customer: string;
  email: string;
  amount: number;
  items: number;
  status: "paid" | "pending" | "refunded" | "failed";
  channel: "Online" | "POS" | "Wholesale";
  date: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  company?: string;
  orders: number;
  spent: number;
  status: "active" | "vip" | "inactive";
  joined: string;
};

export type Supplier = {
  id: string;
  name: string;
  contact: string;
  email: string;
  country: string;
  products: number;
  onTime: number;
  status: "active" | "onboarding" | "paused";
};

export type Activity = {
  id: string;
  actor: string;
  action: string;
  target: string;
  at: string;
  type: "sale" | "stock" | "alert" | "user" | "ai";
};

export type Notification = {
  id: string;
  title: string;
  description: string;
  at: string;
  read: boolean;
  type: "info" | "warning" | "success" | "danger";
};
