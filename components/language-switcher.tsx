// fileName: language-switcher.tsx
"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import {useLocale} from "next-intl";
import {usePathname, useRouter} from "@/i18n/config";
import {translateSlug} from "@/app/_helper/utils/slugs";

// Thêm prop isMobile để điều chỉnh layout
export function LanguageSwitcher({ isMobile }: { isMobile?: boolean }) {
    const locale = useLocale();
    const router = useRouter();
    let pathname = usePathname();

    const handleChange = (newLocale: string) => {
        const parts = pathname.split("/").filter(Boolean);
        const slug = parts[2]; // vị trí slug: /vi/product/introduce/[SLUG]
        if (slug){
            const newSlug = translateSlug(slug, newLocale);
            pathname = pathname.replace(slug, newSlug);
        }
        router.replace(pathname, {locale: newLocale});
    };

  // --- Giao diện Mobile Nav ---
  if (isMobile) {
    return (
      <div className="flex items-center gap-2 w-full">
        <Button
          variant={locale === "en" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => handleChange("en")}
          className="w-full justify-center"
        >
          English
        </Button>
        <Button
          variant={locale === "vi" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => handleChange("vi")}
          className="w-full justify-center"
        >
          Tiếng Việt
        </Button>
      </div>
    )
  }

  // --- Giao diện Desktop (Dropdown) ---
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleChange("en")} className={locale === "en" ? "bg-accent" : ""}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChange("vi")} className={locale === "vi" ? "bg-accent" : ""}>
          Tiếng Việt
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
