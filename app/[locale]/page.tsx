'use client'

import { FeatureSection } from '@/components/feature-section'
import { HeroSection } from '@/components/hero-section'
import { ProductsSection } from '@/components/products-section'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent
} from '@/components/ui/card'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import {useEffect, useState} from "react";
import LogoSpinner from "@/components/logo-spinner";
import {useApiPublic} from "@/hooks/use-api-public";
import {useTranslations} from "use-intl";
import {Product} from "@/types/api";

export default function Home() {
    const t = useTranslations("common")
    const {call} = useApiPublic()

    const [data, setData] = useState<any>(null)
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadHeroData = async () => {
            setIsLoading(true)
            try {
                const [sectionData, productsData] = await Promise.all([
                    call("get", `/api/section/`),
                    call("get", `/api/product/`),
                ])
                setData(sectionData)
                setProducts(productsData)
            } catch (error) {
                console.error("Failed to load hero data:", error)
            } finally {
                setIsLoading(false)
            }
        }

        loadHeroData()
    }, [])

    if (isLoading) {
        return(
            <div className="h-screen items-center justify-center flex flex-col gap-8 pb-16">
                <LogoSpinner/>
            </div>
        )
    }

  return (
    <div className="flex flex-col gap-8 pb-16">
      <div className="fade-in-up">
        <HeroSection data={data.hero}/>
      </div>

      <div className="fade-in-up">
        <FeatureSection data={data.feature} products={products} />
      </div>

      <div className="fade-in-up">
        <ProductsSection data={data.product} products={products} />
      </div>

      <section id="getting-started"
               className="container px-4 md:px-6 mt-8"
               style={{
                   paddingLeft: 0,
                   paddingRight: 0
               }} >
        <Card className="bg-primary/5 border-none">
          <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4 py-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">{t('ready_start')}</h3>
              <p className="text-muted-foreground">{t('ready_start_text')}</p>
            </div>
            <div className="flex flex-col max-xs:flex-row gap-3">
              <Button size="lg" asChild>
                <Link href="/login">{t('ready_start_btn_sign_in')}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/product">
                  {t('ready_start_btn_read_docs')}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
