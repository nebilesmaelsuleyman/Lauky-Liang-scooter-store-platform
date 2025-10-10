// catagories/[slug]/page.tsx

// Import the necessary service functions
import { getCategoryBySlug, getProductsByCategorySlug } from "@/lib/services/catogories.service" 

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DiscountBanner } from "@/components/discount-banner"
import { ProductCard } from "@/components/product-card"
import { notFound } from "next/navigation"

// Convert to an async function to enable data fetching
export default async function CategoryPage({ params }: { params: { slug: string } }) {
  
  // 1. Fetch data concurrently for efficiency
  const [category, categoryProducts] = await Promise.all([
    getCategoryBySlug(params.slug),
    getProductsByCategorySlug(params.slug),
  ])

  // 2. Handle notFound if the category doesn't exist
  if (!category) {
    notFound()
  }

  // categoryProducts is already filtered in the service layer, no need for .filter()

  return (
    <div className="flex min-h-screen flex-col">
    
      

      <main className="flex-1">
        <div className="container py-8">
          {/* Category Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">{category.name}</h1>
            <p className="text-muted-foreground">{category.description}</p>
          </div>

          {/* Products Grid */}
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryProducts.map((product) => (
                <ProductCard
                  // 3. Ensure IDs are cast to string for the key and ID props
                  key={product._id as string} 
                  id={product._id as string}
                  name={product.name}
                  slug={product.slug}
                  price={product.price}
                  compareAtPrice={product.compareAtPrice}
                  image={product.images[0]}
                  category={category.name} // Use the fetched category name
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

    </div>
  )
}