import Stripe from 'stripe'
import { NextResponse } from 'next/server'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover"
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: "payment",
      line_items: body.items.map((item: any) => ({
        price_data: {
          currency: 'usd', // <-- lowercase!
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [], // handle missing images
          },
          unit_amount: Math.round(item.price * 100), // price in cents
        },
        quantity: item.quantity, // <-- number of items, not price*100
      })),
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkoutpage/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkoutpage/cancel`,
    })

    return NextResponse.json({ url: session.url })

  } catch (error: any) {
    console.error("stripe error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
