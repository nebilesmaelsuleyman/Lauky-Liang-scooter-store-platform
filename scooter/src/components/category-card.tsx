import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card" // Assuming shadcn/ui Card
import { ArrowRight } from "lucide-react"

interface CategoryCardProps {
  name: string
  slug: string
  description: string
  image: string
}

export function CategoryCard({ name, slug, description, image }: CategoryCardProps) {
  return (
    <Link href={`/categories/${slug}`}>
      
      <Card className="px-1 group overflow-hidden relative transition-all duration-300 
                     hover:shadow-2xl hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-background">
        
       
        <div className="relative aspect-[3/4] overflow-hidden">
          
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
           
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute bottom-15 left-0 right-0 p-5 text-white">
      
            <h3 className="text-4xl font-sans font-extrabold mb-1 tracking-tight">{name}</h3>
            <p className="text-xs text-white/80 mb-3 line-clamp-2">{description}</p>
        
            <div className="flex items-center text-sm font-semibold text-primary-foreground group-hover:gap-2 transition-all duration-300">
              <span>View Collection</span> 
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 duration-300" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}