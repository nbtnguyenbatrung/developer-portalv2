"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { DownloadFile, Product, Document, RateLimit } from "@/types/api";
import { useLanguage } from "@/contexts/language-context";
import LogoSpinner from "@/components/logo-spinner";
import MarkdownViewer from "@/components/MarkdownViewer";
import RateLimitView from "@/components/rate-limit";
import DownloadFileView from "@/components/download-file";
import { useApiPublic } from "@/hooks/use-api-public";
import { ViewUrl } from "@/components/view-url";
import { useSession } from "next-auth/react";
import { version } from "node:os";

export default function DppPage() {
  const { t, language } = useLanguage();
  const { call } = useApiPublic();
  const { data: session } = useSession();
  const params = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState("");
  const [downloads, setDownloads] = useState<DownloadFile[] | []>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [rateLimit, setRateLimit] = useState<RateLimit[]>([]);
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const [productData, mdData, downloadData, rateLimitData] =
          await Promise.all([
            call("get", `/api/product/`),
            call("get", `/api/md?slug=${params.slug}`),
            call("get", `/api/download-file?slug=${params.slug}`),
            call("get", `/api/rate-limit`),
          ]);
        const myProduct = productData.find(
          (item: Product) => item.slug === params?.slug
        );

        if (!myProduct) return;
        setProduct(myProduct);
        setContent(mdData);
        setDownloads(downloadData);
        const documentData = await call(
          "get",
          `/api/docs/?category=${myProduct.productCode.toLowerCase()}`
        );
        setDocuments(documentData);
        setRateLimit(rateLimitData);
      } catch (error) {
        console.error("Failed to load hero data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [language, params?.slug]);

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

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center w-full py-10 gap-12 bg-white rounded-xl items-center">
        <LogoSpinner />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <main className="w-full bg-background">
      <div className="w-full py-10 grid grid-cols-1 md:grid-cols-2 gap-12 rounded-xl items-start">
        {/* Phần nội dung */}
        <div className="flex flex-col justify-center h-full text-justify">
          <MarkdownViewer content={content} />
        </div>

        {/* Phần hình ảnh */}
        <div className="flex flex-col items-center">
          <ViewUrl data={product.viewUrl} />
          <div className={"flex items-center gap-2 w-full"}>
            {documents?.length > 1 ? (
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

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="bg-gradient-to-r from-primary to-primary text-white px-4 py-3">
                      <h3 className="font-bold text-lg">{t("selectDocs")}</h3>
                      <p className="text-xs text-blue-100 mt-1">
                        {t("selectDocsRead")}
                      </p>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                      {documents.map((doc, index) => (
                        <div
                          key={index}
                          className={`p-4 hover:bg-blue-50 cursor-pointer transition-colors duration-200 ${
                            index !== documents.length - 1
                              ? "border-b border-gray-100"
                              : ""
                          }`}
                          onClick={() => {
                            setIsDropdownOpen(false);
                            // Thêm logic mở tài liệu ở đây
                            redirect(
                              `/product/docs/${doc?.slug}/v${doc.defaultVersion}`
                            );
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                                {doc.name}
                              </h4>
                              {/*<p className="text-xs text-gray-600 mb-2">
                                                                  {doc.description}
                                                              </p>*/}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : documents?.length === 0 ? (
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
                  href={`/product/docs/${product?.slug}/v${
                    documents?.find((x) => x.slug === product.slug)
                      ?.defaultVersion
                  }`}
                >
                  {t("readDocs")}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            )}

            {product.quantityApi == 0 || product.productCode === "DPP" ? (
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
                disabled={product.quantityApi == 0}
              >
                <Link href={`/product/apis/${product?.slug}`}>
                  {t("viewApi")}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="pb-10">
        <RateLimitView rateLimits={rateLimit} />
      </div>

      {session && (
        <div className="pb-10">
          <DownloadFileView downloads={downloads} />
        </div>
      )}
    </main>
  );
}
