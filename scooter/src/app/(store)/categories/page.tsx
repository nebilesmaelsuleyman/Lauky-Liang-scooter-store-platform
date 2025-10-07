import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DiscountBanner } from "@/components/discount-banner"
import { CategoryCard } from "@/components/category-card"
import { mockCategories, mockDiscountBanner } from "@/lib/db/placeholders"

export default function CategoriesPage() {
  return (
    <div className="flex min-h-screen flex-col">
     

      <main className="flex-1">
        <div className="container py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Browse Categories</h1>
            <p className="text-muted-foreground">Find the perfect scooter for your lifestyle and needs</p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCategories.map((category) => (
              <CategoryCard
                key={category._id}
                name={category.name}
                slug={category.slug}
                description={category.description}
                image={category.image}
              />
            ))}
          </div>
        </div>
      </main>

    </div>
  )
}
