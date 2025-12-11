// fileName: language-switcher.tsx
"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { cn } from '@/lib/utils' // Giả sử cn được import

// Thêm prop isMobile để điều chỉnh layout
export function LanguageSwitcher({ isMobile }: { isMobile?: boolean }) {
  const { language, setLanguage } = useLanguage()

  // --- Giao diện Mobile Nav ---
  if (isMobile) {
    return (
      <div className="flex items-center gap-2 w-full">
        <Button
          variant={language === "en" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setLanguage("en")}
          className="w-full justify-center"
        >
          English
        </Button>
        <Button
          variant={language === "vi" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setLanguage("vi")}
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
        <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "bg-accent" : ""}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("vi")} className={language === "vi" ? "bg-accent" : ""}>
          Tiếng Việt
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}