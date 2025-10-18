// src/app/(admin)/admin/products/edit/[id]/page.tsx
import EditProductForm from "../EditProducts"

interface Props {
  params: { id: string }
}

export default async function Page({ params }: Props) {
  // Fetch product data
  const productRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${params.id}`)
  const product = await productRes.json()

  // Fetch categories
  const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`)
  const categoriesData = await categoriesRes.json()
  const categoryList = categoriesData.categories || categoriesData

  return <EditProductForm product={product} categories={categoryList} />
}
