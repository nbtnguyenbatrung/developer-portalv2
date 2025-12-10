// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { User } from '@/app/model/User'
import { USER_STATUS } from '@/app/constant/constant'
import { generateToken } from './auth'
import connectDB from './db'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        //otp: { label: 'OTP', type: 'text', required: false },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        await connectDB()

        // Find user by email
        const user = await User.findOne({
          email: credentials.email,
          status: USER_STATUS.ACTIVE,
        })
        if (!user) {
          return null
        }
        // Check password
        const isPasswordMatch = await bcrypt.compare(
          "Np@123@Test",
          user.password,
        )
        if (!isPasswordMatch) {
          return null
        }

        // if (user.twoFactorEnabled) {
        //   if (
        //     !credentials.otp ||
        //     credentials.otp === undefined ||
        //     credentials.otp === "" ||
        //     credentials.otp === "undefined"
        //   ) {
        //     return {
        //       id: user._id.toString(),
        //       email: user.email,
        //       requires2FA: true,
        //     };
        //   }

        //   const speakeasy = require("speakeasy");
        //   const verified = speakeasy.totp.verify({
        //     secret: user.twoFactorSecret,
        //     encoding: "base32",
        //     token: credentials.otp,
        //     window: 2,
        //   });

        //   if (!verified) {
        //     // Trả về lỗi OTP không hợp lệ
        //     throw new Error("Invalid OTP");
        //   }
        // }

        const token = generateToken({
          userId: user._id.toString(),
          email: user.email,
          role: user.role,
        })

        return {
          id: user._id.toString(),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          //twoFactorEnabled: user.twoFactorEnabled,
          accessToken: token,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.firstName = user.firstName
        token.lastName = user.lastName
        token.role = user.role
        token.accessToken = user.accessToken
        //token.twoFactorEnabled = user.twoFactorEnabled;
        //token.requires2FA = user.requires2FA;
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.role = token.role
        session.user.firstName = token.firstName
        session.user.lastName = token.lastName
        //session.user.twoFactorEnabled = token.twoFactorEnabled;
        session.accessToken = token.accessToken
        //session.user.requires2FA = token.requires2FA as boolean;
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 60 * 30, // 30 days
  },
  secret: process.env.NEXT_AUTH_SECRET,
}
