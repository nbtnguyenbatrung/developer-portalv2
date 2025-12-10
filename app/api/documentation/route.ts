import { NextRequest, NextResponse } from 'next/server'
import { DocumentationRepo } from '@/app/_helper/server'
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
    const doc = await DocumentationRepo.getDocumentationById(id)
    return NextResponse.json(doc)
  }
  const docs = await DocumentationRepo.getDocumentations()
  return NextResponse.json(docs)
}

export async function POST(req: NextRequest) {
  const payload = await validateRequest(req)
  if (!payload)
    return NextResponse.json(
      { success: false, data: undefined, error: 'Unauthorized' },
      { status: 401 },
    )
  const body = await req.json()
  const doc = await DocumentationRepo.createDocumentation(body)
  return NextResponse.json(doc)
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
  const doc = await DocumentationRepo.updateDocumentation(id, update)
  return NextResponse.json(doc)
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
  await DocumentationRepo.deleteDocumentation(id)
  return NextResponse.json({ success: true })
}
