import { NextResponse } from "next/server"
import { AccountService } from "@/lib/services/account.service"

export async function POST(req: Request) {
  try {
    const { email, oldPassword, newPassword } = await req.json()
    const result = await AccountService.updatePassword(email, oldPassword, newPassword)
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
