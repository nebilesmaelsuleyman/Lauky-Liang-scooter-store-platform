import {NextResponse} from 'next/server'
import {getProductById, updateProduct,deleteProduct} from '@/lib/services/product.service'
import connectDB from "@/lib/db/connectDB";


export async function GET(
  request:Request, context:{params:Promise<{id:string}>}
){
  try{
    const {id}= await context.params
    const data = await getProductById(id);
    if(!data) return NextResponse.json({ message: "Product not found" }, { status: 404 })
      return NextResponse.json(data)
  }catch(error){
    console.error(error)
    return NextResponse.json({message:
       "Internal Server Error" }, { status: 500 
    })
  }
}
export async function PATCH (request:Request, context:{params:Promise<{id:string }>}){

  try{
    const {id}= await context.params 
    const updateData = await request.json()

    const response= await updateProduct(id, updateData)
    return response
  }catch(error){
    console.error("Error in updating products",error)
    return NextResponse.json({message:"failed to update product"},{status:500})

  }

}

export async function DELETE(request:Request, context:{params:Promise<{id:string }>}){
  
  try{ const {id} = await context.params
  const deletedProduct= await deleteProduct(id)
  return   NextResponse.json(deletedProduct,{status:204})
}
  catch(error){
    return NextResponse.json({message:"failed to delete product"},{status:500})
  }
 
}

