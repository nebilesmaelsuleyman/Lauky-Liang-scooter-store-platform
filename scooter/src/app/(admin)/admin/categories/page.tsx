// src/app/admin/categories/page.tsx

import { getAdminCategoriesWithCount } from "@/lib/services/catogories.service";
import AdminCategoriesClient from "./AdminCategoriesClient";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from 'next/link'
// This is a Server Component. It fetches data.

// ...
export default async function AdminCategoriesPageWrapper() {
  // Fetch data from the database
  const categoriesWithCount = await getAdminCategoriesWithCount();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold mb-2">Categories</h1>
          <p className="text-muted-foreground">Manage product categories</p>
        </div>
         <Button asChild> 
          <Link href="/admin/categories/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Link>
         </Button> {/* ⬅️ MISSING CLOSING TAG ADDED HERE */}
      </div>

      {/* Pass the fully loaded, serializable data to the Client Component */}
      <AdminCategoriesClient initialCategories={categoriesWithCount} />
    </div>
  );
}