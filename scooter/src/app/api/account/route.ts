import { NextResponse } from "next/server"
import { AccountService } from "@/lib/services/account.service"

export async function GET() {
  try {
    const user = await AccountService.getUser()
    return NextResponse.json(user)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 })
  }
}
