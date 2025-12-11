// fileName: MobileSidebarToggle.tsx
"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/dashboard/sidebar";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";

export function MobileSidebarToggle() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { t } = useLanguage();

  const handleLinkClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="md:hidden">
      {/* Nút Toggle Sidebar */}
      <div className="py-4 px-4 border-b">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="w-full justify-start"
        >
          {isSidebarOpen ? (
            <X className="mr-2 h-4 w-4" />
          ) : (
            <Menu className="mr-2 h-4 w-4" />
          )}
          {isSidebarOpen
            ? t("dashboard_side_bar_close_menu")
            : t("dashboard_side_bar_open_menu")}
        </Button>
      </div>

      <div
        className={cn(
          "px-4 transition-all duration-300 ease-in-out overflow-hidden",
          isSidebarOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <Sidebar isMobile onLinkClick={handleLinkClick} />
      </div>
    </div>
  );
}
