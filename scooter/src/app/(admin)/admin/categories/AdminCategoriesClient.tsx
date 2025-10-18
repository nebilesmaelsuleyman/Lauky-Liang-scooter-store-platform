// src/app/admin/categories/AdminCategoriesClient.tsx

"use client";

import { CategoryWithCount } from "@/lib/services/catogories.service"; // Import the interface
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react"; 

// Define Props interface using the actual type
interface Props {
  initialCategories: CategoryWithCount[];
}

export default function AdminCategoriesClient({ initialCategories }: Props) {
  // Optional: Use state if you plan to enable filtering or client-side updates
  const [categories, setCategories] = useState(initialCategories);

  // You would define handlers for Edit and Delete here...
  const handleEdit = (categoryId: string) => {
    console.log("Edit category:", categoryId);
    // Logic to open modal/navigate
  };



async function handleDelete(slug: string) {
  try {
    const res = await fetch(`/api/categories/${slug}`, {
      method: "DELETE",
    });

    console.log("Response object:", res);

    if (!res.ok) {
      // Handle non-2xx HTTP responses
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData?.message || `Failed with status ${res.status}`);
    }

    const data = await res.json();

    if (data.success) {
      alert("Category deleted successfully!");
      setCategories((prev)=>prev.filter((cat)=>cat.slug !==slug))
    } else {
      alert("Failed to delete category: " + data.message);
    }
  } catch (error: any) {
    console.error("Error deleting category:", error);
    alert("An error occurred while deleting the category: " + error.message);
  }
}


  return (
    <Card>
      <CardContent className="p-6">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Products</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                // Use explicit type assertion for key
                <TableRow key={category._id as string}> 
                  <TableCell>
                    <div className="relative h-12 w-12 rounded-md overflow-hidden bg-muted">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="text-muted-foreground">{category.slug}</TableCell>
                  <TableCell className="max-w-md truncate">{category.description}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{category.productCount} products</Badge>
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
                          className="text-destructive"
                          onClick={() => handleDelete(category.slug as string)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}