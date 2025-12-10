import mongoose, { Document } from 'mongoose'

export interface Product {
  id: string
  title: string
  subTitle: string
  slug: string
  content: string
  summary: string
  name: string
  active: boolean
  featured: boolean
  priority: number
  imageUrl: string
  createdAt: Date
  updatedAt: Date
  badge: string | null
  features: string[]
}
export interface IProduct extends Document {
  id: string
  title: string
  subTitle: string
  slug: string
  content: string
  summary: string
  name: string
  active: boolean
  featured: boolean
  priority: number
  imageUrl: string
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new mongoose.Schema<IProduct>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    subTitle: { type: String },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    summary: { type: String },
    name: { type: String, required: true },
    active: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    priority: { type: Number, default: 0 },
    imageUrl: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: true } },
)

ProductSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret: any) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  },
})

export const Product =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)
