import connectDB from '@/lib/db'
import {Documentation, IDocumentation } from '@/app/model/DocModel'

export const DocumentationRepo = {
  getDocumentations,
  getDocumentationById,
  createDocumentation,
  updateDocumentation,
  deleteDocumentation,
}

async function getDocumentations(): Promise<IDocumentation[]> {
  await connectDB()
  return Documentation.find()
}

async function getDocumentationById(
  id: string,
): Promise<IDocumentation | null> {
  await connectDB()
  return Documentation.findById(id)
}

// async function getDocumentationBySlug(
//   slug: string,
// ): Promise<IDocumentation | null> {
//   await connectDB()
//   const query = { slug }
//   return Documentation.find(query).exec()
// }

async function createDocumentation(
  data: Partial<IDocumentation>,
): Promise<IDocumentation> {
  await connectDB()
  const doc = new Documentation(data)
  return doc.save()
}

async function updateDocumentation(
  id: string,
  data: Partial<IDocumentation>,
): Promise<IDocumentation | null> {
  await connectDB()
  return Documentation.findByIdAndUpdate(id, data, { new: true })
}

async function deleteDocumentation(id: string): Promise<{ success: boolean }> {
  await connectDB()
  await Documentation.findByIdAndDelete(id)
  return { success: true }
}
