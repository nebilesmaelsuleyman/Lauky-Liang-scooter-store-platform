import Header from '@/components/header'
import {Button} from '@/components/ui/button'
import { ArrowRight, ShoppingCart,Shield,Leaf,Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Card, CardContent } from '@/components/ui/card'
export default function Home() {
  
  return (
    <div className="min-h-screen flex flex-col">

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background h-screen mb-20">
          <div className="container py-20 md:py-32 mb-">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance  text-green-800 ">
                        Ride the Future of Urban Mobility
                    </h1>
                    <p className="text-xl p-4 text-prety text-mute">
                        Experience the perfect blend of performance, style, and sustainability with our premium electric
                        scooters.
                    </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-10">
                  <Button size="lg" className="text-base">
                      {/* Changed 'flext' to 'flex' */}
                      <a href="#" className='flex items-center'>
                          Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                      </a>
                  </Button>

                  <Button  variant="outline" size='lg' className="text-base bg-transparent">
                    <Link href="/products">Learn More</Link>
                  </Button>
                </div>
              </div>

              <div className="relative h-[400px] lg:h-[600px]">
                <Image
                   src="/images/blackscooter.webp"
                  alt="Premium Electric Scooter"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className='max-h-24 bg-gradient-to-b from-gr-50 to-white'>
          <div className='container '>
            <h2 className='text-3xl font-bold text-center mb-12 text-green-800'>Why Choose Our Electric Scooters?</h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
              <Card className='border-0 shadow-lg'>
                <CardContent className='text-center space-y-4'>
                  <Leaf className='mx-auto h-10 w-10 text-green-600' />
                  <h3 className='text-xl font-semibold'>Eco-Friendly</h3>
                  <p className='text-muted-foreground'>Reduce your carbon footprint with our zero-emission scooters.</p>
                </CardContent>
              </Card>

              <Card className='border-0 shadow-lg'>
                <CardContent className='text-center space-y-4'>
                  <Zap className='mx-auto h-10 w-10 text-green-600' />
                  <h3 className='text-xl font-semibold'>High Performance</h3>
                  <p className='text-muted-foreground'>Enjoy powerful motors and long-lasting batteries for an exhilarating ride.</p>
                </CardContent>
              </Card>

              <Card className='border-0 shadow-lg'>
                <CardContent className='text-center space-y-4'>
                  <Shield className='mx-auto h-10 w-10 text-green-600' />
                  <h3 className='text-xl font-semibold'>Safety First</h3>
                  <p className='text-muted-foreground'>Equipped with advanced safety features to ensure a secure ride.</p>
                </CardContent>
              </Card>

              <Card className='border-0 shadow-lg'>
                <CardContent className='text-center space-y-4'>
                  <ShoppingCart className='mx-auto h-10 w-10 text-green-600' />
                  <h3 className='text-xl font-semibold'>Affordable Prices</h3>
                  <p className='text-muted-foreground'>Get the best value for your money with our competitively priced scooters.</p>
                </CardContent>
              </Card>
            </div>
              {/* Featured Products */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Featured Scooters</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover our most popular models, designed for every rider and lifestyle.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              
                <Link  href='#'
              >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                    <div className="relative h-64 bg-muted">
                      <Image
                        src= "/images/blackscooter.jpg"
                        alt='scooter'
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">check</h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">description</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">456</span>
                        <Button variant="outline">View Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
             
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg" variant="outline">
                <Link href="/products">
                  View All Products <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            </div>
            </section>
          </div>


        </section>
        </main>
        </div>
    
  )
}