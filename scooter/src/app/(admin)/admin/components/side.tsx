'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  BarChart3,
  Menu,
  X,
} from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Analysis', href: '/admin/analysis', icon: BarChart3 },
]

export default function Sidebar(){

    const pathname= usePathname()
    const [isOpen,setIsOpen]= useState(false)   
    const toggleSidebar=()=>setIsOpen(!isOpen)

    return (
        <>  
       <aside
  className={cn(
    'fixed left-0 top-0 h-screen bg-[#0A0F1C] text-white shadow-lg flex flex-col z-40 transition-all duration-400',
    isOpen ? 'w-64' : 'w-24'
  )}
>
  <div className="flex items-center justify-between py-4 px-4 border-b border-gray-800">
    <h1
      className={cn(
        'text-xl font-bold tracking-wide text-red-400 transition-all duration-300',
        isOpen ? 'opacity-100' : 'opacity-0 hidden'
      )}
    >
      Admin
    </h1>
    <button
      onClick={toggleSidebar}
      className="text-red-400 hover:text-red-400 transition-all"
    >
      {isOpen ? <X size={22} /> : <Menu size={22} />}
    </button>
  </div>

  <nav className="flex flex-col mt-6 space-y-1">
    {navItems.map((item) => {
      const Icon = item.icon;
      const isActive = pathname === item.href;
      return (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'flex items-center transition-all duration-200 py-3',
            isOpen ? 'gap-4 px-4' : 'justify-center w-full',
            'hover:bg-[#162036]',
            isActive ? 'bg-[#162036] text-green-500 font-semibold' : 'text-gray-300'
          )}
        >
          <Icon size={24} className="min-w-[24px]" />
          {isOpen && <span>{item.name}</span>}
        </Link>
      );
    })}
  </nav>
</aside>
            </>
    )
}