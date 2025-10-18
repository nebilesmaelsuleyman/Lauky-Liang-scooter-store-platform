"use client"

import { XCircle } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function CancelPage() {
  return (
    // Change: Use a dark background to mirror the success page, but keep the card focus
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        // Change: White card with shadow for professionalism
        className="bg-white p-8 md:p-12 max-w-lg w-full rounded-2xl shadow-2xl text-center"
      >
        <div className="flex flex-col items-center">
          {/* Change: Use a professional, deep maroon/red for the icon */}
          <XCircle className="text-rose-700 w-16 h-16 mb-4" /> 
          
          {/* Change: Formal and direct heading */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Transaction Unsuccessful
          </h1>
        </div>
        
        {/* Change: Clear, helpful, and reassuring body copy */}
        <p className="text-gray-600 mt-4 text-lg border-t pt-4 border-gray-200">
          Your payment could not be processed at this time.Try a again please.
        </p>
        
        <p className="text-sm text-gray-500 mt-2">
            No charge has been made to your account.
        </p>

        <div className="mt-8 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          {/* Change: Primary button is the next action (Try Again) with the rose/red accent */}
          <Link
            href="/checkout"
            className="inline-block w-full px-6 py-3 bg-rose-700 text-white font-semibold rounded-lg shadow-md hover:bg-rose-800 transition duration-300 transform hover:scale-[1.01]"
          >
            Review & Try Again
          </Link>
          
          {/* Change: Secondary button is less emphasized (outlined/neutral) */}
           <Link
            href="/"
            className="inline-block w-full px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-300"
          >
            Browse Products
          </Link>
        </div>
      </motion.div>
    </main>
  )
}