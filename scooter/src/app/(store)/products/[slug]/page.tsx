// src/app/(store)/products/[slug]/page.tsx

import { notFound } from "next/navigation"
import { getProductBySlug } from "@/lib/services/product.service" // Your database service
import ProductDetailClient from "./productDetailClient" 
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DiscountBanner } from "@/components/discount-banner"
// NOTE: Remove mock data imports like mockDiscountBanner

interface Props {
  params: { slug: string }
}

export default async function ProductDetailPage({ params }: Props) {
  // 1. Fetch data from the database
  const data = await getProductBySlug(params.slug)

  if (!data) return notFound()
  
  // Destructure for cleaner access in the server component
  const { product, category, relatedProduct } = data;

  // Assuming you have a way to fetch the DiscountBanner data
  // For now, let's use a simplified structure or remove the prop if dynamic data isn't ready.
  const mockDiscountBanner = { title: "Summer Sale", description: "Up to 50% Off", discountPercentage: 50 };

  return (
    <div className="flex min-h-screen flex-col">
      <DiscountBanner
        title={mockDiscountBanner.title}
        description={mockDiscountBanner.description}
        discountPercentage='10'
      />
      <SiteHeader />

      <main className="flex-1">
        {/* Pass ALL fetched data to the Client Component */}
        <ProductDetailClient 
          product={product} 
          category={category} 
          relatedProducts={relatedProduct} 
        />
      </main>

      <SiteFooter />
    </div>
  )
}