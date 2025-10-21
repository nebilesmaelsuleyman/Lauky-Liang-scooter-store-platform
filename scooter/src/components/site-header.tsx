"use client"

import Link from "next/link"
import { ShoppingCart, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useCart } from "@/contexts/cart-context"
import { useSession, signOut } from "next-auth/react"

export function SiteHeader() {
  const { data: session } = useSession()
  const isLoggedIn = !!session
  const { itemCount } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0D1F3C]/90 backdrop-blur-md border-b border-white/20">
      <div className="container flex h-16 items-center justify-between px-4 md:px-10">

       
        <Link href='/'>
          <span className="hidden md:inline text-xl font-semibold text-white tracking-tight">Lucky Liang</span>
        </Link>

       
        <nav className="hidden md:flex items-center space-x-8">
          {["/products","/categories","/aboutus"].map((href, idx) => {
            const label = href === "/products" ? "All Products" : href === "/categories" ? "Categories" : "About Us"
            return (
              <Link
                key={idx}
                href={href}
                className="text-white/90 hover:text-green-500 transition-colors font-medium text-sm"
              >
                {label}
              </Link>
            )
          })}

          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 text-white/90 hover:text-green-500 font-medium text-sm transition-colors">
                Support <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white text-gray-900 rounded-md shadow-md">
              <DropdownMenuItem asChild>
                <Link href="/service/support" className="w-full hover:text-green-600">Support</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/service/warranty" className="w-full hover:text-green-600">Warranty</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/service/return" className="w-full hover:text-green-600">Return Policy</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/service/privacy" className="w-full hover:text-green-600">Privacy Policy</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          
          {isLoggedIn && (
            <Link
              href="/order"
              className="text-white/90 hover:text-green-500 transition-colors font-medium text-sm"
            >
              My Orders
            </Link>
          )}
        </nav>


        <div className="hidden md:flex items-center space-x-3">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative text-white/90 hover:text-green-500">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold text-white bg-red-600 rounded-full">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>

          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link href="/account">
                <Button variant="default" size="sm" className="flex items-center gap-1 bg-green-600 hover:bg-green-500 text-white">
                  <User className="h-4 w-4" />
                  <span className="hidden lg:inline">Account</span>
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="border-red-600 text-red-600 hover:bg-red-600/10"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth/login">
                <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-500 text-white">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="outline" size="sm" className="border-green-600 text-green-600 hover:bg-green-600/10">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

      
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white/90 hover:text-green-500">
              <span className="text-2xl">☰</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] py-8 bg-[#0D1F3C] text-white flex flex-col items-center">
            <nav className="flex flex-col space-y-4 mt-8">
              <Link href="/" className="text-lg font-medium hover:text-green-500">Home</Link>
              <Link href="/products" className="text-lg font-medium hover:text-green-500">All Products</Link>
              <Link href="/categories" className="text-lg font-medium hover:text-green-500">Categories</Link>
              <Link href="/aboutus" className="text-lg font-medium hover:text-green-500">About Us</Link>

              <div className="flex flex-col space-y-2 mt-4 border-t border-white/20 pt-3">
                <span className="text-sm text-white/70 uppercase tracking-wide">Support</span>
                <Link href="/service/support" className="hover:text-green-500 text-base">Support</Link>
                <Link href="/service/warranty" className="hover:text-green-500 text-base">Warranty</Link>
                <Link href="/service/return" className="hover:text-green-500 text-base">Return Policy</Link>
                <Link href="/service/privacy" className="hover:text-green-500 text-base">Privacy Policy</Link>
              </div>

              {isLoggedIn ? (
                <>
                  <Link href="/orders" className="text-lg font-medium hover:text-green-500">Orders</Link>
                  <Link href="/cart" className="text-lg font-medium hover:text-green-500">Cart</Link>
                  <Link href="/account" className="text-lg font-medium hover:text-green-500">Account</Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-lg font-medium text-red-500 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="text-lg font-medium hover:text-green-500">Sign In</Link>
                  <Link href="/auth/signup" className="text-lg font-medium hover:text-green-500">Sign Up</Link>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
