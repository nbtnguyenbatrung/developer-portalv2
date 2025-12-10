import { NextRequest, NextResponse } from 'next/server'
import { validateRequest } from '@/lib/auth'
import { USER_ROLE } from '@/app/constant/constant'
import { ApplicationRepo } from '@/app/_helper/server/application-repo'

async function handleValidateRequest(req: NextRequest) {
  // const payload = await validateRequest(req)
  // if (payload && payload.role?.includes(USER_ROLE.ADM)) {
  //   return true
  // }

  return NextResponse.json(
    { success: false, data: undefined, error: 'Unauthorized' },
    { status: 401 },
  )
}
export async function POST(req: NextRequest) {
  //await handleValidateRequest(req)

  const body = await req.json()
  const doc = await ApplicationRepo.create(body)
  return NextResponse.json(doc)
}

export async function PUT(req: NextRequest) {
  await handleValidateRequest(req)
  const body = await req.json()
  const { id, ...update } = body
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  const doc = await ApplicationRepo.update(id, update)
  return NextResponse.json(doc)
}

export async function DELETE(req: NextRequest) {
  await handleValidateRequest(req)
  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  await ApplicationRepo.deleteApplication(id)
  return NextResponse.json({ success: true })
}
