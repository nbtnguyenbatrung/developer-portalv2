'use client'

import React from "react";
import {usePathname} from "next/navigation";
import {useLanguage} from "@/contexts/language-context";

export function Description() {
    const {t} = useLanguage()
    const pathname = usePathname()

  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = (): string => {
    const segments = pathname.split('/').filter(Boolean)

    if (segments.length === 0) {
      return ''
    }

        if (segments.includes("login")) {
            return ""
        }

        return t(pathname.split("/").pop() || "")
    }

  const description = generateBreadcrumbs()

  return (
    <>
      {description !== '' && (
        <div className="flex-1 container">
          <div className=" border-b border-border bg-card/50 backdrop-blur-sm py-2 pl-1">
            <div className="flex items-center gap-3">
              {/*<div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
                    <span className="text-accent-foreground font-bold text-sm">API</span>
                </div>*/}
              <h1 className="text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                {description}
              </h1>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
