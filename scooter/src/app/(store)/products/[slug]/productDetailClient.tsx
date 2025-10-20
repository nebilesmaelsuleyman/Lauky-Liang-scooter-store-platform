"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ProductCard } from "@/components/product-card"
import { useCart } from "@/contexts/cart-context"
import { useState } from "react"

import {
  ShoppingCart,
  Heart,
  Share2,
  Zap,
  Battery,
  Gauge,
  Weight,
  Package,
  Shield,
  Disc,
  Lock,
  Bike,
  Frame,
  Cable,
  SlidersHorizontal,
} from "lucide-react"

import { ProductLean } from "@/lib/types/product"

interface CategoryLean {
  _id: string
  name: string
  description: string
}

interface Props {
  product: ProductLean
  category: CategoryLean | null
  relatedProducts: ProductLean[]
}

export default function ProductDetailClient({ product, category, relatedProducts }: Props) {
  const { addItem } = useCart()
  const [selectedImage, setSelectedImage]=useState(product.images[0]|| "/placeholder.svg")

  const discountPercentage = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  const handleAddToCart = () => {
    addItem({
      productId: product._id as string,
      name: product.name ?? "",
      price: product.price ?? "",
      image: product.images[0] ,
    })
  }
  

  const specs = product.specifications || {}

  
  const SPEC_MAP: Record<
    string,
    { label: string; icon: React.ElementType }
  > = {
    maxSpeed: { label: "Max Speed", icon: Gauge },
    range: { label: "Range", icon: Battery },
    motor: { label: "Motor Power", icon: Zap },
    weight: { label: "Weight", icon: Weight },
    maxLoad: { label: "Max Load", icon: Package },
    batteryCapacity: { label: "Battery Capacity", icon: Battery },
    chargingTime: { label: "Charging Time", icon: Zap },
    display: { label: "Display", icon: Gauge },
    braking: { label: "Braking System", icon: Disc },
    antiTheftSystem: { label: "Anti-Theft System", icon: Lock },
    tire: { label: "Tire Type", icon: Bike },
    frame: { label: "Frame Material", icon: Frame },
    shiftLevel: { label: "Shift Level", icon: SlidersHorizontal },
    suspensionFork: { label: "Suspension Fork", icon: Cable },
  }

  return (
    <div className="container py-8 px-10">
      
      <div className="text-sm text-muted-foreground mb-6">
        <span>Home</span> / <span>Products</span> /{" "}
        <span>{category?.name || "Uncategorized"}</span> /{" "}
        <span className="text-foreground">{product.name}</span>
      </div>

     
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 ">
        
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <Image
              src={selectedImage}
              alt={selectedImage}
              fill
              className="object-cover"
              priority
            />
            {discountPercentage > 0 && (
              <Badge className="absolute top-4 right-4 bg-green-300 text-destructive-foreground text-lg px-3 py-1">
                -{discountPercentage}%
              </Badge>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.slice(1, 5).map((img, idx) => (
                <div
                  key={idx}
                  onClick={()=>setSelectedImage(img)}
                  className={`relative aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer border-2 transition-all ${
            selectedImage === img ? "border-primary" : "border-transparent"
          }`}
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${product.name} ${idx + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

      
        <div className="space-y-5">
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">{category?.name}</p>
            <h1 className="font-serif text-3xl font-bold mb-3 text-balance">{product.name}</h1>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold">د.إ {product.price}</span>
              {product.compareAtPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  د.إ {product.compareAtPrice}
                </span>
              )}
            </div>
            {product.isFeatured && (
              <Badge className="bg-accent text-accent-foreground mb-4">Featured Product</Badge>
            )}
          </div>

          <Separator />

         
          <div>
            <h3 className="font-semibold mb-2 text-lg">Description</h3>
            <p className="text-muted-foreground text-sm leading-normal">{product.description}</p>
          </div>

          <Separator />

         
          <div>
            <h3 className="font-semibold mb-3 text-lg">Key Specifications</h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(specs)
                .filter(([_, value]) => value && value.trim() !== "")
                .map(([key, value]) => {
                  const spec = SPEC_MAP[key]
                  if (!spec) return null
                  const Icon = spec.icon
                  return (
                    <Card key={key} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-3 flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
                          <Icon className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{spec.label}</p>
                          <p className="font-semibold text-sm">{value}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
            </div>
          </div>

          <Separator />

          
          <div>
            {product.stock > 0 ? (
              <p className="text-sm text-green-600 font-medium">
                In Stock ({product.stock} available)
              </p>
            ) : (
              <p className="text-sm text-destructive font-medium">Out of Stock</p>
            )}
          </div>

          
          <div className="flex gap-3">
            <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={product.stock === 0}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>

         
          <Card className="bg-muted/50">
            <CardContent className="p-4 space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <span className="font-semibold">✓</span> Fast shipping on all orders
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold">✓</span> customer Service
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold">✓</span> Warranty included
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="font-serif text-3xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rp) => (
              <ProductCard
                key={rp._id as string}
                id={rp._id as string}
                name={rp.name}
                slug={rp.slug}
                price={rp.price}
                compareAtPrice={rp.compareAtPrice}
                image={rp.images[0]}
                category={category?.name || "Uncategorized"}
                isFeatured={rp.isFeatured}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
