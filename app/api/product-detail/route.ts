import { NextRequest, NextResponse } from 'next/server'
import { ProductDetailRepo } from '@/app/_helper/server'
import { validateRequest } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const payload = await validateRequest(req)
  if (!payload)
    return NextResponse.json(
      { success: false, data: undefined, error: 'Unauthorized' },
      { status: 401 },
    )
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (id) {
    const detail = await ProductDetailRepo.getProductDetailById(id)
    return NextResponse.json(detail)
  }
  const details = await ProductDetailRepo.getProductDetails()
  return NextResponse.json(details)
}

export async function POST(req: NextRequest) {
  const payload = await validateRequest(req)
  if (!payload)
    return NextResponse.json(
      { success: false, data: undefined, error: 'Unauthorized' },
      { status: 401 },
    )
  const body = await req.json()
  const detail = await ProductDetailRepo.createProductDetail(body)
  return NextResponse.json(detail)
}

export async function PUT(req: NextRequest) {
  const payload = await validateRequest(req)
  if (!payload)
    return NextResponse.json(
      { success: false, data: undefined, error: 'Unauthorized' },
      { status: 401 },
    )
  const body = await req.json()
  const { id, ...update } = body
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  const detail = await ProductDetailRepo.updateProductDetail(id, update)
  return NextResponse.json(detail)
}

export async function DELETE(req: NextRequest) {
  const payload = await validateRequest(req)
  if (!payload)
    return NextResponse.json(
      { success: false, data: undefined, error: 'Unauthorized' },
      { status: 401 },
    )
  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  await ProductDetailRepo.deleteProductDetail(id)
  return NextResponse.json({ success: true })
}
