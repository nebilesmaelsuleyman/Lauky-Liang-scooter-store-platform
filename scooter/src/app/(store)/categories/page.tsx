import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DiscountBanner } from "@/components/discount-banner"
import { CategoryCard } from "@/components/category-card"
import {getAllCategories} from '@/lib/services/catogories.service'

export default async function CategoriesPage() {
  const categories = await getAllCategories()

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
         {/* Categories Grid */}
          {categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard
                  // The _id is now guaranteed to be a serializable string/number after JSON.stringify
                  key={category._id as string} 
                  name={category.name}
                  slug={category.slug}
                  description={category.description}
                  image={category.image}
                />
              ))}
            </div>
          ) : (
             <div className="text-center py-12">
              <p className="text-muted-foreground">No categories available</p>
            </div>
          )}
        </div>
      </main>

      {/* <SiteFooter /> */}
    </div>
  )
}