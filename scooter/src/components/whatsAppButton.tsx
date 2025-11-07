"use client"

import Link from "next/link"
import { MessageCircle } from "lucide-react"

export default function WhatsAppButton() {
  const phoneNumber = "+251952879086" // your WhatsApp number in international format (no +)
  const message = "Hello! I'm interested in your products." // default message

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-700 hover:bg-green-800 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </Link>
  )
}
