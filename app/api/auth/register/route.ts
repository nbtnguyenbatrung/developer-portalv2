// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import connectDB from '@/lib/db'
import { User } from '@/app/model/User'
import { USER_STATUS } from '@/app/constant/constant'

export async function POST(req: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await req.json()

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        {
          error: 'The request is malformed or missing required parameters',
        },
        { status: 400 },
      )
    }

    await connectDB()

    const isExistedUser = await User.findOne({
      email,
    })

    if (isExistedUser) {
      return NextResponse.json({ error: 'Existing user' }, { status: 400 })
    }

    // const generatedSecret = speakeasy.generateSecret({
    //   name: email,
    //   issuer: process.env.NEXT_APP_NAME || 'MIS Open Banking',
    // })

    const user = new User({
      email: email,
      password: bcrypt.hashSync(password, 10),
      firstName: firstName,
      lastName: lastName,
      fullName: `${firstName} ${lastName}`,
      status: USER_STATUS.ACTIVE,
      role: 'USER',
      twoFactorSecret: 'generatedSecret.base32',
    })

    const saved = await user.save()

    return NextResponse.json(
      {
        data: saved,
        success: true,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
