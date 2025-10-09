"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Package, ShoppingCart, Users, TrendingUp, TrendingDown } from "lucide-react"
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {AdminSidebar} from '@/components/admin-sidebar'
const stats = [
  {
    title: "Total Revenue",
    value: "$45,231",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Total Orders",
    value: "356",
    change: "+12.5%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Products",
    value: "48",
    change: "+4",
    trend: "up",
    icon: Package,
  },
  {
    title: "Customers",
    value: "2,345",
    change: "+8.2%",
    trend: "up",
    icon: Users,
  },
]

const revenueData = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 3800 },
  { month: "Mar", revenue: 5100 },
  { month: "Apr", revenue: 4600 },
  { month: "May", revenue: 5900 },
  { month: "Jun", revenue: 6400 },
]

const ordersData = [
  { day: "Mon", orders: 45 },
  { day: "Tue", orders: 52 },
  { day: "Wed", orders: 48 },
  { day: "Thu", orders: 61 },
  { day: "Fri", orders: 55 },
  { day: "Sat", orders: 67 },
  { day: "Sun", orders: 43 },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs mt-1">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                )}
                <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>{stat.change}</span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Orders Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                orders: {
                  label: "Orders",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ordersData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="orders" fill="var(--color-orders)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: "ORD-2024-356",
                customer: "John Doe",
                product: "Urban Glide Pro",
                amount: "$899",
                status: "Shipped",
              },
              {
                id: "ORD-2024-355",
                customer: "Jane Smith",
                product: "Velocity X1",
                amount: "$1,499",
                status: "Processing",
              },
              {
                id: "ORD-2024-354",
                customer: "Mike Johnson",
                product: "City Cruiser",
                amount: "$699",
                status: "Delivered",
              },
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between py-3 border-b last:border-0">
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.customer} • {order.product}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{order.amount}</p>
                  <p className="text-sm text-muted-foreground">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
