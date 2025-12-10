// utils/api.ts
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const apiPublic: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_MIS_BASE_URL, // ví dụ: "http://localhost:3000"
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "vi"
  },
});

// Wrapper nhỏ gọn cho các method
export async function callApiPublic<T = any>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await apiPublic.request<T>({
      method,
      url,
      data,
      ...config,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default apiPublic;
