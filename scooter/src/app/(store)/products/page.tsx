"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DiscountBanner } from "@/components/discount-banner"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { SlidersHorizontal } from "lucide-react"
import { useEffect, useState } from "react"

import { Product } from "@/lib/models/productModel"
import { Category } from "@/lib/models/categoryModel"

// Define a max price for the slider and initial range


export default function ProductsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 10000]) // Use MAX_PRICE
  const [sortBy, setSortBy] = useState("All")
  const [isLoading, setIsLoading] = useState(true); // State to handle loading

  // State to hold real data from MongoDB APIs
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
const [dynamicMaxPrice, setDynamicMaxPrice] = useState(10000)
  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  // Effect to fetch initial data for products and categories
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch all products
        const resProducts = await fetch('/api/products')
        const dataProducts = await resProducts.json()
        const maxPrice = dataProducts.reduce(
              (max: number, p: Product) => Math.max(max, p.price || 0)
          );

        setProducts(dataProducts);

        // Fetch all categories
        const resCategories = await fetch('/api/categories')
        const dataCategories = await resCategories.json()
        setCategories(dataCategories)
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Handle error state if necessary
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    // Removed the redundant second useEffect for categories
  }, [])

  // Filter products based on categories and price range
  let filteredProducts = (Array.isArray(products)? products:[]).filter((product)=>{

    const categoryId = String(product.category); 
    
    // Check if the product's category matches any selected category
    const categoryMatch =
      selectedCategories.length === 0 || selectedCategories.includes(categoryId); 

    // Check if the product's price is within the selected range
    const priceMatch =
      product.price >= priceRange[0] && product.price <= priceRange[1];
      
    return categoryMatch && priceMatch;
  })


  // Sort products
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "name":
        return a.name.localeCompare(b.name)
      case "featured":
        // Featured: put featured items first
        if (a.isFeatured && !b.isFeatured) return -1
        if (!a.isFeatured && b.isFeatured) return 1
        return 0
      case 'All':
        default:
          return 0
    }
  })

  // Loading State UI
  if (isLoading) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-primary">Loading products and filters...</p>
        </div>
    );
  }

  const FilterContent = () => (
     <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.map((category) => {
            // Category IDs are assumed to be strings after being returned from the API
            const categoryId = category._id as string;
            
            return (
              <div 
                key={categoryId} 
                className="flex items-center space-x-2"
              >
                <Checkbox
                  id={categoryId}
                  checked={selectedCategories.includes(categoryId)}
                  onCheckedChange={() => handleCategoryToggle(categoryId)}
                />
                <Label htmlFor={categoryId} className="text-sm cursor-pointer">
                  {category.name}
                </Label>
              </div>
            );
          })}

        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-4">Price Range</h3>
        <div className="space-y-4">
          <Slider 
            min={0} 
            max={dynamicMaxPrice} // Use constant
            step={50} 
            value={priceRange} 
            onValueChange={setPriceRange} 
            className="w-full" 
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Reset Filters */}
      <Button
        variant="outline"
        className="w-full bg-transparent"
        onClick={() => {
          setSelectedCategories([])
          setPriceRange([0, dynamicMaxPrice]) // Use constant
        }}
      >
        Reset Filters
      </Button>
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader /> 
      <DiscountBanner />

      <main className="flex-1">
        <div className="container py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">All Products</h1>
            <p className="text-muted-foreground">Discover our complete collection of premium electric scooters</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 border rounded-lg p-6">
                <h2 className="font-semibold text-lg mb-6">Filters</h2>
                <FilterContent />
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
                </p>

                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Products </SelectItem>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="name">Name: A to Z</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Mobile Filter Button */}
                  <Sheet>
                    <SheetTrigger asChild className="lg:hidden">
                      <Button variant="outline" size="icon">
                        <SlidersHorizontal className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px]">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FilterContent />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={String(product._id)}
                      id={String(product._id)}
                      name={product.name}
                      slug={product.slug}
                      price={product.price}
                      compareAtPrice={product.compareAtPrice}
                      image={product.images[0]}
                      // Use the fetched 'categories' state instead of 'mockCategories'
                      category={categories.find((c) => c._id === product.category)?.name || ""}
                      isFeatured={product.isFeatured}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No products found matching your filters</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategories([])
                      setPriceRange([0, dynamicMaxPrice]) // Use constant
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
