"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, Loader2, Key, Ban } from "lucide-react" 
import { useState, useEffect, useMemo } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useConfirm } from "@/components/use-confirm" 

type UserRole = "user" | "admin";

interface Customer {
  _id: string
  name: string
  email: string
  provider: "credentials" | "google" | "github"
  role: UserRole
  createdAt: string
}


export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const confirm = useConfirm() 


  const fetchCustomers = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/user")
      if (!response.ok) throw new Error("Failed to fetch user data.")
      
      const data: Customer[] = await response.json() 
      setCustomers(data)
    } catch (error) {
      console.error("Fetch Error:", error)
      toast.error("Could not load user data.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [])


  const handleChangeRole = async (userId: string, currentRole: UserRole) => {
    const newRole: UserRole = currentRole === "admin" ? "user" : "admin"
    const actionVerb = newRole === "admin" ? "Promote" : "Demote"

  
    const isConfirmed = await confirm(
      `${actionVerb} User Role`,
      `Are you sure you want to change this user's role from '${currentRole}' to '${newRole}'?`,
      
      `${actionVerb} Now`, 
      'default' 
    )

    if (!isConfirmed) {
      toast.error("Role change cancelled.")
      return
    }

  
    const loadingToast = toast.loading(`Updating role to '${newRole}'...`)
    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      })

      if (!response.ok) {
        throw new Error(`Failed to update role. Status: ${response.status}`)
      }

     
      setCustomers(prev => 
        prev.map(user => 
          user._id === userId ? { ...user, role: newRole } : user
        )
      )
      
      toast.success(`User successfully ${actionVerb.toLowerCase()}d to ${newRole}.`, { id: loadingToast })

    } catch (error) {
      console.error("Role Update Error:", error)
      toast.error("Failed to change user role. Please try again.", { id: loadingToast })
    }
  }


  const totalUsers = customers.length
  const adminUsers = customers.filter((c) => c.role === "admin").length
  const regularUsers = totalUsers - adminUsers

 
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <p className="text-lg text-muted-foreground">Loading Users...</p>
      </div>
    )
  }

  
  return (
    <div className="space-y-6">
      <Toaster position="bottom-center" />
      <div>
        <h1 className="font-serif text-3xl font-bold mb-2">User Management</h1>
        <p className="text-muted-foreground">Manage user accounts and administrative roles</p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Total Users</p>
            <p className="text-2xl font-bold">{totalUsers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Admin Accounts</p>
            <p className="text-2xl font-bold">{adminUsers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Standard Users</p>
            <p className="text-2xl font-bold">{regularUsers}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
   
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead> {/* Renamed TableHead */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                      No users found.
                    </TableCell>
                  </TableRow>
                ) : (
                  customers.map((customer) => (
                    <TableRow key={customer._id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">{customer.email}</p>
                        </div>
                      </TableCell>
                      
                   
                      <TableCell>
                         <Badge variant={customer.role === "admin" ? "default" : "outline"} className="capitalize">
                            {customer.role}
                        </Badge>
                      </TableCell>

                      
                      <TableCell>
                        <Badge variant="secondary" className="capitalize">
                            {customer.provider}
                        </Badge>
                      </TableCell>


                      <TableCell>
                        {new Date(customer.createdAt).toLocaleDateString()}
                      </TableCell>


                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">

                            <DropdownMenuItem
                              onClick={() => handleChangeRole(customer._id, customer.role)}
                            >
                              <Key className="mr-2 h-4 w-4" />
                              {customer.role === "admin" ? "Demote to User" : "Promote to Admin"}
                            </DropdownMenuItem>

                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}