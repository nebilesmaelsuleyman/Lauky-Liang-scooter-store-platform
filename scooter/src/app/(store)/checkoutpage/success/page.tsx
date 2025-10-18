"use client"

import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function SuccessPage() {
  return (
    // Change: Use a dark, elegant background and a centered, elevated card for focus
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        // Change: Add a white card background, subtle shadow, and rounded corners
        className="bg-white p-8 md:p-12 max-w-lg w-full rounded-2xl shadow-2xl text-center"
      >
        <div className="flex flex-col items-center">
          {/* Change: Use a slightly larger, deeper-colored icon */}
          <CheckCircle2 className="text-teal-600 w-16 h-16 mb-4" /> 
          
          {/* Change: Use a more formal, slightly less playful heading and no emoji */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Order Confirmed
          </h1>
        </div>
        
        {/* Change: Sharper, professional body copy with better contrast */}
        <p className="text-gray-600 mt-4 text-lg border-t pt-4 border-gray-200">
          Your payment was successfully processed. A detailed confirmation and receipt have been sent to your email address.
        </p>
        
        <p className="text-sm text-gray-500 mt-2">
            **Transaction ID:** #XYZ-12345678
        </p>

        <div className="mt-8 flex flex-col space-y-4">
          {/* Change: Primary button is dark/teal, slightly flatter, with a subtle focus on typography */}
          <Link
            href="/dashboard" // Recommended: link to a 'Dashboard' or 'Order History' for a professional feel
            className="inline-block w-full px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition duration-300 transform hover:scale-[1.01]"
          >
            View Order Details
          </Link>
          
          {/* Change: Added a secondary, outlined link for the home page */}
           <Link
            href="/"
            className="inline-block w-full px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    </main>
  )
}