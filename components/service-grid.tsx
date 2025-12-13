"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import ServiceCard from "./service-card";
import { Product } from "@/types/api";
import { icons } from "@/script/icons";
import {useTranslations} from "use-intl";

interface ServiceGridProps {
  productList: Product[];
}

export default function ServiceGrid({ productList }: ServiceGridProps) {
  const t = useTranslations("common")
  return (
    <div className="w-full">
      {/* Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {productList.map((product, index) => {
          const Icon = icons(product.icon);
          return (
            <ScrollReveal key={product.id} delay={index * 100}>
              <ServiceCard product={product} Icon={Icon} />
            </ScrollReveal>
          );
        })}
      </div>
      {productList.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground text-lg">{t("noProduct")}</p>
          </div>
        </div>
      )}
    </div>
  );
}
