"use client";

import ServiceGrid from "@/components/service-grid";
import Sidebar from "@/components/sidebar-product";
import {Menu, Search, X} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Product } from "@/types/api";
import { useLanguage } from "@/contexts/language-context";
import LogoSpinner from "@/components/logo-spinner";
import { useApiPublic } from "@/hooks/use-api-public";

export default function Home() {
  const { t, language } = useLanguage();
  const { call } = useApiPublic();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const rightRef = useRef<HTMLDivElement>(null);
  const [leftHeight, setLeftHeight] = useState(0);
  const [productList, setProductList] = useState<Product[] | []>([]);
  const [productData, setProductData] = useState<Product[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [languageCurrent, setLanguageCurrent] = useState<string>("");
  const [isTocOpen, setIsTocOpen] = useState(false);

  useEffect(() => {
    if (productList.length === 0 || language !== languageCurrent) {
      const loadData = async () => {
        setIsLoading(true);
        try {
          const productData = await call("get", `/api/product/`);
          setProductList(productData);
          setProductData(productData);
          setLanguageCurrent(language);
        } catch (error) {
          console.error("Failed to load hero data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      loadData();
    } else {
      if (selectedCategory) {
        if (selectedCategory !== "all") {
          setProductList(
            productData.filter((item) => item.productCode === selectedCategory)
          );
        } else {
          setProductList(productData);
        }
      }
    }
  }, [language, selectedCategory]);

  useEffect(() => {
    if (productList) {
      const observer = new ResizeObserver((entries) => {
        entries.forEach((entry) =>
          setLeftHeight(entry.target.clientHeight - 70)
        );
      });

      if (rightRef.current) {
        observer.observe(rightRef.current);
      }

      return () => observer.disconnect();
    }
  }, [selectedCategory, productList]);

  if (isLoading) {
    return (
      <main className="h-screen flex items-center justify-center w-full bg-background">
        <LogoSpinner />
      </main>
    );
  }

  return (
    <main className="w-full bg-background">
      <div className={`flex overflow-hidden flex-col lg:flex-row`}>
        <div className="w-60 lg:border-r lg:border-border flex flex-col bg-sidebar max-lg:w-full max-xs:h-max">
          <div className="p-4 lg:border-b lg:border-border max-lg:flex max-lg:gap-2">

              <button
                  onClick={() => setIsTocOpen(!isTocOpen)}
                  className="lg:hidden px-3 py-2 rounded-lg text-foreground hover:bg-muted border border-border transition-colors flex items-center"
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
            <div className="relative max-lg:w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t("searchProduct")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all placeholder:text-sm"
              />
            </div>
          </div>

          {/* Sidebar */}
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
                            className="absolute top-[5rem] right-4 p-2 rounded-full text-2xl text-foreground hover:bg-muted font-bold leading-none z-10"
                            aria-label="Close Table of Contents"
                        >
                            <X className="mr-2 h-4 w-4" />
                        </button>

                        <div className="pt-[8rem] px-4 pb-4">
                            <Sidebar
                                selectedCategory={selectedCategory}
                                onSelectCategory={setSelectedCategory}
                                searchQuery={searchQuery}
                                leftHeight={
                                    productList.length === 0 || leftHeight === 0 ? 300 : leftHeight
                                }
                            />
                        </div>
                    </div>
                </div>
            )}
          <div className="flex-1 overflow-y-auto max-lg:hidden">
            <Sidebar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              leftHeight={
                productList.length === 0 || leftHeight === 0 ? 300 : leftHeight
              }
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="p-4 h-max" ref={rightRef}>
          <ServiceGrid productList={productList} />
        </div>
      </div>
    </main>
  );
}
