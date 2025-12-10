import { Application, IApplication } from '@/app/model/Application'
import connectDB from '@/lib/db'
import { QueryFilter } from 'mongoose'

export interface ApplicationDTO {
  applicationName: string
  client_id: string
  user: string
  client_secret: string
  plan: string
  environment: string
}

export const ApplicationRepo = {
  create,
  update,
  deleteApplication,
  getAll,
}

async function getAll(
  query: QueryFilter<IApplication> = {},
): Promise<IApplication[]> {
  await connectDB()

  return Application.find(query).populate(['user', 'plan']).exec()
}

async function create(data: ApplicationDTO) {
  await connectDB()
  const application = new Application({
    applicationName: data.applicationName,
    client_id: data.client_id,
    client_secret: data.client_secret,
    user: data.user,
    plan: data.plan,
    environment: data.environment,
  })

  await application.save()
}

async function update(
  data: Partial<ApplicationDTO>,
  id: string,
): Promise<IApplication | null> {
  await connectDB()
  return Application.findByIdAndUpdate(id, data, { new: true })
}

async function deleteApplication(id: string): Promise<{ success: boolean }> {
  await connectDB()
  await Application.findByIdAndDelete(id)
  return { success: true }
}
