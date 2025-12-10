// app/api/users/route.ts

import { CreateUserDTO, userRepo } from '@/app/_helper/server'
import { validateRequest } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/users
export async function GET(req: NextRequest) {
  const payload = await validateRequest(req)
  if (!payload)
    return NextResponse.json(
      { success: false, data: undefined, error: 'Unauthorized' },
      { status: 401 },
    )
  const list = await userRepo.findAll()
  return NextResponse.json({ success: true, data: list }, { status: 200 })
}

// POST /api/users
export async function POST(req: NextRequest) {
  const payload = await validateRequest(req)
  if (!payload)
    return NextResponse.json(
      { success: false, data: undefined, error: 'Unauthorized' },
      { status: 401 },
    )

  const body = (await req.json()) as CreateUserDTO
  // Basic validation
  if (!body.email || !body.firstName || !body.lastName || !body.password) {
    return NextResponse.json(
      { success: false, data: undefined, error: 'Missing required fields' },
      { status: 400 },
    )
  }
  try {
    const user = await userRepo.create(body)
    return NextResponse.json({ success: true, data: user }, { status: 201 })
  } catch (e: any) {
    console.error('[POST] /api/users error:', e)
    return NextResponse.json(
      {
        success: false,
        data: undefined,
        error: e.message || 'Error creating user',
      },
      { status: 500 },
    )
  }
}
