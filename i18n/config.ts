import {createNavigation} from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const locales = ['en', 'vi'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'vi';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ["en", "vi"],

    // Used when no locale matches
    defaultLocale: "vi",

    // Optional: adds locale to URL (recommended)
    localePrefix: "as-needed",
});

export const {Link, redirect, usePathname, useRouter} =
    createNavigation(routing);
