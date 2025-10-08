'use client'
import  Link  from "next/link";
import {useState} from "react";
import {Search, ShoppingCart, User } from "lucide-react";
import {Button} from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {Input} from '@/components/ui/input';
import {useCart} from '@/contexts/cart-context'

export function SiteHeader(){

    const [isLogedIn , setIsLoggedIn]= useState(false);
     const {itemCount} =useCart()

    return (
        <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 container'>
            <div className='container flex h-16 items-center justify-between p-8'>
                <Link href='/' className="flex items-center space-x-8">          
                <span className="font-serif text-2xl font-bold space-x-8">Logo</span>
                </Link>
                <nav className="hidden md:flex items-center space-x-8">
                <Link href='/products' className="text-sm font-medium  transition-colors hover:text-accent">All Products</Link>
                <Link href='/categories' className="text-sm font-medium  transition-colors hover:text-accent">  Categories</Link>
                <Link href='/aboutus' className="text-sm font-medium  transition-colors hover:text-accent"> About us </Link>

                {isLogedIn &&(<>
                
                <Link href='#' className='text-sm font-medium transition-color hover:text-accent'>Account</Link>
                
                </>)}
                </nav>
                        {/* search Bar -Desktip */}
                    <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Search scooters..." className="pl-10 w-full" />
          </div>
        </div>

                    {/* {actions} */}
                    <div className="  flex items-center space-x-4">
                        <Link href='/cart'>
                            <Button variant='ghost' size='icon' className='relative'>
                                <ShoppingCart className='h-5 w-5'/>
                                <span className='absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold  text-white bg-red-600 rounded-full'>{itemCount}</span>
                            </Button>
                        </Link>
                        {isLogedIn ? (
                          <div>
                            <Link href='/account'>
                                <Button variant='default' size='sm' >
                                    <User className='h-5 w-5'/>
                                </Button>
                            </Link>
                            <Link href='#' className='text-sm font-medium transition-color hover:text-accent'><Button variant='ghost' size='sm'> Order</Button></Link>
                            </div>
                            
                        ):(
                            <div className='flex items-center gap-2'>
                            <Link href='/auth/login'>
                                <Button variant='default' size='sm' >
                                    Sign In
                                </Button>
                            </Link>
                            <Link href='/auth/signup'>
                                <Button variant='outline' size='sm' >
                                    Sign Up
                                </Button>
                            </Link>

                            </div>
                            
                        )}

                    </div>
                    {/* {Mobile Menu} */}

                    <Sheet>
                        <SheetTrigger asChild className='md:hidden'>
                            <Button>
                               <menu className="h-5 w-5"/>
                            </Button>
                             </SheetTrigger>
                             <SheetContent side='right' className='w-[250px] p-0'>
                                <nav className='flex flex-col space-y-4 mt-8'>
                                    <Link href="/" className="text-lg font-medium">
                                        Home
                                        </Link>
                                        <Link href="/products" className="text-lg font-medium">
                                        All Products
                                        </Link>
                                        <Link href="/categories" className="text-lg font-medium">
                                        Categories
                                        </Link>
                                        {isLogedIn ? (
                  <>
                    <Link href="/orders" className="text-lg font-medium">
                      Orders
                    </Link>
                    <Link href="/cart" className="text-lg font-medium">
                      Cart
                    </Link>
                    <Link href="/account" className="text-lg font-medium">
                      Account
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" className="text-lg font-medium">
                      Sign In
                    </Link>
                    <Link href="/auth/signup" className="text-lg font-medium">
                      Sign Up
                    </Link>
                  </>
                )}
                </nav>

                </SheetContent>
                    </Sheet>
            </div>
            <div className="md:hidden border-t px-4 py-3">
            <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Search scooters..." className="pl-10 w-full" />
        </div>
      </div>

        </header>
    )
}