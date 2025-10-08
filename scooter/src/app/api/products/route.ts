import {NextResponse} from 'next/server'
import {getAllproducts,createProduct} from '@/lib/services/product.service'

export async function GET(){
    try{
        const products= await getAllproducts()
        return NextResponse.json(products)
    }catch(error){
        console.error('get products error',error)

    }
}

export async function POST(request:Request){
    try{
        const body = await request.json()
        const product = await createProduct(body)
        return NextResponse.json(product,{status:201})
    }catch(error){
        console.error('create products showing error',error)
        return NextResponse.json({error:"failed to create product"},{status:500})
    }
}