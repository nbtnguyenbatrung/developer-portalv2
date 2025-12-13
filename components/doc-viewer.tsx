"use client";

import { DocumentItem } from "@/app/constant/mock";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { VersionSwitcher } from "./version-switch";
import { useParams, useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/language-context";
import LogoSpinner from "./logo-spinner";
import { useApiPublic } from "@/hooks/use-api-public";
import { Document } from "@/types/api";
import { Menu, X } from "lucide-react";
import {useApi} from "@/hooks/use-api";
import {useTranslations} from "use-intl";

const components = {
  // Paragraphs
  p: ({ node, ...props }: any) => (
    <p className="leading-7 my-2 text-gray-800" {...props} />
  ),

  // Links
  a: ({ node, ...props }: any) => (
    <a
      {...props}
      className="text-blue-600 hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    />
  ),

  // Lists
  ul: ({ node, ordered, ...props }: any) => (
    <ul className="list-disc pl-6 my-2" {...props} />
  ),
  ol: ({ node, ordered, ...props }: any) => (
    <ol className="list-decimal pl-6 my-2" {...props} />
  ),
  li: ({ node, ...props }: any) => <li className="my-1" {...props} />,

  // Blockquote
  blockquote: ({ node, ...props }: any) => (
    <blockquote
      className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-3"
      {...props}
    />
  ),

  // Code — phân biệt inline vs block
  code: ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || "");
    if (!inline && match) {
      const lang = match[1];
      return (
        <div className="my-3 rounded-md overflow-hidden">
          <SyntaxHighlighter language={lang} /* style={github} */ PreTag="div">
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        </div>
      );
    }
    // inline code
    return (
      <code className="bg-gray-100 px-1 py-[2px] rounded text-sm" {...props}>
        {children}
      </code>
    );
  },

  // Images — normalize relative paths from markdown files under `public/md`
  img: ({ node, src, alt }: any) => {
    let resolvedSrc = src || "";
    // If the src is relative (starts with ./ or does not start with / or http),
    // assume it's relative to `public/md` and rewrite to `/md/...` so Next serves it.
    if (resolvedSrc.startsWith("../")) {
      resolvedSrc = "/md/" + resolvedSrc.replace(/^\..\/+/g, "");
    } else if (
      resolvedSrc &&
      !resolvedSrc.startsWith("/") &&
      !/^https?:\/\//i.test(resolvedSrc)
    ) {
      resolvedSrc = "/md/" + resolvedSrc;
    }

    return (
      <img
        src={resolvedSrc}
        className="max-w-full rounded-md shadow my-3"
        alt={alt || ""}
      />
    );
  },

  // Tables
  table: ({ node, ...props }: any) => (
    <div className="overflow-x-auto my-3">
      <table className="min-w-full border-collapse" {...props} />
    </div>
  ),
  thead: ({ node, ...props }: any) => (
    <thead className="bg-gray-100" {...props} />
  ),
  th: ({ node, ...props }: any) => (
    <th className="px-3 py-2 text-left text-sm font-medium border" {...props} />
  ),
  td: ({ node, ...props }: any) => (
    <td className="px-3 py-2 text-sm border" {...props} />
  ),
  tr: ({ node, ...props }: any) => <tr {...props} />,

  // Horizontal rule
  hr: ({ node, ...props }: any) => (
    <hr className="my-4 border-gray-200" {...props} />
  ),
};

export function DocViewer() {
  const t = useTranslations("common")
  const params = useParams<{ slug: string; version: string }>();
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem>();
  const [activeHeading, setActiveHeading] = useState<string>("");
  const [tableOfContents, setTableOfContents] = useState<
    Array<{ id: string; level: number; text: string }>
  >([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [defaultVersion, setDefaultVersion] = useState("");
  const [versionSelect, setVersionSelect] = useState<string>("");
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const { call } = useApiPublic();
  const { callApi } = useApi()
  const [listDocs, setListDocs] = useState<Document[]>([]);
  // State mới cho mobile TOC
  const [isTocOpen, setIsTocOpen] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data: any = { slug: params.slug };
      const version = params.version;
      if (version) data.version = version.replace("v", "");
      const docData = await callApi("post", `/api/doc-version/`, data)
      if (!docData) return null;

      const listDocs = await call(
        "get",
        `/api/docs?category=${docData.category}`
      );
      setListDocs(listDocs);
      setSelectedDoc(docData);
      setDefaultVersion(docData.defaultVersion);
    } catch (e) {
      console.log("e :>> ", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [language, versionSelect]);

  useEffect(() => {
    if (!selectedDoc || !selectedDoc.content) return;
    const headings = extractHeadings(selectedDoc.content);
    setTableOfContents(headings);
    setActiveHeading(headings[0]?.id || "");
  }, [selectedDoc]);

  const extractHeadings = (markdown: string) => {
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const headings: Array<{ id: string; level: number; text: string }> = [];
    let match;

    while ((match = headingRegex.exec(markdown)) !== null) {
      const level = match[1].length;
      const text = match[2];
      const id = text.toLowerCase().replace(/\s+/g, "-");
      headings.push({ id, level, text });
    }

    return headings;
  };

  const handleVersionChange = (newVersion: string) => {
    setVersionSelect(newVersion);
  };

  const handleHeadingClick = (id: string) => {
    setActiveHeading(id);
    const element = document.getElementById(id);
    const container = scrollContainerRef.current;

    if (element && container) {
      const elementRect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const offsetPosition =
        elementRect.top - containerRect.top + container.scrollTop - 30;

      container.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }

    if (window.innerWidth < 1024) {
      setIsTocOpen(false);
    }
  };

  const TocContent = () => (
    <div className="py-4 space-y-2">
      <h2 className="text-sm font-semibold text-foreground ">
        {t("on_this_page")}
      </h2>
      {tableOfContents.map((heading) => (
        <button
          key={heading.id}
          onClick={() => handleHeadingClick(heading.id)}
          className={`w-full text-left px-3 py-2 rounded-lg transition text-sm ${
            activeHeading === heading.id
              ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
              : "text-foreground/70 hover:text-foreground hover:bg-muted"
          }`}
          style={{ paddingLeft: `${12 + (heading.level - 1) * 12}px` }}
        >
          {heading.text}
        </button>
      ))}
    </div>
  );

  if (isLoading) {
    return (
      <section className="h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background py-10 md:py-20 lg:py-30">
        <LogoSpinner />
      </section>
    );
  }

  return (
    <div className="h-screen bg-background overflow-hidden grid grid-cols-1 lg:grid-cols-12">
      <div className="hidden lg:block lg:col-span-3 border-r border-border bg-card/50 overflow-y-auto min-h-0">
        <div className="sticky top-0 bg-card border-b border-border py-4">
          <VersionSwitcher
            defaultVersion={defaultVersion}
            onVersionChange={handleVersionChange}
            listDocs={listDocs}
            slug={params.slug}
          />
        </div>
        <TocContent />
      </div>

      <div className="col-span-1 lg:col-span-9 flex flex-col flex-1 min-h-0 relative">
        <div className="lg:hidden sticky top-0 bg-card border-b border-border p-4 flex justify-between items-center z-10 gap-4">
          <button
            onClick={() => setIsTocOpen(!isTocOpen)}
            className="px-3 py-2 rounded-lg text-foreground hover:bg-muted border border-border transition-colors flex items-center"
            aria-label="Toggle Table of Contents"
          >
            {isTocOpen ? (
              <>
                <X className="h-4 w-4" />
              </>
            ) : (
              <>
                <Menu className="h-4 w-4" />
              </>
            )}
          </button>

          <VersionSwitcher
            defaultVersion={defaultVersion}
            onVersionChange={handleVersionChange}
            listDocs={listDocs}
            slug={params.slug}
          />
        </div>

        {/* Overlay/Drawer Mục lục trên Mobile */}
        {isTocOpen && (
          <div
            className="absolute inset-0 z-20 bg-black/50"
            onClick={() => setIsTocOpen(false)}
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-3/4 max-w-xs bg-card overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsTocOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-2xl text-foreground hover:bg-muted font-bold leading-none z-10"
                aria-label="Close Table of Contents"
              >
                <X className="mr-2 h-4 w-4" />
              </button>

              <div className="pt-16 px-4 pb-4">
                <TocContent />
              </div>
            </div>
          </div>
        )}

        <div
          ref={scrollContainerRef}
          className="px-8 py-3 overflow-y-auto flex-1 min-h-0"
        >
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
              components={{
                h1: ({ children }) => {
                  const text = String(children)
                    .toLowerCase()
                    .replace(/\s+/g, "-");
                  return (
                    <h1
                      id={text}
                      className="scroll-mt-8 font-bold text-3xl text-foreground mb-4"
                    >
                      {children}
                    </h1>
                  );
                },
                h2: ({ children }) => {
                  const text = String(children)
                    .toLowerCase()
                    .replace(/\s+/g, "-");
                  return (
                    <h2
                      id={text}
                      className="scroll-mt-8 font-bold text-2xl text-foreground mb-3"
                    >
                      {children}
                    </h2>
                  );
                },
                h3: ({ children }) => {
                  const text = String(children)
                    .toLowerCase()
                    .replace(/\s+/g, "-");
                  return (
                    <h3
                      id={text}
                      className="scroll-mt-8 font-bold text-xl text-foreground mb-2"
                    >
                      {children}
                    </h3>
                  );
                },
                ...components,
              }}
            >
              {selectedDoc?.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
