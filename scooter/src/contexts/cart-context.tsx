'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { toast } from "sonner" 

export interface CartItem {
  productId: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  //  Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
    setIsLoaded(true)
  }, [])

  //  Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(items))
      window.dispatchEvent(new Event("storage"))
    }
  }, [items, isLoaded])

  //  Add item
  const addItem = useCallback(
    (newItem: Omit<CartItem, "quantity">) => {
      setItems((currentItems) => {
        const existingItem = currentItems.find((item) => item.productId === newItem.productId)

        if (existingItem) {
          toast.info(`Increased quantity of ${newItem.name}`) // ✅ Sonner version
          return currentItems.map((item) =>
            item.productId === newItem.productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }

        toast.success(`${newItem.name} added to cart`) // ✅ Sonner version
        return [...currentItems, { ...newItem, quantity: 1 }]
      })
    },
    []
  )

  // Remove item
  const removeItem = useCallback(
    (productId: string) => {
      setItems((currentItems) => {
        const item = currentItems.find((i) => i.productId === productId)
        if (item) {
          toast.warning(`${item.name} removed from cart`) // ✅ Sonner version
        }
        return currentItems.filter((item) => item.productId !== productId)
      })
    },
    []
  )

  //  Update quantity
  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((currentItems) => currentItems.filter((item) => item.productId !== productId))
      return
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    )
  }, [])

  //  Clear cart
  const clearCart = useCallback(() => {
    setItems([])
    toast.error("Cart cleared") 
  }, [])

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
