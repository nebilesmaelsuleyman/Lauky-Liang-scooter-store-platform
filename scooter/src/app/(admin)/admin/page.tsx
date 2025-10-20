"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, ShoppingCart, Users, TrendingUp } from "lucide-react";

interface Stat {
  title: string;
  value: number | string;
  icon: any;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stat[]>([
    { title: "Total Revenue", value: 0, icon: DollarSign },
    { title: "Total Orders", value: 0, icon: ShoppingCart },
    { title: "Products", value: 0, icon: Package },
    { title: "Customers", value: 0, icon: Users },
  ]);

  useEffect(() => {
    async function fetchStats() {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();

      setStats([
        { title: "Total Revenue", value: `$${data.totalRevenue}`, icon: DollarSign },
        { title: "Total Orders", value: data.totalOrders, icon: ShoppingCart },
        { title: "Products", value: data.totalProducts, icon: Package },
        { title: "Customers", value: data.totalCustomers, icon: Users },
      ]);
    }

    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="font-serif text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-muted">Welcome back! Here's what's happening with your store.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
