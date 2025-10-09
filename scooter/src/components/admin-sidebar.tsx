"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, BarChart3, Tags } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Categories", href: "/admin/categories", icon: Tags },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar(){
    const pathname =usePathname()
    return (
        <aside className='hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 border-r bg-card'>
            <div className=" flex items-center h-16 px-6 border-b">
                 <Link href="/admin" className="font-serif text-2xl font-bold">
                    Lucky Liang Admin
                    </Link>
            </div>
            <nav className=' flex-1 px-4 py-6 space-y-1'>
                {navigation.map((item)=>{
               const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
            </nav>
            <div className="p-4 border-t">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <span>← Back to Store</span>
        </Link>
      </div>

        </aside>
    )
}