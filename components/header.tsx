'use client'

import { LanguageSwitcher } from '@/components/language-switcher'
import { Logo } from '@/components/logo'
import { ModeToggle } from '@/components/mode-toggle'
import { NotificationCenter } from '@/components/notification-center'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useLanguage } from '@/contexts/language-context'
import { cn } from '@/lib/utils'
import {LogOut, Menu, Search, User, X} from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {Sidebar} from '@/components/siderbar'

export default function Header() {
  const [showSearch, setShowSearch] = useState(false)
  const { data: session } = useSession()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { t } = useLanguage()
  const router = useRouter()
    const handleScrollToContact = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const el = document.getElementById("footer");
        el?.scrollIntoView({ behavior: "smooth" });
    };
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Left: Logo & mobile menu */}
        <div className="flex items-center gap-2 md:gap-6 min-w-0">
            {/*<Button variant="ghost" size="icon" onClick={()=> setIsSidebarOpen(true)}*/}
            {/*        className="text-foreground" aria-label="Open menu">*/}
            {/*    <Menu className="w-6 h-6" />*/}
            {/*</Button>*/}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">{t('toggleMenu')}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <MobileNav/>
            </SheetContent>
          </Sheet>
          <Link href="/" className="hidden md:block">
            <Logo asLink={false} />
          </Link>
        </div>
        {/* Center: Menubar */}
        <nav className="hidden md:flex flex-1 justify-center gap-6 text-sm min-w-0">
          <Link
            href="/"
            className="font-medium transition-colors hover:text-foreground/80"
          >
            {t('home')}
          </Link>
          <Link
            href="/product"
            className="font-medium transition-colors hover:text-foreground/80"
          >
            {t('apiReference')}
          </Link>
          <Link
            href="#"
            onClick={handleScrollToContact}
            className="font-medium transition-colors hover:text-foreground/80"
          >
            {t('contactSupport')}
          </Link>
        </nav>

        <div className="flex items-center gap-2 justify-end min-w-0">
          <div
            className={cn('flex items-center', showSearch ? 'block' : 'hidden')}
          >
            <Input
              type="search"
              placeholder={t('search')}
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
              <span className="sr-only">{t('closeSearch')}</span>
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
                <Button variant="ghost" size="sm" className="gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {session?.user?.firstName?.charAt(0).toUpperCase() || ''}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-block">
                    {session?.user?.firstName! + session?.user?.lastName!}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t('myAccount')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <User className="mr-2 h-4 w-4" />
                    {t('dashboard')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () => {
                    await signOut({ redirect: false })
                    router.push('/')
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">{t('login')}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

const menuItems = [
    { label: "home", href: "/" },
    { label: "apiReference", href: "/product" },
    { label: "contactSupport", href: "#" },
]

function MobileNav() {
  const { t } = useLanguage()
  const { data: session } = useSession()
    const handleScrollToContact = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const el = document.getElementById("footer");
        el?.scrollIntoView({ behavior: "smooth" });
    };
  return (
    <div className="flex flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between p-4 border-b border-border pl-0">
          <img
              src="/logo-napas.png"
              alt="Napas Logo"
              className="h-8 w-32 rounded-md"
              style={{ objectFit: "contain" }}
          />
        </div>
        <div className="space-y-6">
            {/* Menu Items */}
            <div className="space-y-3">
                {menuItems.map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        className="block px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors font-medium"
                        onClick={(e) => {
                            if (item.label === "contactSupport") {
                                handleScrollToContact(e)
                            }
                        }}
                    >
                        {t(item.label)}
                    </a>
                ))}
            </div>

            {/* User Section */}
            {
                session ?
                    <div className="border-t border-border pt-6">
                        <div className="flex items-center gap-3 px-4 py-3 rounded-lg mb-4">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                    {session?.user?.firstName?.charAt(0).toUpperCase() || ''}
                                </AvatarFallback>
                            </Avatar>
                            <span>{session?.user?.firstName}</span>
                        </div>
                    </div> :
                    <Button variant="outline" asChild>
                        <Link href="/login">{t('login')}</Link>
                    </Button>
            }
        </div>

        <div className="p-6 border-t border-border">
            <Button
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-colors"
            >
                Đăng xuất
            </Button>
        </div>
    </div>
  )
}
