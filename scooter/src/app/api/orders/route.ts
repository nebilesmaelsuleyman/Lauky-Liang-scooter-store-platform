
import { NextResponse } from 'next/server';
import { getAdminOrders } from '@/lib/services/order.service';


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get('q') || '';

    const orders = await getAdminOrders(searchQuery);

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("API Error in /api/admin/orders:", error);
    return NextResponse.json(
      { message: "Failed to load orders.", error: (error as Error).message },
      { status: 500 }
    );
  }
}