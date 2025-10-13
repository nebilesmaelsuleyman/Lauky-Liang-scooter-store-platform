'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const images = [
  { src: '/images/engwe.webp', alt: 'Electric Scooter Model A' },
  { src: '/images/xepro.webp', alt: 'Electric Scooter Model B in Green' },
  { src: '/images/st-Motor.webp', alt: 'Electric Scooter Close-up View' }
]

const transitionDuration = 1000
const slideInterval = 4000

export default function AuthImageSlider() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length)
    }, slideInterval)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center overflow-hidden bg-[#0D1F3C]">
      {images.map((img, index) => (
        <div
          key={index}
          className="absolute inset-0 flex items-center justify-center transition-opacity ease-in-out"
          style={{
            opacity: index === currentImageIndex ? 1 : 0,
            zIndex: index === currentImageIndex ? 10 : 0,
            transitionDuration: `${transitionDuration}ms`
          }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            width={800}
            height={400}
            className="object-contain"
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ))}

      {/* Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentImageIndex ? 'bg-green-600 w-6' : 'bg-gray-400 opacity-50'
            }`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
