import Header from '@/components/shared/header'
import {Button} from '@/components/ui/button'
import { ArrowRight, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
export default function Home() {
  return (
    <div className="min-h mt-10 sm:mt-10 md:mt-20 lg:mt-32">

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background">
          <div className="container py-20 md:py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-8 text-green-800">
                        Ride the Future of Urban Mobility
                    </h1>
                    <p className="text-xl  text-prety text-muted-foreground">
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
        
        </main>
        </div>
    
  )
}