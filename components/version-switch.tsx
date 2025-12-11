'use client'

import { Check, ChevronsUpDown, GalleryVerticalEnd } from 'lucide-react'
import * as React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from './ui/button'
import {Document} from "@/types/api";
import Link from "next/link";
import {version} from "node:os";

export function VersionSwitcher({
  versions,
  defaultVersion,
  i18n,
  onVersionChange,
  listDocs,
  slug
}: {
  versions: string[]
  i18n: any
  defaultVersion: string
  onVersionChange: (version: string) => void
  listDocs: Document[]
  slug: string
}) {
  const [selectedVersion, setSelectedVersion] = React.useState(defaultVersion)
  const [t, setT] = React.useState(i18n)
  React.useEffect(() => {
    if (defaultVersion !== selectedVersion) {
      setSelectedVersion(defaultVersion)
    }
  }, [defaultVersion])

  React.useEffect(() => {
    if (i18n) setT(i18n)
  }, [i18n])
  const handleSelect = (version: string) => {
    setSelectedVersion(version)
    onVersionChange(version)
  }
  const getName = () => {
      if (listDocs.length <= 1) { return null }
      const doc = listDocs.find((v) => v.slug === slug)
      return doc ? doc.name : null
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="w-full justify-start py-6 pl-2 pr-3 bg-white border border-gray-100 shadow-none hover:bg-gray-50 transition rounded-xl text-foreground text-sm hover:text-foreground"
          variant="ghost"
        >
          <div className="bg-blue-700 text-white flex items-center justify-center rounded-lg w-8 h-8">
            <GalleryVerticalEnd className="w-4 h-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none justify-start md:ml-3 text-left"
               title={getName() + "/v" + selectedVersion}>
            <span className="font-bold">{t?.version_doc}</span>
            <span className="text-xs text-gray-500 w-[130px] truncate">{getName()}</span>
            <span className="text-xs text-gray-500">v{selectedVersion}</span>
          </div>
          <ChevronsUpDown className="ml-auto w-4 h-4 text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[var(--radix-dropdown-menu-trigger-width)] bg-white shadow-lg rounded-xl p-1"
        align="start"
      >
          {
              listDocs.length > 1 ?
                  listDocs.map((doc) => (
                      <DropdownMenuSub key={doc.id}>
                          <DropdownMenuSubTrigger>{doc.name}</DropdownMenuSubTrigger>
                          <DropdownMenuSubContent>
                              {
                                  doc.version.map((version) => (
                                      <DropdownMenuItem
                                          key={version}
                                          onSelect={() => handleSelect(version)}
                                          className="flex items-center px-4 py-2 rounded-lg text-sm hover:bg-blue-50 cursor-pointer"
                                      >
                                          <Link href={`/product/docs/${doc.slug}/v${version}`}
                                                className="flex items-center px-4 py-2 rounded-lg text-sm cursor-pointer">
                                              <span className="flex-1">v{version}</span>
                                              {version === selectedVersion && slug === doc.slug && (
                                                  <Check className="ml-2 w-4 h-4 text-blue-600" />
                                              )}
                                          </Link>
                                      </DropdownMenuItem>
                                  ))
                              }
                          </DropdownMenuSubContent>
                      </DropdownMenuSub>
                  )) :
                  versions.map((version) => (
                      <DropdownMenuItem
                          key={version}
                          onSelect={() => handleSelect(version)}
                          className="flex items-center px-4 py-2 rounded-lg text-sm hover:bg-blue-50 cursor-pointer"
                      >
                          <Link href={`/product/docs/${slug}/v${version}`}
                                className="flex items-center px-4 py-2 rounded-lg text-sm cursor-pointer">
                              <span className="flex-1">v{version}</span>
                              {version === selectedVersion && (
                                  <Check className="ml-2 w-4 h-4 text-blue-600" />
                              )}
                          </Link>
                      </DropdownMenuItem>
                  ))
          }

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
