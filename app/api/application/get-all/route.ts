import { ApplicationRepo } from '@/app/_helper/server/application-repo'
import { validateRequest } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const payload = await validateRequest(req)
  if (!payload)
    return NextResponse.json(
      { success: false, data: undefined, error: 'Unauthorized' },
      { status: 401 },
    )

  const body = await req.json()
  const query =  body.query 
  console.log('query :>> ', query);
  const doc = await ApplicationRepo.getAll(query)
  return NextResponse.json(doc)
}
