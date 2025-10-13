"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { useCart } from "@/contexts/cart-context"
import { useSession, signOut } from "next-auth/react"

export function SiteHeader() {
  const { data: session } = useSession()
  const isLoggedIn = !!session
  const { itemCount } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-10">
        {/* Logo Section */}
        {/* <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/luckylianglogo.webp"
            alt="Lucky Liang Logo"
            width={40}
            height={40}
            priority
            className="h-10 w-auto md:h-12 lg:h-14 object-contain"
          /> */}
          <span className="hidden md:inline text-xl font-semibold tracking-tight">Lucky Liang</span>
        {/* </Link> */}

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/products" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            All Products
          </Link>
          <Link href="/categories" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Categories
          </Link>
          <Link href="/aboutus" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About Us
          </Link>

          {isLoggedIn && (
            <Link href="/account" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Account
            </Link>
          )}
        </nav>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
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
                <Button variant="default" size="sm" className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span className="hidden lg:inline">Account</span>
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="border-destructive text-destructive hover:bg-destructive/10"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth/login">
                <Button variant="default" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="outline" size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <span className="text-2xl">☰</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] py-8 bg-background">
            <nav className="flex flex-col space-y-4 mt-8">
              <Link href="/" className="text-lg font-medium">Home</Link>
              <Link href="/products" className="text-lg font-medium">All Products</Link>
              <Link href="/categories" className="text-lg font-medium">Categories</Link>

              {isLoggedIn ? (
                <>
                  <Link href="/orders" className="text-lg font-medium">Orders</Link>
                  <Link href="/cart" className="text-lg font-medium">Cart</Link>
                  <Link href="/account" className="text-lg font-medium">Account</Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-lg font-medium text-red-600 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="text-lg font-medium">Sign In</Link>
                  <Link href="/auth/signup" className="text-lg font-medium">Sign Up</Link>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Mobile search bar */}
      <div className="md:hidden border-t px-4 py-3 bg-background">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Search products..." className="pl-10 w-full" />
        </div>
      </div>
    </header>
  )
}
