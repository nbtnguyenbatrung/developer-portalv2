import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IDocumentation extends Document {
  id: string
  product_id: string
  slug: string
  title: string
  current_version: string
  create_by: string
  change_log: string
  createdAt: Date
  updatedAt: Date
}

const DocSchema: Schema<IDocumentation> = new Schema(
  {
    id: { type: String, required: true, unique: true },
    product_id: { type: String, ref: 'Product', required: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    current_version: { type: String, required: true },
    create_by: { type: String, required: true },
    change_log: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: true } },
)

DocSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret: any) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  },
})

export const Documentation: Model<IDocumentation> =
  mongoose.models.Documentation || mongoose.model<IDocumentation>('Documentation', DocSchema)
