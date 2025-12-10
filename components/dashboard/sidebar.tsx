'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  BarChart3,
  Key,
  Settings,
  FileCode,
  Webhook,
  CreditCard,
  HelpCircle,
  Home,
} from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'

const sidebarItems = [
  {
    title: 'API Keys',
    href: '/dashboard/api-keys',
    icon: Key,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const language = useLanguage()
  return (
    <div className="hidden md:block">
      <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12 pr-1 overflow-y-auto">
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start',
                pathname === item.href
                  ? 'bg-secondary'
                  : 'hover:bg-transparent hover:underline',
              )}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
