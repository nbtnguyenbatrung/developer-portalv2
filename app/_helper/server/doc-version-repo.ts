import  connectDB  from '@/lib/db'
import { DocVersionModel, DocVersion } from '@/app/model/DocVersion'

export const DocVersionRepo = {
  getDocVersions,
  getDocVersionById,
  createDocVersion,
  updateDocVersion,
  deleteDocVersion,
}
async function getDocVersions(): Promise<DocVersion[]> {
  await connectDB()
  return DocVersionModel.find()
}
async function getDocVersionById(id: string): Promise<DocVersion | null> {
  await connectDB()
  return DocVersionModel.findById(id)
}
async function createDocVersion(
  data: Partial<DocVersion>,
): Promise<DocVersion> {
  await connectDB()
  const docVersion = new DocVersionModel(data)
  return docVersion.save()
}
async function updateDocVersion(
  id: string,
  data: Partial<DocVersion>,
): Promise<DocVersion | null> {
  await connectDB()
  return DocVersionModel.findByIdAndUpdate(id, data, { new: true })
}
async function deleteDocVersion(id: string): Promise<{ success: boolean }> {
  await connectDB()
  await DocVersionModel.findByIdAndDelete(id)
  return { success: true }
}
