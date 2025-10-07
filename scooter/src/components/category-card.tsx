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
    <Link href={`/categories/${slug}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-xl">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="font-serif text-2xl font-bold mb-2">{name}</h3>
            <p className="text-sm text-white/90 mb-3 line-clamp-2">{description}</p>
            <div className="flex items-center text-sm font-medium group-hover:gap-2 transition-all">
              <span>Explore Collection</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
