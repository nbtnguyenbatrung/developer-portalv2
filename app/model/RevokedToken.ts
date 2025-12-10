// src/models/RevokedToken.ts
import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IRevokedToken extends Document {
  token: string
  userId: string
  expiresAt: Date
  revokedAt: Date
}

const RevokedTokenSchema = new Schema<IRevokedToken>({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
    index: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    expires: 0,
  },
  revokedAt: {
    type: Date,
    default: Date.now,
  },
})

let RevokedToken: Model<IRevokedToken>

try {
  // Try to get existing model
  RevokedToken = mongoose.model<IRevokedToken>('RevokedToken')
} catch {
  // Define model if it doesn't exist
  RevokedToken = mongoose.model<IRevokedToken>(
    'RevokedToken',
    RevokedTokenSchema
  )
}

export { RevokedToken }
