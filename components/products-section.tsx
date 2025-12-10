'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useLanguage } from '@/contexts/language-context'
import { ArrowRight, Zap } from 'lucide-react'
import Link from 'next/link'
import { ScrollReveal } from './scroll-reveal'
import {useEffect, useState} from "react";
import {Product, ProductSectionData} from "@/types/api";
import {icons} from "@/script/icons";
import LogoSpinner from "@/components/logo-spinner";
import {useApiPublic} from "@/hooks/use-api-public";

export function ProductsSection() {

    const { t, language } = useLanguage()
    const {call} = useApiPublic()

    const [data, setData] = useState<ProductSectionData | null>(null)
    const [products, setProducts] = useState<Array<Product>>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true)
            try {
                const [productSection, productData] = await Promise.all([
                    call("get",`/api/product-section` ),
                    call("get", `/api/product`)
                ])
                setData(productSection)
                setProducts(productData)
            } catch (error) {
                console.error("Failed to load hero data:", error)
            } finally {
                setIsLoading(false)
            }
        }

        loadData()
    }, [language])

    if (isLoading) {
        return(
            <section className="h-screen flex items-center justify-center py-4 md:py-6 lg:py-6 sm: scroll-mt-20">
                <LogoSpinner />
            </section>
        )
    }

    if (!data) {
        return null
    }

  return (
    <section id="products" className="py-4 md:py-6 lg:py-6 sm: scroll-mt-20">
      <div className="container px-4 md:px-6"
           style={{
               paddingLeft: 0,
               paddingRight: 0
           }}>
        {/* Header */}
        <ScrollReveal>
          <div className="space-y-4 mb-12 text-center">
            <div className="inline-block">
              <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                <Zap className="h-3 w-3 mr-1" />
                {data.our_service}
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                {data.our_service_title}
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                {data.our_service_subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Products Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => {
            if (!product.featured) {
              const Icon = icons(product.icon)
              return (
                <ScrollReveal key={product.id} delay={index * 100}>
                  <Card key={`${product.id} + ${index + 1}`} className="h-full group relative overflow-hidden border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl min-h-[340px] flex flex-col">
                    {/* Background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <CardHeader className="relative z-10 flex flex-col items-stretch">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        {product.badge && (
                          <Badge
                            variant={
                              product.badge === 'Popular'
                                ? 'default'
                                : 'secondary'
                            }
                            className={
                              product.badge === 'Popular'
                                ? 'bg-gradient-to-r from-primary to-primary/70'
                                : 'bg-green-500/10 text-green-700 dark:text-green-400'
                            }
                          >
                            {product.badge}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl">{product.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {product.subTitle}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="relative z-10 space-y-4 flex-1 flex flex-col justify-start">
                      <ul className="space-y-2">
                        {product.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="relative text-sm text-muted-foreground flex items-start gap-2"
                          >
                            <div className="absolute h-1.5 w-1.5 mt-1.5 rounded-full bg-primary/40" />
                            <div className="ml-6">{feature}</div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                      <CardFooter className="relative z-10 mt-auto p-4 pt-0 bg-background flex flex-col">
                          <div className={'flex items-center gap-2 w-full'}>
                              <Button
                                  variant="ghost"
                                  className="w-full group/btn bg-primary/5 hover:bg-primary hover:text-white text-primary mt-4"
                                  asChild
                              >
                                  <Link href={`/product/introduce/${product.slug}`}>
                                      {t("introduce")}
                                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                  </Link>
                              </Button>
                          </div>
                      </CardFooter>
                  </Card>
                </ScrollReveal>
              )
            }
          })}
        </div>

        <ScrollReveal>
            <div className="space-y-4 mt-12 text-center">
                <Button size="lg" asChild>
                    <Link href="/product">{t('viewAll')}</Link>
                </Button>
            </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
