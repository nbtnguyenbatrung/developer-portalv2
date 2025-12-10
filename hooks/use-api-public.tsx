"use client";

import { useLanguage } from "@/contexts/language-context";
import apiPublic from "@/app/_service/utils/api-public";

export function useApiPublic() {
    const { language } = useLanguage();

    const call = async <T = any>(
        method: "get" | "post" | "put" | "delete",
        url: string,
        data?: any,
        config: any = {}
    ): Promise<T> => {
        const finalConfig = {
            ...config,
            headers: {
                ...(config?.headers || {}),
                "Accept-Language": language,
            }
        };

        const res = await apiPublic.request<T>({
            method,
            url,
            data,
            ...finalConfig,
        });

        return res.data;
    };

    return { call };
}
