"use client"
import ClientOnlySlider from '@/components/clientonlySlider'
import {SiteHeader} from '@/components/site-header'
import {SiteFooter} from '@/components/site-footer'
import {Button} from '@/components/ui/button'
import { ArrowRight, ShoppingCart,Shield,Leaf,Zap ,Truck} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { DiscountBanner } from "@/components/discount-banner"
import { Card, CardContent } from '@/components/ui/card'
import {ProductCard} from '@/components/product-card'
import {CategoryCard} from '@/components/category-card'
import { useEffect, useState } from 'react' // <-- Add hooks
import { Product } from "@/lib/models/productModel" // <-- Add type
import { Category } from "@/lib/models/categoryModel" // <-- Add type
import AutoImageSlider from '@/components/AuthoImageSlider'
import FullBackgroundSlider from '@/components/BackgroundImageSlider'

export default function Home() {
  // 1. State for real data, replacing mock data initialization
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [displayCategories, setDisplayCategories] = useState<Category[]>([])
  const [allCategories, setAllCategories] = useState<Category[]>([]) // Needed for product card category lookup
  const [isLoading, setIsLoading] = useState(true)
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);


        const featuredRes = await fetch('/api/products/featured-products')
        const featuredData = await featuredRes.json()
        setFeaturedProducts(featuredData)


        const categoriesRes = await fetch('/api/categories')
        const categoriesData = await categoriesRes.json()
        

        setAllCategories(categoriesData); 

        setDisplayCategories(categoriesData.slice(0, 4)) 

      } catch (error) {
        console.error("Failed to fetch homepage data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData()
  }, [])

 
  if (isLoading) {
    
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-primary">Loading the store data...</p>
        </div>
    );
  }
  const BACKGROUND_IMAGES = [
  { src: '/images/electric-scooter-side-view.jpg', alt: 'Electric scooter on the road' },
  { src: '/images/high-end-electric-scooter.jpg', alt: 'Modern urban scooter' },
  { src: '/images/Natike.png', alt: 'Scooter in city landscape' },
]

// Interval between slides (milliseconds)
const SLIDE_INTERVAL = 5000

  return (
     
    <div className="min-h-screen flex flex-col  ">

        <DiscountBanner
              title='spring sales'
              description='limited time offer'
              discountPercentage='10'
            />
            
      <SiteHeader />
      <main className="flex-1  container">
         {/* Hero Section */}
         <section className="relative text-white min-h-screen flex items-center overflow-hidden">
      {/* Full Background Slider */}
      <FullBackgroundSlider images={BACKGROUND_IMAGES} interval={SLIDE_INTERVAL} />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

      {/* Content Layer */}
      <div className="container mx-auto relative z-10 flex items-center justify-center px-6 md:px-10 py-10 min-h-screen">
        <div className="flex-1 text-center space-y-8 max-w-4xl p-6 sm:p-10 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tighter">
            <span className="text-green-400 drop-shadow-lg">Ride the Future</span> <br />
            of Urban Mobility
          </h1>

          <p className="text-lg sm:text-xl text-white/90 drop-shadow-md max-w-2xl mx-auto">
            Discover premium electric scooters designed for modern commuters.
            Elegant design meets high performance in every ride.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
            {/* Button 1: Shop Now */}
            <Link href="/products">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white font-medium"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            {/* Button 2: Browse Categories */}
            <Link href="/categories">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-[#0D1F3C] font-medium"
              >
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>


        {/* Categories Grid */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">Shop by Category</h2>
              <p className="text-muted-foreground">Find the perfect scooter for your lifestyle</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Using the fetched displayCategories state */}
              {displayCategories.map((category) => (
                <CategoryCard
                  key={String(category._id)}
                  name={category.name}
                  slug={category.slug}
                  description={category.description}
                  image={category.image}
                />
              ))}
            </div>
          </div>
        </section>
        
            {/* CTA Section */}
        <section className="relative py-28">
  <img
    src="/images/all-terrain-electric-scooter.jpg"
    alt="Scooters in city"
    className="absolute inset-0 w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-black/50"></div>
  <div className="relative container mx-auto text-center text-white px-4">
    <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Transform Your Commute?</h2>
    <p className="text-lg mb-8 text-white/90">
      Join thousands of satisfied riders who have upgraded their daily travel.
    </p>
    <Link href="/products">
      <Button size="lg" variant="secondary" className="bg-green-600 hover:bg-green-500">
        Start Shopping
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </Link>
  </div>
</section>
  
        </main>
        <SiteFooter/>
        </div>
    
  )
}
