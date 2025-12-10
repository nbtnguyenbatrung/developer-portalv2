import mongoose, { Document } from 'mongoose'

export interface DocVersion extends Document {
  id: string
  doc_id: string
  version: string
  md_content: string
  createdAt: Date
  updatedAt: Date
}

const DocVersionSchema = new mongoose.Schema<DocVersion>(
  {
    id: { type: String, required: true, unique: true },
    doc_id: { type: String, ref: 'Documentation', required: true },
    version: { type: String, required: true },
    md_content: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: true } },
)

DocVersionSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret: any) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  },
})

export const DocVersionModel =
  mongoose.models.DocVersion ||
  mongoose.model<DocVersion>('DocVersion', DocVersionSchema)
