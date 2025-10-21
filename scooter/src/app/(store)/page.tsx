"use client"

import {SiteHeader} from '@/components/site-header'
import {SiteFooter} from '@/components/site-footer'
import {Button} from '@/components/ui/button'
import { ArrowRight, ShoppingCart,Shield,Leaf,Zap ,Truck} from 'lucide-react'
import Link from 'next/link'
import { DiscountBanner } from "@/components/discount-banner"
import {ProductCard} from '@/components/product-card'
import {CategoryCard} from '@/components/category-card'
import { useEffect, useState } from 'react' 
import { Product } from "@/lib/models/productModel" 
import { Category } from "@/lib/models/categoryModel" 
import FullBackgroundSlider from '@/components/BackgroundImageSlider'
import VideoCarousel from '@/components/videoCarousel'

export default function Home() {
  // 1. State for real data, replacing mock data initialization
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [displayCategories, setDisplayCategories] = useState<Category[]>([])
  const [allCategories, setAllCategories] = useState<Category[]>([]) 
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
  { src: '/images/j1.jpg', alt: 'Electric scooter on the road' },
  { src: '/images/U03-04(1).jpg', alt: 'Modern urban scooter' },
  { src: '/images/DS01-05.jpg', alt: 'Scooter in city landscape' },
  { src: '/images/DS01-06.jpg', alt: 'Scooter in city landscape' },
]


const SLIDE_INTERVAL = 5000

  return (
     
    <div className="min-h-screen flex flex-col   ">

      <main className="flex-1  ">
         
         <section className="relative text-white min-h-screen flex items-center overflow-hidden">
     
      <FullBackgroundSlider images={BACKGROUND_IMAGES} interval={SLIDE_INTERVAL} />

      
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[0px]" />

    
      <div className="container  relative z-10 flex items-center justify-center px-6 md:px-10 py-10 min-h-screen">
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

            
            <Link href="/categories">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white text-green-700 hover:bg-white hover:text-[#0D1F3C] font-medium"
              >
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
   
      <section className="py-24 md:py-32 bg-gray-950 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-6">
         
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Why Choose Our <span className='text-green-400'>Electric Scooters</span>?
            </h2>
            <p className="mt-4 text-xl text-gray-400">
              Experience the next generation of personal transportation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
            
            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-green-700/30 transition-all duration-300 transform hover:-translate-y-1 border border-gray-700">
              <div className="flex flex-col items-center text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-green-900/40 flex items-center justify-center shadow-lg">
                  <Zap className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  High <span className='text-green-400'>Performance</span>
                </h3>
                <p className="text-gray-300 text-lg">
                  Powerful motors delivering speeds up to 40 mph with exceptional range. Experience the thrill of power.
                </p>
              </div>
            </div>

            
            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-green-700/30 transition-all duration-300 transform hover:-translate-y-1 border border-gray-700">
              <div className="flex flex-col items-center text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-green-900/40 flex items-center justify-center shadow-lg">
                  <Shield className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  <span className='text-green-400'>Built to</span> Last
                </h3>
                <p className="text-gray-300 text-lg">
                  Premium materials and rigorous testing ensure unparalleled durability and safety for every ride.
                </p>
              </div>
            </div>

          
            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-green-700/30 transition-all duration-300 transform hover:-translate-y-1 border border-gray-700">
              <div className="flex flex-col items-center text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-green-900/40 flex items-center justify-center shadow-lg">
                  <Leaf className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Eco <span className='text-green-400'>Friendly</span>
                </h3>
                <p className="text-gray-300 text-lg">
                  Zero emissions and an energy-efficient design contribute to a cleaner, greener tomorrow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


        <section className="py-8 p-8 bg-gradient-to-b">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2"> Top Scooters</h2>
                <p className="text-muted-foreground">Our most popular models loved by riders</p>
              </div>
              <Link href="/products">
                <Button variant="secondary">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
               
              {featuredProducts.map((product) => (
                <ProductCard
                  key={String(product._id)}
                  id={String(product._id)}
                  name={product.name}
                  slug={product.slug}
                  price={product.price}
                  compareAtPrice={product.compareAtPrice}
                  image={product.images[0]}
                  
                  category={allCategories.find((c) => c._id === product.category)?.name || ""}
                  isFeatured={product.isFeatured}
                />
              ))}
            </div>
          </div>
        </section>


        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2 text-green-700">Shop by Category</h2>
              <p className="text-muted-foreground">Find the perfect scooter for your lifestyle</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
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
        <>
        <VideoCarousel/>
        </>
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
       
        </div>
    
  )
}
