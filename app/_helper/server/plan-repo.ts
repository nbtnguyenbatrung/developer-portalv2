import { IPlan, Plan } from '@/app/model/Plan'
import connectDB from '@/lib/db'
import { QueryFilter } from 'mongoose'

export interface PlanDTO {
  planName: string
  quota: string
  quotaPeriod: string
}

export const PlanRepo = {
  create,
  update,
  deleteApplication: deletePlan,
  getAll,
}

async function getAll(query: QueryFilter<IPlan> = {}): Promise<IPlan[]> {
  await connectDB()
  return Plan.find(query)
}
async function create(data: PlanDTO) {
  await connectDB()
  const plan = new Plan({
    planName: data.planName,
    quota: data.quota,
    quotaPeriod: data.quotaPeriod,
  })

  await plan.save()
}

async function update(
  data: Partial<PlanDTO>,
  id: string,
): Promise<IPlan | null> {
  await connectDB()
  return Plan.findByIdAndUpdate(id, data, { new: true })
}

async function deletePlan(id: string): Promise<{ success: boolean }> {
  await connectDB()
  await Plan.findByIdAndDelete(id)
  return { success: true }
}
