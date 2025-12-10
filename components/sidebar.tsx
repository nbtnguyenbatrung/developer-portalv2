"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const sidebarItems = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs/introduction" },
      { title: "Quick Start", href: "/docs/quick-start" },
      { title: "Authentication", href: "/docs/authentication" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { title: "Accounts", href: "/docs/api/accounts" },
      { title: "Payments", href: "/docs/api/payments" },
      { title: "Transactions", href: "/docs/api/transactions" },
      { title: "Analytics", href: "/docs/api/analytics" },
    ],
  },
  {
    title: "SDKs",
    items: [
      { title: "Node.js", href: "/docs/sdks/nodejs" },
      { title: "Python", href: "/docs/sdks/python" },
      { title: "C#", href: "/docs/sdks/csharp" },
      { title: "Java", href: "/docs/sdks/java" },
    ],
  },
  {
    title: "Guides",
    items: [
      { title: "Sandbox Usage", href: "/docs/guides/sandbox" },
      { title: "Webhooks", href: "/docs/guides/webhooks" },
      { title: "Error Handling", href: "/docs/guides/errors" },
      { title: "Rate Limiting", href: "/docs/guides/rate-limiting" },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:block">
      <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12 pr-1 overflow-y-auto">
        <div className="space-y-4">
          {sidebarItems.map((section, i) => (
            <Accordion
              key={i}
              type="single"
              collapsible
              defaultValue={
                sidebarItems.findIndex((section) => section.items.some((item) => item.href === pathname)) === i
                  ? section.title
                  : undefined
              }
            >
              <AccordionItem value={section.title} className="border-none">
                <AccordionTrigger className="py-1 text-sm font-medium">{section.title}</AccordionTrigger>
                <AccordionContent className="pb-1 pt-0">
                  <div className="flex flex-col gap-1">
                    {section.items.map((item, j) => (
                      <Link
                        key={j}
                        href={item.href}
                        className={cn(
                          "rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                          pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
                        )}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  )
}
