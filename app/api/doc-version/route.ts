import { NextRequest, NextResponse } from 'next/server'
import { DocVersionRepo } from '@/app/_helper/server'
import { validateRequest } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const payload = await validateRequest(req)
  if (!payload)
    return NextResponse.json(
      { success: false, data: undefined, error: 'unauthorized' },
      { status: 401 },
    )
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (id) {
    const docVersion = await DocVersionRepo.getDocVersionById(id)
    return NextResponse.json(docVersion)
  }
  const docVersions = await DocVersionRepo.getDocVersions()
  return NextResponse.json(docVersions)
}

export async function POST(req: NextRequest) {
  const payload = await validateRequest(req)
  if (!payload)
    return NextResponse.json(
      { success: false, data: undefined, error: 'Unauthorized' },
      { status: 401 },
    )
  const body = await req.json()
  const docVersion = await DocVersionRepo.createDocVersion(body)
  return NextResponse.json(docVersion)
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
  const docVersion = await DocVersionRepo.updateDocVersion(id, update)
  return NextResponse.json(docVersion)
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
  await DocVersionRepo.deleteDocVersion(id)
  return NextResponse.json({ success: true })
}
