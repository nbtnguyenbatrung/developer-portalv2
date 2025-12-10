import mongoose, { Document } from 'mongoose'

export interface ProductDetail extends Document {
  id: string
  content: string
  imageUrl: string
  createdAt: Date
  updatedAt: Date
}

const ProductDetailSchema = new mongoose.Schema<ProductDetail>(
  {
    id: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    imageUrl: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: true } },
)

ProductDetailSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret: any) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  },
})
export const ProductDetail =
  mongoose.models.ProductDetail ||
  mongoose.model<ProductDetail>('ProductDetail', ProductDetailSchema)
