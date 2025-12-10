import mongoose, { Document, Model, Schema } from 'mongoose'

export interface IPlan extends Document {
  planName: string
  quota: string
  quotaPeriod: string
  createAt: Date
  updateAt: Date
}

const PlanSchema: Schema<IPlan> = new Schema(
  {
    planName: { type: String, required: true },
    quota: { type: String, required: true, unique: true },
    quotaPeriod: { type: String, required: true },
  },
  { timestamps: true }
)

PlanSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret: any) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  },
})

export const Plan: Model<IPlan> =
  mongoose.models.Plan || mongoose.model<IPlan>('Plan', PlanSchema)
