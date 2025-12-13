"use client";

import apiPublic from "@/app/_service/utils/api-public";
import {useLocale} from "next-intl";

export function useApiPublic() {
    const locale = useLocale();

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
                "Accept-Language": locale,
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
