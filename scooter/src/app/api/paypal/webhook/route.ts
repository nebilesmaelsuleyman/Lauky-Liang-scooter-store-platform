import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  console.log("📩 PayPal webhook received:", body.event_type);

  // Example: handle successful captures
  if (body.event_type === "PAYMENT.CAPTURE.COMPLETED") {
    const order = body.resource;
    // ✅ save this info to DB as a completed order
  }

  return NextResponse.json({ received: true });
}
