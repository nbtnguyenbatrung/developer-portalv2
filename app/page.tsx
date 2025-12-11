'use client'

import { FeatureSection } from '@/components/feature-section'
import { HeroSection } from '@/components/hero-section'
import { ProductsSection } from '@/components/products-section'
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
import { ExternalLink } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Home() {
  const { data: session } = useSession()
  const { t } = useLanguage()
  return (
    <div className="flex flex-col gap-8 pb-16">
      <div className="fade-in-up">
        <HeroSection />
      </div>

      <div className="fade-in-up">
        <FeatureSection />
      </div>

      <div className="fade-in-up">
        <ProductsSection />
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
