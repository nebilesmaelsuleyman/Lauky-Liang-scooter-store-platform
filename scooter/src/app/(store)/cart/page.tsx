"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/cart-context"
import { loadStripe } from '@stripe/stripe-js';
import {useState} from 'react'

export default  function CartPage() {
  const router = useRouter()
  const { items, updateQuantity, removeItem, subtotal } = useCart()
  const [loading, setLoading]= useState(false);


  const   handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('api/checkout',{
        method:'POST',
        headers:{"content-Type":"application/json"},
        body:JSON.stringify({items})
      })
      const data = await res.json()
      if(data.url)window.location.href= data.url

    } catch (error) {
      console.error(error);
      alert('something went wrong')
      
    }finally{
      setLoading(false)
    }
   
  };


  const shipping = subtotal > 0 ? (subtotal > 1000 ? 0 : 50) : 0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="flex min-h-screen flex-col">
      

      <main className="flex-1 bg-muted/30">
        <div className="container py-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>

          {items.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                <h2 className="font-semibold text-xl mb-2">Your cart is empty</h2>
                <p className="text-muted-foreground mb-6">Add some scooters to get started</p>
                <Link href="/products">
                  <Button>Continue Shopping</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <Card key={item.productId}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-sm text-muted-foreground mt-1">${item.price} each</p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeItem(item.productId)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 bg-transparent"
                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-12 text-center font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 bg-transparent"
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <h2 className="font-semibold text-xl mb-4">Order Summary</h2>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="font-medium">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                      </div>
                      {/* <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax</span>
                        <span className="font-medium">${tax.toFixed(2)}</span>
                      </div> */}
                      <Separator />
                      <div className="flex justify-between">
                        <span className="font-semibold text-lg">Total</span>
                        <span className="font-bold text-xl">${total.toFixed(2)}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-6" size="lg" onClick={handleCheckout} disabled={loading}>
                     {loading ?"Redirecting ...":"proceed to checkout"}
                    </Button>
                    <Link href="/products">
                      <Button variant="outline" className="w-full mt-3 bg-transparent">
                        Continue Shopping
                      </Button>
                    </Link>
                    {subtotal < 1000 && subtotal > 0 && (
                      <p className="text-xs text-muted-foreground text-center mt-4">
                        Add ${(1000 - subtotal).toFixed(2)} more for free shipping
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
