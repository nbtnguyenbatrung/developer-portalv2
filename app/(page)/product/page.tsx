"use client";

import ServiceGrid from "@/components/service-grid";
import Sidebar from "@/components/sidebar-product";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Product } from "@/types/api";
import { useLanguage } from "@/contexts/language-context";
import { HeroSkeleton } from "@/components/hero-skeleton";
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
        <div className="w-60 lg:border-r lg:border-border flex flex-col bg-sidebar max-md:w-full max-xs:h-max">
          <div className="p-4 lg:border-b lg:border-border">
            <div className="relative">
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
          <div className="flex-1 overflow-y-auto">
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
