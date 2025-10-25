import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card" 
import { ArrowRight } from "lucide-react"

interface CategoryCardProps {
  name: string
  slug: string
  description: string
  image: string
}

export function CategoryCard({ name, slug, description, image }: CategoryCardProps) {
  return (
    <div className="">
    <Link href={`/categories/${slug}`}>
      
      
      <Card 
        className="group overflow-hidden relative transition-all duration-300 shadow-xl hover:shadow-2xl hover:ring-4 hover:ring-emerald-500/50 hover:ring-offset-2 hover:ring-offset-background "
      >
        
    
        <div className="relative aspect-[3/4] overflow-hidden w-full h-full"> 
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
           
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04] group-hover:brightness-90"
          />

          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-0 transition-colors duration-300 bg-black/0 group-hover:bg-black/10" />

          <div className="absolute bottom-0 left-0 right-0 p-5 pt-10 text-white">
      
            <h3 className="text-3xl font-sans font-extrabold mb-1 tracking-tight text-white leading-snug">
              {name}
            </h3>
            
            <p className="text-sm mb-3 line-clamp-2 text-white/80">{description}</p>
        
           
            <div className="flex items-center text-sm font-bold text-emerald-500 group-hover:gap-2 transition-all duration-300">
              <span>View Collection</span> 
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 duration-300" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
    </div>
  )
}