import jwt from 'jsonwebtoken'
import connectDB from './db'
import { RevokedToken } from '@/app/model/RevokedToken'
import { NextRequest } from 'next/server'
import { getPrivateKey, getPublicKey } from './cert-utils'

const JWT_SIGN_KEY = process.env.NEXT_SIGN_KEY_ID
const VERIFY_KEY_ID = process.env.NEXT_VERIFY_KEY_ID
const TOKEN_EXPIRY = '24h'

export interface AuthPayload {
  userId: string
  email: string
  role?: string
  iat?: number
  exp?: number
}

export function generateToken(payload: AuthPayload): string {
  if (!JWT_SIGN_KEY) {
    throw new Error('Missing JWT_SIGN_KEY environment variable')
  }
  const signKey = getPrivateKey(JWT_SIGN_KEY)
  if (!signKey) {
    throw new Error('Sign key not found')
  }
  return jwt.sign(payload, signKey, {
    algorithm: 'PS256',
    expiresIn: TOKEN_EXPIRY,
  })
}

export function verifyToken(token: string): AuthPayload | null {
  try {
    if (!VERIFY_KEY_ID) {
      throw new Error('Missing VERIFY_KEY_ID environment variable')
    }
    const verifyKey = getPublicKey(VERIFY_KEY_ID)
    if (!verifyKey) {
      throw new Error('Sign key not found')
    }
    return jwt.verify(token, verifyKey, {
      algorithms: ['PS256'],
    }) as AuthPayload
  } catch (error) {
    return null
  }
}

export async function isTokenRevoked(token: string): Promise<boolean> {
  await connectDB()
  const revokedToken = await RevokedToken.findOne({ token })
  return !!revokedToken
}

export async function revokeToken(
  token: string,
  userId: string,
): Promise<boolean> {
  await connectDB()
  try {
    const payload = verifyToken(token)
    if (!payload) return false

    // Add token to revoked list
    await RevokedToken.create({
      token,
      userId,
      expiresAt: new Date(payload.exp! * 1000),
    })

    return true
  } catch (error) {
    return false
  }
}

export function extractTokenFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  return authHeader.substring(7)
}

export async function validateRequest(
  req: NextRequest,
): Promise<AuthPayload | null> {
  const token = extractTokenFromRequest(req)
  if (!token) return null

  // Check if token is valid
  const payload = verifyToken(token)
  if (!payload) return null

  // Check if token is revoked
  const revoked = await isTokenRevoked(token)
  if (revoked) return null

  return payload
}
