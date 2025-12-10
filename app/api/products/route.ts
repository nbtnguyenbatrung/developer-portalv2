import { validateRequest } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import {Product} from "@/app/model/Product";

export async function GET(req: NextRequest) {
  const payload = await validateRequest(req)
  if (!payload)
    return NextResponse.json(
      { success: false, data: undefined, error: 'Unauthorized' },
      { status: 401 },
    )
  try {
    const products = await Product.find()
    return NextResponse.json(products)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const payload = await validateRequest(req)
  if (!payload)
    return NextResponse.json(
      { success: false, data: undefined, error: 'Unauthorized' },
      { status: 401 },
    )
  try {
    const body = await req.json()
    const product = new Product(body)
    await product.save()
    return NextResponse.json(product, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
