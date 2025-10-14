import { NextRequest, NextResponse } from 'next/server';
import { updateUser } from '@/lib/services/user.service';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id;

  // 1. Get the update data from the request body
  let dataToUpdate: any;
  try {
    dataToUpdate = await request.json();
  } catch (error) {
    return NextResponse.json(
      { message: 'Invalid JSON body.' },
      { status: 400 }
    );
  }

  const response = await updateUser(userId, dataToUpdate);
  return response;
}