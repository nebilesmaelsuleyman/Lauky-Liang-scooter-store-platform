'use client'

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

interface ProductCardProps {
  id: string
  name: string
  slug: string
  price: number
  compareAtPrice?: number
  image: string
  category: string
  isFeatured?: boolean
}

export function ProductCard({ id, name, slug, price, compareAtPrice, image, category, isFeatured }: ProductCardProps) {
  const discountPercentage = compareAtPrice ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) : 0
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      productId: id,
      name,
      price,
      image,
    })
  }

  return (
    <Card className=" overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
      <Link href={`/products/${slug}`} className="relative block">
        <div className=" aspect-square overflow-hidden bg-muted rounded-t-2xl">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>

          
          {discountPercentage > 0 && (
            <Badge className="absolute top-3 right-3 bg-green-300 text-destructive-foreground shadow-lg">
              -{discountPercentage}%
            </Badge>
          )}
          {isFeatured && (
            <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground shadow-lg">
              Featured
            </Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/products/${slug}`}>
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">{category}</p>
          <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-green-400 transition-colors duration-300">{name}</h3>
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold ">AED{price}</span>
            AED{compareAtPrice && <span className="text-sm text-muted-foreground line-through">د.إ{compareAtPrice}</span>}
          </div>
        </Link>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-primary hover:bg-green-500 text-white font-semibold" size="sm" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
