"use client"

import React from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {ChevronRight} from "lucide-react";
import {useLanguage} from "@/contexts/language-context";

interface BreadcrumbItem {
  label: string
  href: string
  icon?: React.ReactNode
}

export function Breadcrumb() {
    const {t} = useLanguage()
    const pathname = usePathname()

  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean)

    if (segments.length === 0) {
      return []
    }

        if (segments.includes("login")) {
            return []
        }

        const breadcrumbs: BreadcrumbItem[] = [{ label: t("home"), href: "/" }]

    let currentPath = ''
    segments.forEach((segment) => {
      currentPath += `/${segment}`
      const label = segment
        .replace(/-/g, ' ')
        .replace(/^\w/, (c) => c.toUpperCase())
      breadcrumbs.push({ label, href: currentPath })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <>
      {breadcrumbs.length > 0 && (
        <div className="flex-1 container pt-2">
          <nav className="relative" aria-label="Breadcrumb">
            <div className="flex items-center justify-between">
              <div className="relative flex items-center flex-wrap">
                {breadcrumbs.map((crumb, index) => {
                  const isLast = index === breadcrumbs.length - 1
                  const isFirst = index === 0
                  return (
                    <div
                      key={crumb.href}
                      className="flex items-center gap-1 group"
                    >
                      {isFirst ? (
                        <Link
                          href={crumb.href}
                          className="inline-flex items-center gap-1 px-1 py-1 rounded-md text-sm font-medium text-foreground/70 hover:text-foreground transition-all duration-300 hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20"
                        >
                          <span className="hidden sm:inline text-xs">
                            {crumb.label}
                          </span>
                        </Link>
                      ) : isLast ? (
                        <span className={'text-xs'}>{crumb.label}</span>
                      ) : (
                        <Link
                          href={crumb.href}
                          className="text-xs inline-flex items-center gap-1 px-1 py-1 rounded-md font-medium text-foreground/60 hover:text-foreground transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-transparent hover:shadow-md hover:shadow-blue-500/10"
                        >
                          {crumb.label}
                        </Link>
                      )}

                      {!isLast && (
                        <ChevronRight
                          size={12}
                          className="text-foreground/40 group-hover:text-blue-500 transition-all duration-300 mx-1"
                          strokeWidth={2}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
