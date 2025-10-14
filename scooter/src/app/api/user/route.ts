import {getAllUsers}from '@/lib/services/user.service'

export async function GET() {
  return getAllUsers();
}