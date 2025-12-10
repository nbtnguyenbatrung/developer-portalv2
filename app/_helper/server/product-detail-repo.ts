import connectDB from '@/lib/db'
import {
  ProductDetail,
  ProductDetail as ProductDetailType,
} from '@/app/model/ProductDetailModel'

export const ProductDetailRepo = {
  getProductDetails,
  getProductDetailById,
  createProductDetail,
  updateProductDetail,
  deleteProductDetail,
}

async function getProductDetails(): Promise<ProductDetailType[]> {
  await connectDB()
  return ProductDetail.find()
}

async function getProductDetailById(
  id: string,
): Promise<ProductDetailType | null> {
  await connectDB()
  return ProductDetail.findById(id)
}

async function createProductDetail(
  data: Partial<ProductDetailType>,
): Promise<ProductDetailType> {
  await connectDB()
  const detail = new ProductDetail(data)
  return detail.save()
}

async function updateProductDetail(
  id: string,
  data: Partial<ProductDetailType>,
): Promise<ProductDetailType | null> {
  await connectDB()
  return ProductDetail.findByIdAndUpdate(id, data, { new: true })
}

async function deleteProductDetail(id: string): Promise<{ success: boolean }> {
  await connectDB()
  await ProductDetail.findByIdAndDelete(id)
  return { success: true }
}
