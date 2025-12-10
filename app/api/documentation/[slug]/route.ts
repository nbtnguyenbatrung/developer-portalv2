import { DocumentationRepo } from '@/app/_helper/server'
import { validateRequest } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const payload = await validateRequest(req)
  if (!payload)
    return NextResponse.json(
      { success: false, data: undefined, error: 'Unauthorized' },
      { status: 401 },
    )
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')
  if (slug) {
    const doc = await DocumentationRepo.getDocumentationById(slug)
    return NextResponse.json(doc)
  }
  const docs = await DocumentationRepo.getDocumentations()
  return NextResponse.json(docs)
}
