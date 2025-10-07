"use client"

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
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/products/${slug}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {discountPercentage > 0 && (
            <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">
              -{discountPercentage}%
            </Badge>
          )}
          {isFeatured && <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">Featured</Badge>}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/products/${slug}`}>
          <p className="text-xs text-muted-foreground mb-1">{category}</p>
          <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-accent transition-colors">{name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">${price}</span>
            {compareAtPrice && <span className="text-sm text-muted-foreground line-through">${compareAtPrice}</span>}
          </div>
        </Link>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" size="sm" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
