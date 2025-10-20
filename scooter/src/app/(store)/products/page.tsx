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
import { SlidersHorizontal, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Product } from "@/lib/models/productModel"
import { Category } from "@/lib/models/categoryModel"

export default function ProductsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 10000]) 
  const [sortBy, setSortBy] = useState("All")
  const [isLoading, setIsLoading] = useState(true); 

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [dynamicMaxPrice, setDynamicMaxPrice] = useState(10000)

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const resProducts = await fetch('/api/products')
        const dataProducts = await resProducts.json()
     
        const maxPrice = dataProducts.reduce(
            (max: number, p: Product) => Math.max(max, p.price || 0), 
            0
        );

        setProducts(dataProducts);
        
        setDynamicMaxPrice(maxPrice || 10000); 
        setPriceRange([0, maxPrice || 10000]);


        const resCategories = await fetch('/api/categories')
        const dataCategories = await resCategories.json()
        setCategories(dataCategories)
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [])

  let filteredProducts = (Array.isArray(products)? products:[]).filter((product)=>{
    const categoryId = String(product.category); 
    
    const categoryMatch =
      selectedCategories.length === 0 || selectedCategories.includes(categoryId); 

    const priceMatch =
      product.price >= priceRange[0] && product.price <= priceRange[1];
      
    return categoryMatch && priceMatch;
  })

  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "name":
        return a.name.localeCompare(b.name)
      case "featured":
        if (a.isFeatured && !b.isFeatured) return -1
        if (!a.isFeatured && b.isFeatured) return 1
        return 0
      case 'All':
        default:
          return 0
    }
  })

  if (isLoading) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <Loader2 className="h-12 w-12 text-green-500 animate-spin" />
            <p className="mt-4 text-green-500">Loading products and filters...</p>
        </div>
    );
  }

  const FilterContent = () => (

     <div className="space-y-6 text-gray-800"> 
     
      <div>
        <h3 className="font-semibold mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.map((category) => {
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

  
      <div> 
        <h3 className="font-semibold mb-4">Price Range</h3>
        <div className="space-y-4">
          <Slider 
            min={0} 
            max={dynamicMaxPrice} 
            step={50} 
            value={priceRange} 
            onValueChange={setPriceRange} 
            className="w-full" 
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>د.إ {priceRange[0]}</span>
            <span>د.إ {priceRange[1]}</span>
          </div>
        </div>
      </div>

    
      <Button
        variant="outline"
        className="w-full" 
        onClick={() => {
          setSelectedCategories([])
          setPriceRange([0, dynamicMaxPrice]) 
        }}
      >
        Reset Filters
      </Button>
    </div>
  )

  return (
   
    <div className="flex min-h-screen flex-col  text-white"> 
      <DiscountBanner />
      <SiteHeader /> 

      <main className="flex-1">
        <div className="container py-8 px-8">
         
          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2 text-gray-800">All Products</h1> 
            <p className="text-gray-500">Discover our complete collection of premium electric scooters</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            
            <aside className="hidden lg:block w-64 flex-shrink-0">

              <div className="sticky top-24 border rounded-lg p-6 bg-white shadow-lg"> 
                <h2 className="font-semibold text-lg mb-6 text-gray-900">Filters</h2>
                <FilterContent />
              </div>
            </aside>

          
            <div className="flex-1">
             
              <div className="flex items-center justify-between mb-6 text-white/70">
                <p className="text-sm">
                  Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
                </p>

                <div className="flex items-center gap-4">

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px] text-gray-900 bg-white">
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

                
                  <Sheet>
                    <SheetTrigger asChild className="lg:hidden">

                      <Button variant="outline" size="icon" className="bg-white"> 
                        <SlidersHorizontal className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>

                    <SheetContent side="left" className="w-[300px] bg-white"> 
                      <SheetHeader>
                        <SheetTitle className="text-gray-900">Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FilterContent />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

             
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
                      category={categories.find((c) => c._id === product.category)?.name || ""}
                      isFeatured={product.isFeatured}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-white/70">
                  <p className="mb-4">No products found matching your filters</p>
                  <Button
                    variant="outline"
                    className="bg-white text-gray-900 hover:bg-gray-100"
                    onClick={() => {
                      setSelectedCategories([])
                      setPriceRange([0, dynamicMaxPrice]) 
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