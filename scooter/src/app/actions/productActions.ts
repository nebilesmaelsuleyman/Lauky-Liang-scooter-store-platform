'use client'

export const deleteProduct = async (id: string) => {
  const res = await fetch(`/api/products/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error('Failed to delete product')
  }

  return res.json()
}
