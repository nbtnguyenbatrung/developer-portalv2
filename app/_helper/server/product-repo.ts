import { IProduct, Product } from '@/app/model/Product'
import connectDB from '@/lib/db'

export async function getProducts(): Promise<IProduct[]> {
  await connectDB()
  return Product.find()
}

export async function getProductById(id: string): Promise<IProduct | null> {
  await connectDB()
  return Product.findById(id)
}

export async function createProduct(
  data: Partial<IProduct>,
): Promise<IProduct> {
  await connectDB()
  const product = new Product(data)
  return product.save()
}

export async function updateProduct(
  id: string,
  data: Partial<IProduct>,
): Promise<IProduct | null> {
  await connectDB()
  return Product.findByIdAndUpdate(id, data, { new: true })
}

export async function deleteProduct(id: string): Promise<{ success: boolean }> {
  await connectDB()
  await Product.findByIdAndDelete(id)
  return { success: true }
}
