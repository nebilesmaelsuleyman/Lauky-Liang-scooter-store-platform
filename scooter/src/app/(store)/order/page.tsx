"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Package } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = (session?.user as any)?.id;

  useEffect(() => {
    if (userId) {
      fetch("/api/orders/user")
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setOrders(data.data);
        })
        .finally(() => setLoading(false));
    }
  }, [userId]);

  if (status === "loading") return <p>Loading session...</p>;
  if (!session) return <p>Please login to see your orders.</p>;

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-muted/30">
        <div className="container py-6">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-6">My Orders</h1>

          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <Card className="p-4">
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Package className="h-12 w-12 text-muted-foreground mb-3" />
                <h2 className="font-semibold text-lg mb-1">No orders yet</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Start shopping to see your orders here
                </p>
                <Link href="/products">
                  <Button size="sm">Browse Products</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <Card key={order._id} className="p-3 shadow-sm">
                  <CardHeader className="py-2 px-3">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <CardTitle className="text-base font-semibold">
                          {order.orderNumber}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">
                          Placed on {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <Separator />
                  <CardContent className="pt-3 pb-2 px-3">
                    <div className="space-y-2">
                      {order.items.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>
                            {item.productId.name || "Product"} × {item.quantity}
                          </span>
                          <span className="font-medium">{item.price} AED</span>
                        </div>
                      ))}
                      <Separator />
                      <div className="flex justify-between text-sm font-semibold pt-1">
                        <span>Total</span>
                        <span>{order.totalAmount} AED</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
