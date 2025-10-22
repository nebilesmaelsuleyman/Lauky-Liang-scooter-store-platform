import { NextRequest, NextResponse } from 'next/server';
import { updateUser } from '@/lib/services/user.service';

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // ✅ must match folder name
) {
  const { id } = await context.params; // ✅ destructure correct param name

  let dataToUpdate: any;
  try {
    dataToUpdate = await request.json();
  } catch (error) {
    return NextResponse.json(
      { message: 'Invalid JSON body.' },
      { status: 400 }
    );
  }

  try {
    const response = await updateUser(id, dataToUpdate);
    return response;
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
    return NextResponse.json(
      { message: 'Failed to update user.' },
      { status: 500 }
    );
  }
}
