"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
// REMOVED: import { Checkbox } from "@/components/ui/checkbox" 
import Link from "next/link"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react';
import { Loader2 , Eye, EyeOff } from "lucide-react" // Import for the loading icon

// FIX 1: Remove 'async' from the component function signature.
// Client components must be synchronous.
export default function SignupPage() { 
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword]= useState(false)



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

   
    if (!formData.name || !formData.email || !formData.password) {
        setError("All fields are required.");
        return;
    }

    console.log("Signup attempt:", formData)
    setLoading(true)
    setError('')
    
    try {
      // API call is correctly placed here, inside the submit handler
      const res = await fetch('/api/auth/signUp', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Signup failed");
        // No need for setLoading(false) here, as it's in the finally block
        return
      }

      // Automatically sign in the user after successful registration
      const signInRes = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password
      })

      if (!signInRes?.error) {
        router.push('/') // Success: Redirect to home
      } else {
        // Fallback: If sign-in failed, redirect to the login page
        setError("Account created, but automatic login failed. Please sign in.");
        router.push('/auth/login') // Assuming /auth/login is your sign-in page
      }

    } catch (error) {
      console.error('Signup error:', error);
      setError("A network error occurred. Please try again.");
    } finally {
      setLoading(false)
    }

  }
  const togglePasswordVisibility =()=>{
    setShowPassword(prev =>!prev);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-4"> {/* Adjusted padding */}
          <Link href="/" className="mx-auto mb-3 inline-block"> {/* Adjusted margin */}
            <span className="font-serif text-3xl font-bold">Lucky Liang</span>
          </Link>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>
            Sign up to start shopping for premium scooters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6"> {/* Increased vertical space */}
            
            {/* Full Name Input */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name" // Added name attribute for clarity
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                required
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email" // Added name attribute
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative"><Input
                id="password"
                name="password" // Added name attribute
                type={showPassword ? "text":"password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="pr-20"
              />

               <button type="button" 
            onClick={togglePasswordVisibility} 
            className='absolute inset-y-0 flex items-center right-0 pr-3 text-gray-400 hover:text-gray-700 focus:outline-none'
            aria-label={showPassword ? "Hide Password":"show password"}
          
            >{showPassword ? <EyeOff className='h-5 w-5'/>: <Eye className="h-5 w-5" />}</button>
            </div>

              </div>
              
           
            <Button type="submit" className="w-full h-10" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="relative my-8"> {/* Increased margin */}
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
              OR
            </span>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-accent hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}