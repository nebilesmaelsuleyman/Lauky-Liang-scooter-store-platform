// app/categories/[slug]/page.tsx
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getCategoryBySlug, getProductsByCategorySlug } from "@/lib/services/catogories.service" 

import { ProductCard } from "@/components/product-card"
import { notFound } from "next/navigation"

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  isFeatured: boolean;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
}


export default async function CategoryPage({ params }: { params: { slug: string } }) {
  
  const [categoryResult, productsResult] = await Promise.all([
    getCategoryBySlug(params.slug),
    getProductsByCategorySlug(params.slug),
  ])

  const category: Category | null = categoryResult as Category;
  const products: Product[] = productsResult.products as Product[];

  if (!category) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
    <SiteHeader/>
      <main className="flex-1">
        <div className="container py-8">
          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">{category.name}</h1>
            <p className="text-muted-foreground">{category.description}</p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product._id} 
                  id={product._id}
                  name={product.name}
                  slug={product.slug}
                  price={product.price}
                  compareAtPrice={product.compareAtPrice}
                  image={product.images[0]}
                  category={category.name}
                  isFeatured={product.isFeatured}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products available in this category yet</p>
            </div>
          )}
        </div>
      </main>
<SiteFooter/>
    </div>
  )
}