"use client"

import { XCircle } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function CancelPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red-50 to-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <XCircle className="mx-auto text-red-600 w-20 h-20 mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Payment Canceled
        </h1>
        <p className="text-gray-600 mt-3 max-w-md mx-auto">
          Your payment was not completed. You can try again or continue browsing our products.
        </p>
        <div className="mt-8 space-x-3">
          <Link
            href="/checkout"
            className="inline-block px-6 py-3 bg-red-600 text-white rounded-xl shadow hover:bg-red-700 transition"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gray-200 text-gray-800 rounded-xl shadow hover:bg-gray-300 transition"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </main>
  )
}
