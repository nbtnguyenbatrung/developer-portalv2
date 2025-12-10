import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FireExtinguisher } from 'lucide-react'
import { ScrollReveal } from './scroll-reveal'
import { Badge } from './ui/badge'
import { useLanguage } from '@/contexts/language-context'
import {useEffect, useState} from "react";
import {FeatureSectionData, Product} from "@/types/api";
import {icons} from "@/script/icons";
import LogoSpinner from "@/components/logo-spinner";
import {useApiPublic} from "@/hooks/use-api-public";

export function FeatureSection() {
    const { language } = useLanguage()
    const {call} = useApiPublic()

    const [data, setData] = useState<FeatureSectionData | null>(null)
    const [products, setProducts] = useState<Array<Product>>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true)

            try {

                const [heroData, productData] = await Promise.all([
                    call("get", `/api/feature-section/`),
                    call("get", `/api/product/`)
                ])
                setData(heroData)
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
        return (
            <section className="h-screen flex items-center justify-center py-4 md:py-6 bg-muted/30">
                <LogoSpinner />
            </section>
        )
    }

    if (!data) {
        return null
    }
  return (
    <ScrollReveal>
      <section className="py-4 md:py-6 bg-muted/30">
        <div className="container px-4 md:px-8">
          <div className="space-y-4 mb-12 text-center">
            <div className="inline-block">
              <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                <FireExtinguisher className="h-3 w-3 mr-1" />
                {data.feature_section}
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                {data.feature_section_title}
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                {data.feature_section_subtitle}
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {products
              .filter((it) => it.featured)
              .map((product, idx) => {
                const Icon = icons(product.icon)
                return (
                  <Card
                    key={`${idx + 1}`}
                    id={`${idx + 1}`}
                    className="border-2 border-primary/10 bg-background shadow-sm hover:shadow-lg transition-shadow duration-200"
                  >
                    <CardHeader className="relative z-10 flex flex-col items-stretch pb-4 flex flex-col ">
                      <div className="flex items-start justify-between mb-4">
                        <div className="rounded-sm bg-primary/5 group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-8 w-8 text-primary" />
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
                      {/* <Icon className="h-8 w-8 text-primary mb-2" /> */}
                      <CardTitle className="mt-2 text-left text-lg md:text-xl font-semibold">
                        {product.title}
                      </CardTitle>
                      <CardDescription className="text-left text-sm text-muted-foreground mt-1">
                        {product.subTitle}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-2 justify-center">
                        {product.summary}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </div>
      </section>
    </ScrollReveal>
  )
}
