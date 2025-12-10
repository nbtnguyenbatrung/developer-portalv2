import mongoose, { Document, Model, Schema } from 'mongoose'

export interface IApplication extends Document {
  applicationName: string
  client_id: string
  client_secret: string
  plan: string
  user: string
  environment: string
  createAt: Date
  updateAt: Date
}

const ApplicationSchema: Schema<IApplication> = new Schema(
  {
    plan: { type: String, ref: 'Plan', required: true },
    user: { type: String, ref: 'User', required: true },
    applicationName: { type: String, required: true },
    environment: { type: String, required: true },
    client_id: { type: String, required: true, unique: true },
    client_secret: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: true } },
)

ApplicationSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret: any) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  },
})

export const Application: Model<IApplication> =
  mongoose.models.Application ||
  mongoose.model<IApplication>('Application', ApplicationSchema)
