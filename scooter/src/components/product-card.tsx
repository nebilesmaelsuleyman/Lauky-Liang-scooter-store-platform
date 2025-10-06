'use client'

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"

export function ProductCard() {
  return (
    <Card className="group relative overflow-hidden border border-gray-200 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src="/images/blackscooter.webp"
          alt="Electric Scooter Dd1"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Badges */}
        <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground shadow-sm">
          -10%
        </Badge>
        <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground shadow-sm">
          Featured
        </Badge>
      </div>

      {/* Product Info */}
      <CardContent className="p-4">
        <Link href="#">
          <p className="text-xs text-muted-foreground mb-1">Model J2</p>
          <h3 className="font-semibold text-lg mb-2 line-clamp-1 transition-colors group-hover:text-accent">
            Electric Scooter Dd1
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">$234</span>
            <span className="text-sm text-muted-foreground line-through">$289</span>
          </div>
        </Link>
      </CardContent>

      {/* Add to Cart (Slide Up Effect) */}
      <CardFooter className="absolute bottom-0 left-0 w-full translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 bg-background/90 backdrop-blur-sm p-4">
        <Button className="w-full" size="sm">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
