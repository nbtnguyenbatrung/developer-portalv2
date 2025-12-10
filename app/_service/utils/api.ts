// utils/api.ts
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_MIS_BASE_URL, // ví dụ: "http://localhost:3000"
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor trước mỗi request
api.interceptors.request.use(
  async (config: any) => {
    const session = await getSession();
    const token = (session as any)?.accessToken;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// Wrapper nhỏ gọn cho các method
export async function callApi<T = any>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await api.request<T>({
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

export default api;
