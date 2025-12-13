'use client'

import { ArrowRight } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {Product} from "@/types/api";
import {useTranslations} from "use-intl";

interface ServiceCardProps {
  product: Product
  Icon: any
}

export default function ServiceCard({ product, Icon }: ServiceCardProps) {
    const t = useTranslations("common")
    return (
    <Card className="h-full group relative overflow-hidden border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl min-h-[380px] flex flex-col">
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <CardHeader className="relative z-10 flex flex-col items-stretch">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          {product.badge && (
            <Badge
              variant={product.badge === 'Popular' ? 'default' : 'secondary'}
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
          {product.summary}
        </CardDescription>
      </CardHeader>

      <CardContent className="relative z-10 space-y-4 flex-1 flex flex-col justify-start">
        {/* Features List */}
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
              <div className="flex-1">
                  <Badge
                      variant={'secondary'}
                      className="bg-blue-500/10 text-primary dark:text-blue-400 py-2 px-4 mt-4"
                  >
                      <span className={"mr-0.5"}>{product.quantityApi}</span>
                      <span> APIs</span>
                  </Badge>
              </div>
              <Button
                  variant="ghost"
                  className="flex-1 w-full group/btn bg-primary/5 hover:bg-primary hover:text-white text-primary mt-4"
                  asChild
              >
                  <Link href={`/product/introduce/${product.slug}`}>
                      {t("introduce")}
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform"/>
                  </Link>
              </Button>
          </div>
      </CardFooter>
    </Card>
    )
}
