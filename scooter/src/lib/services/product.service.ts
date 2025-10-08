import Product ,{Product as ProductType } from '@/lib/models/productModel'

// get all products
export async function getAllproducts():Promise<ProductType[]>{
    return await Product.find({isActive:true})
}

export async function createProduct(data: Partial<ProductType>): Promise<ProductType> {
  const product = new Product(data)
  return await product.save()
}
export async function updateProduct(id: string, data: Partial<ProductType>): Promise<ProductType | null> {
  return await Product.findByIdAndUpdate(id, data, { new: true }).exec()
}

export async function deleteProduct(id: string): Promise<ProductType | null> {
  return await Product.findByIdAndDelete(id).exec()
}
export async function getProductById(id:string){
    return await Product.findById(id)
}