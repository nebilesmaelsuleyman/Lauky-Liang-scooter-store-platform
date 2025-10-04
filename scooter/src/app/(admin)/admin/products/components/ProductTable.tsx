'use client'

import { Table, TableHeader, TableRow, TableHead, TableBody } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Edit, Trash2 } from 'lucide-react'
import { deleteProduct } from '@/app/actions/productActions'
import { useState } from 'react'

interface Product {
  _id: string
  name: string
  description: string
  price: number
  maxSpeed: number
}

interface Props {
  initialProducts: Product[]
}

export default function ProductTable({ initialProducts }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts)

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      await deleteProduct(id)
      setProducts(products.filter(p => p._id !== id))
    } catch (err) {
      console.error(err)
      alert('Failed to delete product')
    }
  }

return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Max Speed</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map(product => (
          <TableRow key={product._id}>
            <td className="p-4">{product.name}</td>
            <td className="p-4">{product.description}</td>
            <td className="p-4">${product.price.toFixed(2)}</td>
            <td className="p-4">{product.maxSpeed} km/h</td>
            <td className="p-4 flex space-x-2">
              <Button variant="outline" size='sm'>
                <Edit size={16} />
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(product._id)}>
                <Trash2 size={16} />
              </Button>
            </td>
          </TableRow>
        ))}
      </TableBody>
    </Table>
)

  }