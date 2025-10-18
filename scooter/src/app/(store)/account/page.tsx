"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

// Assuming you have an Avatar component for a professional touch
import { Avatar, AvatarFallback } from "@/components/ui/avatar" 


export default function AccountPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [message, setMessage] = useState("")

  // --- LOGIC (UNTOUCHED) ---

  useEffect(() => {
    fetch("/api/account")
      .then((res) => res.json())
      .then((data) => {
        if (data?.email) setUser(data)
      })
  }, [])

  const handlePasswordChange = async () => {
    if (!user) return
    const res = await fetch("/api/account/update-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        oldPassword,
        newPassword,
      }),
    })
    const data = await res.json()
    setMessage(data.message || data.error)
    setOldPassword("")
    setNewPassword("")
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    window.location.href = "/"
  }

  // --- UI (PROFESSIONAL SHADCN/UI) ---

  if (!user) {
    return (
      <div className="max-w-xl mx-auto mt-20 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Loading Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Loading account info...</p>
            {/* Consider adding a Skeleton component here for a better loading state */}
          </CardContent>
        </Card>
      </div>
    )
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="max-w-xl mx-auto mt-12 space-y-8 ">
      
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            
            <AvatarFallback className="text-xl bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-3xl font-bold">{user.name}</CardTitle>
            <CardDescription className="text-base">{user.email}</CardDescription>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6 flex justify-end">
          
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </CardContent>
      </Card>

      {/* Security/Password Change Card */}
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>
            Update your account password. You will be logged out upon success.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {/* Current Password Field */}
            <div className="grid gap-2">
              <Label htmlFor="oldPassword">Current Password</Label>
              <Input
                id="oldPassword"
                type="password"
                placeholder="••••••••"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            {/* New Password Field */}
            <div className="grid gap-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            {/* Action and Message */}
            <div className="flex flex-col items-start gap-3">
              <Button onClick={handlePasswordChange}>Update Password</Button>
              {message && (
                <p
                  className={`text-sm ${
                    message.includes("success") ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {message}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}