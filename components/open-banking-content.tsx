"use client"

import React, {useEffect, useMemo, useRef, useState} from "react"
import matter from "gray-matter";
import MarkdownViewer from "@/components/MarkdownViewer";
import {ViewUrl} from "@/components/view-url";
import {Button} from "@/components/ui/button";
import {ArrowRight, ChevronDown} from "lucide-react";
import {redirect} from "next/navigation";
import Link from "next/link";
import {useTranslations} from "use-intl";
import {useLocale} from "next-intl";

type ContentItem = {
    key: string
    value: string
}
type MediaItem = {
    type: string
    url: string
    alt: string
}
interface OpenBankingContentProps {
    markdownContent: string | null
}
const imageRegexMatch = /!\[([^\]]*)]\(([^)\s]+)(?:\s+['"]([^'"]*)['"])?\)/;
const imageRegex = /^!\[([^\]]*)\]\(([^)]+)\)$/;
export function OpenBankingContent({ markdownContent }: OpenBankingContentProps) {

    const locale = useLocale()
    const t = useTranslations("common")
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Parse markdown content
    const parsedContent = useMemo(() => {
        if (!markdownContent) return null

        const { data, content } = matter(markdownContent)

        // Extract sections from markdown
        const sections: Record<string, any> = {}
        const lines = content.split("\n")
        let currentSection = ""
        let currentContent: string[] = []
        let mediaContent: MediaItem
        let contentParse: ContentItem[] = []
        for (const line of lines) {
            if (line.startsWith("## ")) {
                if (currentSection) {
                    contentParse.push({
                        key: currentSection,
                        value: currentContent.join("\n").trim(),
                    })
                }
                currentSection = line.replace("## ", "").trim()
                currentContent = []
            } else if (imageRegex.test(line.trim()) && !currentSection){
                const match = line.trim().match(imageRegexMatch);
                const alt = match?.[1] || "";
                const url = match?.[2] || "";
                mediaContent  = {
                    type: "img",
                    url: url,
                    alt: alt
                }
            } else if (line.startsWith("<video ") && line.endsWith(" </video>")) {
                mediaContent  = {
                    type: "video",
                    url: line,
                    alt: ""
                }
            } else {
                currentContent.push(line)
            }
        }

        if (currentSection) {
            contentParse.push({
                key: currentSection,
                value: currentContent.join("\n").trim(),
            })
        }

        sections["object"] = data
        // @ts-ignore
        sections["media"] = mediaContent
        sections["contentParse"] = contentParse
        return sections
    }, [markdownContent])

    useEffect(() => {
        const handleClickOutside = (
            event: React.ChangeEvent<HTMLInputElement>
        ): any => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        // @ts-ignore
        document.addEventListener("mousedown", handleClickOutside);
        // @ts-ignore
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!parsedContent) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-muted-foreground">Không thể tải nội dung. Vui lòng kiểm tra file markdown.</p>
            </div>
        )
    }

    return (
        <main className="w-full bg-background">
            <div className="w-full py-10 pb-5 grid grid-cols-1 md:grid-cols-2 gap-12 rounded-xl items-start">
                <div className="flex flex-col justify-center h-full text-justify">
                    {
                        parsedContent["contentParse"].map((item: ContentItem, index: number) => (
                            <div className="space-y-6" key={index} >
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-semibold text-foreground/90">{item.key}</h2>
                                </div>

                                <div className="space-y-4">
                                    <MarkdownViewer content={item.value.replace("---", "")}/>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className="flex flex-col items-center">
                    {
                        ViewUrl(parsedContent["media"].type, parsedContent["media"].url, parsedContent["media"].alt)
                    }
                    <div className={"flex items-center gap-2 w-full"}>
                        {parsedContent["object"]?.apiDocument?.length > 1 ? (
                            <div className="relative w-full mt-4" ref={dropdownRef}>
                                <Button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="w-full group/btn bg-primary/5 hover:bg-primary hover:text-white text-primary"
                                >
                                    {t("readDocs")}
                                    <ChevronDown
                                        size={18}
                                        className={`transition-transform duration-300 ${
                                            isDropdownOpen ? "rotate-180" : ""
                                        }`}
                                    />
                                </Button>

                                {isDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="bg-gradient-to-r from-primary to-primary text-white px-4 py-3">
                                            <h3 className="font-bold text-lg">{t("selectDocs")}</h3>
                                            <p className="text-xs text-blue-100 mt-1">
                                                {t("selectDocsRead")}
                                            </p>
                                        </div>

                                        <div className="max-h-96 overflow-y-auto">
                                            {parsedContent["object"]?.apiDocument?.map((doc: any, index: number) => (
                                                <div
                                                    key={index}
                                                    className={`p-4 hover:bg-blue-50 cursor-pointer transition-colors duration-200 ${
                                                        index !== parsedContent["object"]?.apiDocument?.length - 1
                                                            ? "border-b border-gray-100"
                                                            : ""
                                                    }`}
                                                    onClick={() => {
                                                        setIsDropdownOpen(false);
                                                        // Thêm logic mở tài liệu ở đây
                                                        redirect(
                                                            `/${locale}/product/docs/${doc?.slug}/v${doc.defaultVersion}`
                                                        );
                                                    }}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                                                                {doc.name}
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : parsedContent["object"]?.apiDocument?.length === 0 || !parsedContent["object"]?.apiDocument ? (
                            <Button
                                variant="default"
                                className="w-full group/btn bg-primary/5 text-primary mt-4"
                                disabled
                            >
                                <>
                                    {t("readDocs")}
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                </>
                            </Button>
                        ) : (
                            <Button
                                variant="ghost"
                                className="w-full group/btn bg-primary/5 hover:bg-primary hover:text-white text-primary mt-4"
                                asChild
                            >
                                <Link
                                    href={`/${locale}/product/docs/${parsedContent["object"]?.apiDocument[0]?.slug}/v${
                                        parsedContent["object"]?.apiDocument[0]?.defaultVersion
                                    }`}
                                >
                                    {t("readDocs")}
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        )}

                        {!parsedContent["object"]?.apiTest || parsedContent["object"]?.apiTest?.length === 0 ? (
                            <Button
                                variant="default"
                                className="w-full group/btn bg-primary/5 text-primary mt-4"
                                disabled
                            >
                                <>
                                    {t("viewApi")}
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                </>
                            </Button>
                        ) : (
                            <Button
                                variant="ghost"
                                className="w-full group/btn bg-primary/5 hover:bg-primary hover:text-white text-primary mt-4"
                                asChild
                            >
                                <Link href={`/product/apis/${parsedContent["object"]?.apiTest[0]?.slug}`}>
                                    {t("viewApi")}
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}
