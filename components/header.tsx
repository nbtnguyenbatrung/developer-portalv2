"use client";

import { LanguageSwitcher } from "@/components/language-switcher";
import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";
import { LogOut, Menu, Search, User, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import {useTranslations} from "use-intl";

const getLinkClass = (isActive: boolean, hasPathname: boolean = true) => {
  const baseClasses = "font-medium transition-colors duration-200 relative";

  const activeClasses = hasPathname
    ? "text-foreground font-semibold"
    : "text-foreground";

  const inactiveClasses = "text-foreground/60 hover:text-foreground/80";

  const underlineEffectClasses = `
    after:content-[''] 
    after:absolute 
    after:left-0 
    after:-bottom-1 
    after:h-[2px] 
    after:bg-primary 
    after:transition-all 
    after:duration-300 
    ${isActive ? "after:w-full" : "after:w-0"}
    hover:after:w-full
  `;

  if (isActive && hasPathname) {
    return cn(baseClasses, activeClasses, underlineEffectClasses);
  }

  return cn(baseClasses, inactiveClasses, underlineEffectClasses);
};

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const t = useTranslations("navigation")
  const tc = useTranslations("common")
  const router = useRouter();
  const pathname = usePathname();

  const handleScrollToContact = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const el = document.getElementById("footer");
    el?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-6 min-w-0">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">{tc("toggleMenu")}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <MobileNav closeSheet={() => setIsSheetOpen(false)} />
            </SheetContent>
          </Sheet>
          <Link href="/" className="hidden md:block">
            <Logo asLink={false} />
          </Link>
        </div>
        {/* Center: Menubar */}
        <nav className="hidden md:flex flex-1 justify-center gap-6 text-sm min-w-0">
          <Link href="/" className={getLinkClass(pathname === "/")}>
            {t("home")}
          </Link>
          <Link
            href="/product"
            className={getLinkClass(pathname.includes("/product"))}
          >
            {t("apiReference")}
          </Link>
          <Link
            href="#"
            onClick={handleScrollToContact}
            className={getLinkClass(false, false)}
          >
            {t("contactSupport")}
          </Link>
        </nav>

        <div className="flex items-center gap-2 justify-end min-w-0">
          <div
            className={cn("flex items-center", showSearch ? "block" : "hidden")}
          >
            <Input
              type="search"
              placeholder={tc("search")}
              className="h-9 md:w-[200px]"
            />
          </div>
          {showSearch ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSearch(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">{tc("closeSearch")}</span>
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSearch(true)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          {/* {session && <NotificationCenter />} */}
          <LanguageSwitcher />
          <ModeToggle />
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 hover:bg-primary/50 hover:text-normal"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {session?.user?.firstName?.charAt(0).toUpperCase() || ""}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-block">
                    {session?.user?.firstName! + session?.user?.lastName!}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{tc("myAccount")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/api-keys">
                    <User className="mr-2 h-4 w-4" />
                    {t("dashboard")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () => {
                    await signOut({ redirect: false });
                    router.push("/");
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">{t("login")}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

const getMobileLinkClass = (isActive: boolean) => {
  const baseClasses =
    "font-semibold text-base transition-colors duration-200 p-2 rounded-md";

  const activeClasses = "text-primary bg-primary/10";

  const inactiveClasses = "text-foreground hover:bg-muted";

  return cn(baseClasses, isActive ? activeClasses : inactiveClasses);
};

function MobileNav({ closeSheet }: { closeSheet: () => void }) {
  const t = useTranslations("navigation")
  const tc = useTranslations("common")
  const { data: session } = useSession();
  const router = useRouter();

  const pathname = usePathname();

  const handleScrollToContact = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const el = document.getElementById("footer");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLinkClick = () => {
    closeSheet();
  };
  return (
    // Thay đổi padding và thêm flex-col full height
    <div className="flex flex-col h-full">
      {/* 1. Phần Đầu: Logo */}
      <div className="p-4 border-b">
        <Link href="/" onClick={handleLinkClick}>
          <Logo asLink={false} />
        </Link>
      </div>

      <nav className="flex flex-col gap-1 p-4 flex-grow">
        <Link
          onClick={handleLinkClick}
          href="/"
          className={getMobileLinkClass(pathname === "/")}
        >
          {t("home")}
        </Link>
        <Link
          onClick={handleLinkClick}
          href="/product"
          className={getMobileLinkClass(pathname === "/product")}
        >
          {t("apiReference")}
        </Link>
        <Link
          href="#"
          onClick={(e) => {
            handleScrollToContact(e);
            handleLinkClick();
          }}
          className={getMobileLinkClass(false)}
        >
          {t("contactSupport")}
        </Link>
        <Separator className="mt-2 mb-2" />
        <div className="flex flex-col py-1">
          <span className="font-semibold text-sm mb-2 text-foreground/70">
            {tc("language")}
          </span>
          <LanguageSwitcher isMobile />
        </div>
        <div className="flex flex-col py-1">
          <span className="font-semibold text-sm mb-2 text-foreground/70">
            {tc("theme")}
          </span>
          <ModeToggle isMobile />
        </div>
      </nav>

      <div className="p-4 border-t">
        {session ? (
          <>
            <div className="flex items-center gap-3 py-2">
              <Avatar className="h-9 w-9 border-2 border-primary">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {session?.user?.firstName?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-bold text-sm">
                  {session?.user?.firstName} {session?.user?.lastName}
                </span>
                <Link
                  href="/dashboard/api-keys"
                  className="text-xs text-muted-foreground hover:text-primary"
                >
                  {t("dashboard")}
                </Link>
              </div>
            </div>
            <Button
              className="w-full hover:bg-red-600 font-semibold py-2 rounded-lg transition-colors"
              variant="outline"
              onClick={async () => {
                await signOut({ redirect: false });
                router.push("/");
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {t("logout")}
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" asChild className="w-full mb-2">
              <Link href="/login">{t("login")}</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
