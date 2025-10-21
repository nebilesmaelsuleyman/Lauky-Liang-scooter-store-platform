
import { notFound } from "next/navigation"
import { getProductBySlug } from "@/lib/services/product.service" // Your database service
import ProductDetailClient from "./productDetailClient" 

interface Props {
  params: { slug: string }
}

export default async function ProductDetailPage({ params }: Props) {
  
  const {slug}= await params
  const data = await getProductBySlug(slug)

  if (!data) return notFound()
  

  const { product, category, relatedProduct } = data;

 
  return (
    <div className="flex min-h-screen flex-col">
      

      <main className="flex-1">
       
        <ProductDetailClient 
          product={product} 
          category={category} 
          relatedProducts={relatedProduct} 
        />
      </main>

      
    </div>
  )
}