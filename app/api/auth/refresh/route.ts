// src/app/api/auth/refresh/route.ts
import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import { User } from '@/app/model/User'
import { generateToken, validateRequest } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    // Xác thực token hiện tại
    const payload = await validateRequest(req)
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    // Kiểm tra xem người dùng có tồn tại không
    const user = await User.findById(payload.userId)
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Tạo token mới
    const newToken = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    })

    return NextResponse.json({
      token: newToken,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Token refresh error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
