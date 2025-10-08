"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Package, Eye } from "lucide-react"
import Link from "next/link"
import { OrderStatus } from "@/lib/db/schema"

const mockOrders = [
  {
    _id: "order_1",
    orderNumber: "ORD-2024-001",
    date: "2024-03-15",
    status: OrderStatus.DELIVERED,
    total: 1899,
    items: [
      { name: "Urban Glide Pro", quantity: 1, price: 899 },
      { name: "Velocity X1", quantity: 1, price: 1499 },
    ],
  },
  {
    _id: "order_2",
    orderNumber: "ORD-2024-002",
    date: "2024-03-20",
    status: OrderStatus.SHIPPED,
    total: 699,
    items: [{ name: "City Cruiser", quantity: 1, price: 699 }],
  },
  {
    _id: "order_3",
    orderNumber: "ORD-2024-003",
    date: "2024-03-22",
    status: OrderStatus.PROCESSING,
    total: 499,
    items: [{ name: "EcoRide Lite", quantity: 1, price: 499 }],
  },
]

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.DELIVERED:
      return "bg-green-500/10 text-green-700 dark:text-green-400"
    case OrderStatus.SHIPPED:
      return "bg-blue-500/10 text-blue-700 dark:text-blue-400"
    case OrderStatus.PROCESSING:
      return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
    case OrderStatus.CANCELLED:
      return "bg-red-500/10 text-red-700 dark:text-red-400"
    default:
      return "bg-gray-500/10 text-gray-700 dark:text-gray-400"
  }
}

export default function OrdersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1 bg-muted/30">
        <div className="container py-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">My Orders</h1>

          {mockOrders.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Package className="h-16 w-16 text-muted-foreground mb-4" />
                <h2 className="font-semibold text-xl mb-2">No orders yet</h2>
                <p className="text-muted-foreground mb-6">Start shopping to see your orders here</p>
                <Link href="/products">
                  <Button>Browse Products</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <Card key={order._id}>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle className="text-lg">{order.orderNumber}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Placed on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <Separator />
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span className="font-medium">${item.price}</span>
                        </div>
                      ))}
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${order.total}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
