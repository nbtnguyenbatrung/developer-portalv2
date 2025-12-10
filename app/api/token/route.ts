// src/app/api/token/route.ts
import { extractTokenFromRequest, revokeToken, validateRequest } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

// API để lấy thông tin token hiện tại
export async function GET(req: NextRequest) {
  try {
    const payload = await validateRequest(req)
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json({
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
      expiresAt: new Date(payload.exp! * 1000),
    })
  } catch (error) {
    console.error('Token validation error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

// API để thu hồi token của người dùng (chỉ admin)
export async function POST(req: NextRequest) {
  try {
    // Xác thực người dùng hiện tại
    const adminPayload = await validateRequest(req)
    if (!adminPayload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // // Kiểm tra quyền admin
    if (adminPayload.role && adminPayload.role.includes('admin')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Lấy thông tin từ body
    const { userId, token } = await req.json()

    if (!userId || !token) {
      return NextResponse.json(
        { error: 'Missing userId or token' },
        { status: 400 },
      )
    }

    // Thu hồi token
    const revoked = await revokeToken(token, userId)

    if (!revoked) {
      return NextResponse.json(
        { error: 'Invalid token or already revoked' },
        { status: 400 },
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Token revoked successfully',
    })
  } catch (error) {
    console.error('Token revocation error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

// API để người dùng tự thu hồi token của mình
export async function DELETE(req: NextRequest) {
  try {
    const payload = await validateRequest(req)
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = extractTokenFromRequest(req)
    if (!token) {
      return NextResponse.json({ error: 'Token not found' }, { status: 400 })
    }

    // Thu hồi token hiện tại của người dùng
    const revoked = await revokeToken(token, payload.userId)

    if (!revoked) {
      return NextResponse.json(
        { error: 'Failed to revoke token' },
        { status: 400 },
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Token revoked successfully',
    })
  } catch (error) {
    console.error('Token revocation error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
