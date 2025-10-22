// app/admin/orders/page.tsx
'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreVertical, Eye, Truck, X, Loader2 } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { OrderStatus, PaymentStatus } from "@/lib/types/order-types"
import { AdminOrderRow } from '@/lib/services/order.service'


const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.DELIVERED:
      return "bg-green-500/10 text-green-700 dark:text-green-400"
    case OrderStatus.SHIPPED:
      return "bg-blue-500/10 text-blue-700 dark:text-blue-400"
    case OrderStatus.PROCESSING:
      return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
    case OrderStatus.PENDING:
    case OrderStatus.CANCELLED:
      return "bg-gray-500/10 text-gray-700 dark:text-gray-400"
    default:
      return "bg-gray-500/10 text-gray-700 dark:text-gray-400"
  }
}

const getPaymentStatusColor = (status: PaymentStatus) => {
  switch (status) {
    case PaymentStatus.PAID:
      return "bg-green-500/10 text-green-700 dark:text-green-400"
    case PaymentStatus.PENDING:
      return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
    case PaymentStatus.FAILED:
      return "bg-red-500/10 text-red-700 dark:text-red-400"
    case PaymentStatus.REFUNDED:
      return "bg-purple-500/10 text-purple-700 dark:text-purple-400"
    default:
      return "bg-gray-500/10 text-gray-700 dark:text-gray-400"
  }
}


export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    
    const apiUrl = `/api/orders?q=${encodeURIComponent(query)}`;

    try {
      const res = await fetch(apiUrl);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Failed to fetch orders (Status: ${res.status})`);
      }
      
      const data: AdminOrderRow[] = await res.json();
      setOrders(data);
    } catch (err) {
      setError((err as Error).message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

 
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchOrders(searchQuery);
    }, 300); 

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, fetchOrders]);

  const handleAction = async (orderId: string, action: string) => {
  if (action === "cancel") {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete order");
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
    } catch (err) {
      console.error(err);
      alert("Error deleting order");
    }
  }
};

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold mb-2">Orders</h1>
        <p className="text-muted-foreground">Manage customer orders and fulfillment</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders by number or customer..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order Number</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                 
                  <TableHead>Payment</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto text-blue-500" />
                      <p className="mt-2 text-sm text-gray-500">Loading orders...</p>
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-red-600 font-medium">
                      Error: {error}
                    </TableCell>
                  </TableRow>
                ) : orders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                      No orders found matching your search criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium">{order.orderNumber}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.customer}</p>
                          <p className="text-sm text-muted-foreground">{order.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                     
                      <TableCell>
                        <Badge className={getPaymentStatusColor(order.paymentStatus)}>{order.paymentStatus}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
      <MoreVertical className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem 
      className="text-destructive" 
      onClick={() => handleAction(order._id, "cancel")}
    >
      <X className="mr-2 h-4 w-4" />
      Delete Order
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}