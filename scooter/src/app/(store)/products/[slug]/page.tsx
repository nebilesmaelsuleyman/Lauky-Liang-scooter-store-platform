"use client"

import { notFound } from "next/navigation"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ProductCard } from "@/components/product-card"
import { ShoppingCart, Heart, Share2, Zap, Battery, Gauge, Weight } from "lucide-react"
import { mockProducts, mockCategories, mockDiscountBanner } from "@/lib/db/placeholders"
import { useCart } from "@/contexts/cart-context"
import Product from '@/lib/models/productModel'
import { getProductBySlug } from "@/lib/services/product.service"

interface Props {
  params: { slug: string }
}

interface Product {
  _id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: string;
  isFeatured?: boolean;
  description: string;
  specifications: {
    maxSpeed: string;
    range: string;
    motorPower?: string;
    weight: string;
  };
  stock: number;
  slug: string;
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {

  const data = await getProductBySlug(params.slug)
  if(!data) return notFound()

    const {product, category, relatedProduct}= data as unknown as { product: Product; category: any; relatedProduct: any }
    const {addItem}= useCart()

    const discountPercentage = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

 const handleAddToCart = () => {
    addItem({
      productId: product._id.toString(),
      name: product.name,
      price: product.price,
      image: product.images[0],
    })
  }


  // Get related products from same category
  const relatedProducts = await Product.find({
  category: product.category,        // same category
  _id: { $ne: product._id },         // exclude current product
  isActive: true                     // optional: only active products
})
  .limit(3)                           // get only 3 products
  .lean()
  

  return (
    <div className="flex min-h-screen flex-col">
      
      <main className="flex-1">
        <div className="container py-8">
          {/* Breadcrumb */}
          <div className="text-sm text-muted-foreground mb-6">
            <span>Home</span> / <span>Products</span> / <span>{category?.name}</span> /{" "}
            <span className="text-foreground">{product.name}</span>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                <Image
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {discountPercentage > 0 && (
                  <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground text-lg px-3 py-1">
                    -{discountPercentage}%
                  </Badge>
                )}
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.slice(1, 5).map((img, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer"
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

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">{category?.name}</p>
                <h1 className="font-serif text-4xl font-bold mb-4 text-balance">{product.name}</h1>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl font-bold">${product.price}</span>
                  {product.compareAtPrice && (
                    <span className="text-xl text-muted-foreground line-through">${product.compareAtPrice}</span>
                  )}
                </div>
                {product.isFeatured && (
                  <Badge className="bg-accent text-accent-foreground mb-4">Featured Product</Badge>
                )}
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              <Separator />

              {/* Specifications */}
              <div>
                <h3 className="font-semibold mb-4">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Gauge className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Max Speed</p>
                        <p className="font-semibold">{product.specifications.maxSpeed}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Battery className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Range</p>
                        <p className="font-semibold">{product.specifications.range}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Zap className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Motor Power</p>
                        {/* <p className="font-semibold">{product.specifications.motorPower}</p> */}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Weight className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Weight</p>
                        <p className="font-semibold">{product.specifications.weight}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Separator />

              {/* Stock Status */}
              <div>
                {product.stock > 0 ? (
                  <p className="text-sm text-green-600 font-medium">In Stock ({product.stock} available)</p>
                ) : (
                  <p className="text-sm text-destructive font-medium">Out of Stock</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={product.stock === 0}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Additional Info */}
              <Card className="bg-muted/50">
                <CardContent className="p-4 space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <span className="font-semibold">✓</span> Free shipping on all orders
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold">✓</span> 30-day money-back guarantee
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold">✓</span> 1-year warranty included
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="font-serif text-3xl font-bold mb-6">You May Also Like</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={String(relatedProduct._id)}
                    id={String(relatedProduct._id)}
                    name={relatedProduct.name}
                    slug={relatedProduct.slug}
                    price={relatedProduct.price}
                    compareAtPrice={relatedProduct.compareAtPrice}
                    image={relatedProduct.images[0]}
                    category={mockCategories.find((c) => c._id === relatedProduct.category)?.name || ""}
                    isFeatured={relatedProduct.isFeatured}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      
    </div>
  )
}
