// fileName: sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Key, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

// Cập nhật: Thêm prop 'onLinkClick'
export function Sidebar({
  isMobile,
  onLinkClick,
}: {
  isMobile?: boolean;
  onLinkClick?: () => void;
}) {
  const pathname = usePathname();
  const { t } = useLanguage();

  const sidebarItems = [
    // ... (Không đổi)
    {
      title: t('dashboard_api_key'),
      href: "/dashboard/api-keys",
      icon: Key,
    },
    {
      title: t('dashboard_setting'),
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <div className={cn({ "hidden md:block": !isMobile })}>
      <div
        className={cn(
          "pr-1 overflow-y-auto",
          { "sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12": !isMobile },
          { "py-4": isMobile }
        )}
      >
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                pathname === item.href
                  ? "bg-secondary"
                  : "hover:bg-transparent hover:text-normal hover:underline"
              )}
              asChild
            >
              <Link href={item.href} onClick={onLinkClick}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
