"use client"

import { XCircle } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function CancelPage() {
  return (
    
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        
        className="bg-white p-8 md:p-12 max-w-lg w-full rounded-2xl shadow-2xl text-center"
      >
        <div className="flex flex-col items-center">
         
          <XCircle className="text-rose-700 w-16 h-16 mb-4" /> 
          
         
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Transaction Unsuccessful
          </h1>
        </div>
        
      
        <p className="text-gray-600 mt-4 text-lg border-t pt-4 border-gray-200">
          Your payment could not be processed at this time.Try a again please.
        </p>
        
        <p className="text-sm text-gray-500 mt-2">
            No charge has been made to your account.
        </p>

        <div className="mt-8 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
       
          <Link
            href="/checkout"
            className="inline-block w-full px-6 py-3 bg-rose-700 text-white font-semibold rounded-lg shadow-md hover:bg-rose-800 transition duration-300 transform hover:scale-[1.01]"
          >
            Review & Try Again
          </Link>
          
          
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