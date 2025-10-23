"use client"

import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { useCart } from "@/contexts/cart-context"
import { useEffect } from "react"

export default function SuccessPage() {
  const {clearCart} =useCart()
  const searchParams= useSearchParams()
  const sessionId= searchParams.get("session_id")

  useEffect(()=>{
    if(sessionId){
      clearCart()
    }
  },[sessionId, clearCart])

  return (

    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}

        className="bg-white p-8 md:p-12 max-w-lg w-full rounded-2xl shadow-2xl text-center"
      >
        <div className="flex flex-col items-center">

          <CheckCircle2 className="text-teal-600 w-16 h-16 mb-4" /> 
          

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Order Confirmed
          </h1>
        </div>
        

        <p className="text-gray-600 mt-4 text-lg border-t pt-4 border-gray-200">
          Your payment was successfully processed. 
        </p>
        <div className="mt-8 flex flex-col space-y-4">
           <Link
            href="/"
            className="inline-block w-full px-6 py-3 border  bg-teal-600 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    </main>
  )
}