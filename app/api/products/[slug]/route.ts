import { validateRequest } from '@/lib/auth'
import connectDB from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import {Product} from "@/app/model/Product";
export async function GET(req: NextRequest, { params }: any) {
  const payload = await validateRequest(req)
  if (!payload)
    return NextResponse.json(
      { success: false, data: undefined, error: 'Unauthorized' },
      { status: 401 },
    )
  try {
    const product = await Product.findOne({ slug: params.slug })
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json(product)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: any) {
  const payload = await validateRequest(req)
  if (!payload)
    return NextResponse.json(
      { success: false, data: undefined, error: 'Unauthorized' },
      { status: 401 },
    )
  try {
    const body = await req.json()
    const product = await Product.findOneAndUpdate(
      { slug: params.slug },
      body,
      { new: true },
    )
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json(product)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

export async function DELETE(req: NextRequest, { params }: any) {
  const payload = await validateRequest(req)
  if (!payload)
    return NextResponse.json(
      { success: false, data: undefined, error: 'Unauthorized' },
      { status: 401 },
    )
  try {
    const product = await Product.findOneAndDelete({ slug: params.slug })
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Product deleted' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
