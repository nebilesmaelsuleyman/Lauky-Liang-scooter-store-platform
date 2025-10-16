"use client"

import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <CheckCircle2 className="mx-auto text-green-600 w-20 h-20 mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Payment Successful 🎉
        </h1>
        <p className="text-gray-600 mt-3 max-w-md mx-auto">
          Thank you for your purchase! We’ve received your payment and your order is being processed.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </main>
  )
}
