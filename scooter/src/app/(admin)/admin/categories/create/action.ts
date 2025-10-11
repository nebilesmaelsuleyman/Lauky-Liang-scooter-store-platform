// src/app/admin/categories/create/actions.ts

'use server';

import { createCategory } from "@/lib/services/catogories.service";
import { redirect } from 'next/navigation';

export async function createCategoryAction(formData: FormData) {
  try {
    const data = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      image: formData.get('image') as string,
    };

    // Basic validation (can be replaced by a validation library like Zod)
    if (!data.name || !data.description) {
        throw new Error("Name and description are required.");
    }
    
    await createCategory(data);

    // Optional: Redirect to the main category listing page after success
    redirect('/admin/categories'); 

    // Return success status if not redirecting
    return { success: true }; 

  } catch (e) {
    console.error("Server Action Error:", e);
    // Return a detailed error object to the client component
    return { error: e instanceof Error ? e.message : "An unexpected error occurred." };
  }
}