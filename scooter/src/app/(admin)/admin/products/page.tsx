import ProductTable from './components/ProductTable'
import connectDb  from '@/lib/db/mongodb'
import  Product  from '@/lib/models/productModel'
import { ObjectId } from 'mongoose'; // <-- Import ObjectId for proper typing

// Define the interface for the raw data coming from Mongoose .lean()
interface RawProduct {
  _id: ObjectId; // Mongoose ObjectId type before formatting
  name: string;
  description: string;
  price: number;
  maxSpeed: number;
  __v: number;
}

// Define the interface for the formatted data you pass to the component


export interface FormattedProduct {
  _id: string; // String after conversion
  name: string;
  description: string;
  price: number;
  maxSpeed: number;
  __v: number;
}

export default async function AdminProductsPage() {
    await connectDb()
    
    // Use the RawProduct interface with .lean()
    const products = await Product.find().lean<RawProduct[]>() 
    
    const formattedProducts: FormattedProduct[] = products.map(p => ({
        // Fix: Simply call .toString() on the ObjectId
        _id: p._id.toString(), 
        name: p.name ?? '',
        description: p.description ?? '',
        price: p.price ?? 0,
        maxSpeed: p.maxSpeed ?? 0,
        __v: p.__v ?? 0,
    }))

    return (
        <div className="p-10  min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-8">Product Listing</h1>
            <ProductTable initialProducts={formattedProducts} />
        </div>
    )
}