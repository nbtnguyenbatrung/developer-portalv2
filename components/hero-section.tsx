'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import { HeroImageSlider } from './hero-image-slider'
import {useEffect, useState} from "react";
import {HeroSectionData} from "@/types/api";
import {ScrollReveal} from "@/components/scroll-reveal";
import {AnimatedCounter} from "@/components/animated-counter";
import LogoSpinner from "@/components/logo-spinner";
import {useApiPublic} from "@/hooks/use-api-public";

export function HeroSection() {
    const { language } = useLanguage()
    const {call} = useApiPublic()

    const [data, setData] = useState<HeroSectionData | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadHeroData = async () => {
            setIsLoading(true)
            try {
                const heroData = await call("get", `/api/hero-section/`)
                setData(heroData)
            } catch (error) {
                console.error("Failed to load hero data:", error)
            } finally {
                setIsLoading(false)
            }
        }

        loadHeroData()
    }, [language])

    if (isLoading) {
        return(
            <section className="h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background py-10 md:py-20 lg:py-30">
                <LogoSpinner/>
            </section>
        )
    }

    if (!data) {
        return null
    }

  return (
      <ScrollReveal>
        <section className="relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background py-10 md:py-20 lg:py-30">
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute inset-0 bg-grid-pattern-light dark:bg-grid-pattern-dark" />
          </div>

          <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

          <div className="container relative z-10 px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-6">
                <div className="inline-block w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary border border-primary/20">
                    {data.text}
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight text-balance">
                    {data.welcome}
                </h1>
                <p className="max-w-[500px] text-lg md:text-xl text-muted-foreground leading-relaxed">
                    {data.welcome_sub}
                </p>
                <div className="flex flex-col gap-3 xs:flex-row pt-4">
                  <Button
                    size="lg"
                    className="btn-gradient rounded-full px-6 xs:px-8"
                    onClick={() => {
                      const el = document.getElementById('products')
                      if (el) el.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                      {data.btn_view_product}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-6 bg-transparent xs:px-8"
                    onClick={() => {
                      const el = document.getElementById('getting-started')
                      if (el) el.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                      {data.btn_get_started}
                  </Button>
                </div>
              </div>

              <HeroImageSlider SLIDER_IMAGES={data.image} />
            </div>
            <div className="gap-8 pt-5 border-t border-primary/10">
              <div className="items-center text-center justify-center flex flex-col">
                <p className="text-3xl md:text-4xl font-bold text-primary ">
                    {data.hero_section_title}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                    {data.hero_section_subtitle}
                </p>
              </div>
              <div className="grid grid-cols-2 mt-20 md:grid-cols-3 gap-8 text-center">
                  {
                      data.hero_section_stat?.map((item, i) => (
                          <div key={i}>
                              <p className="text-3xl md:text-4xl font-bold text-primary">
                                  <AnimatedCounter
                                      target={item.quantity}
                                      suffix={item.suffix}
                                      duration={2000 + i * 200}
                                  />
                              </p>
                              <p className="text-sm text-muted-foreground mt-2">
                                  {item.title}
                              </p>
                          </div>
                      ))
                  }
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
  )
}
