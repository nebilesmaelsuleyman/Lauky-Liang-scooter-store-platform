import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DiscountBanner } from "@/components/discount-banner"
import { ProductCard } from "@/components/product-card"
import { mockProducts, mockCategories, mockDiscountBanner } from "@/lib/db/placeholders"
import { notFound } from "next/navigation"

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = mockCategories.find((c) => c.slug === params.slug)

  if (!category) {
    notFound()
  }

  const categoryProducts = mockProducts.filter((p) => p.category === category._id)

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

    </div>
  )
}
