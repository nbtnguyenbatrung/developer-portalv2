
"use client";

import {useLocale} from "next-intl";
import api from "@/app/_service/utils/api";

export function useApi() {
    const locale = useLocale();

    const callApi = async <T = any>(
        method: "get" | "post" | "put" | "delete",
        url: string,
        data?: any,
        config: any = {}
    ): Promise<T> => {
        const finalConfig = {
            ...config,
            headers: {
                ...(config?.headers || {}),
                "Accept-Language": locale,
            }
        };

        const res = await api.request<T>({
            method,
            url,
            data,
            ...finalConfig,
        });

        return res.data;
    };

    return { callApi };
}
