// fileName: mode-toggle.tsx
"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils"; // Giả sử cn được import

// Thêm prop isMobile để điều chỉnh layout
export function ModeToggle({ isMobile }: { isMobile?: boolean }) {
  const { theme, setTheme } = useTheme();

  // --- Giao diện Mobile Nav ---
  // Trong mode-toggle.tsx
  if (isMobile) {
    return (
      // **Đã thay đổi: Sử dụng flex-col để các nút xếp chồng lên nhau theo chiều dọc.**
      <div className="flex flex-col gap-2">
        <Button
          variant={theme === "light" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setTheme("light")}
          className="w-full justify-start" // **Đã thay đổi: justify-start để căn lề trái, hợp với layout mobile nav**
        >
          <Sun className="h-4 w-4 mr-2" />
          Light
        </Button>
        <Button
          variant={theme === "dark" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setTheme("dark")}
          className="w-full justify-start" // **Đã thay đổi: justify-start**
        >
          <Moon className="h-4 w-4 mr-2" />
          Dark
        </Button>
        <Button
          variant={theme === "system" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setTheme("system")}
          className="w-full justify-start" // **Đã thay đổi: justify-start**
        >
          System
        </Button>
      </div>
    );
  }

  // --- Giao diện Desktop (Dropdown) ---
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
