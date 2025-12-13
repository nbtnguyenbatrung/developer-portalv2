'use client'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { roleColumns } from './components/columns'
import { DataTable } from './components/data-table'
import { useSession } from 'next-auth/react'
import { IApplication } from '@/app/model/Application'
import LogoSpinner from '@/components/logo-spinner'
import {callApi} from "@/app/_service/utils/api";
import {useApi} from "@/hooks/use-api";

interface KeyGroup {
  environment: string
  applicationName: string
  appKey: IApplication[]
}
export default function ApiKeysPage() {
  const {callApi} = useApi()
  const [apiKeys, setApiKeys] = useState<IApplication[]>([])
  const { data: session } = useSession()
  const [t, setT] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)
  const fetchData = async () => {
    setIsLoading(true)
    try {
      if (!session) return
      const [data, t] = await Promise.all([
        callApi('post', '/api/application/get-all', {
          query: { user: session?.user.id },
        }),
        callApi('get', `/api/application/doc-security`)
      ])

      if (data.length > 0) {
        setApiKeys(data)
      }
      setT(t)
    } catch (error) {
      console.log('error :>> ', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const groupedKeys = apiKeys.reduce((acc, key) => {
    const groupKey = `${key.environment}`

    if (!acc[groupKey]) {
      acc[groupKey] = {
        environment: key.environment,
        applicationName: (key as any).applicationName,
        appKey: [],
      }
    }

    acc[groupKey].appKey.push(key)
    return acc
  }, {} as Record<string, KeyGroup>)

  const keyGroups = Object.values(groupedKeys)

  if (isLoading) {
    return (
      <section className="h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background py-10 md:py-20 lg:py-30">
        <LogoSpinner />
      </section>
    )
  }
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
        <p className="text-muted-foreground">{t.header.text}</p>
      </div>

      <div className="space-y-4">
        {keyGroups.map((group) => (
          <Card key={group.environment + group.applicationName}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">
                <Badge
                  variant={
                    group.environment === 'production' ? 'default' : 'secondary'
                  }
                  className="capitalize mr-2"
                >
                  {group.environment}
                </Badge>
                <span className="text-lg text-foreground">
                  {group.applicationName}
                </span>
              </CardTitle>
              <div className="text-xs text-muted-foreground">
                {group.appKey.length} Key(s)
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <DataTable columns={roleColumns} data={group.appKey} />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>🔒 {t.guide.header.mainTitle}</CardTitle>
          <CardDescription>
            {t.guide.header.subtitle}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <h4 className="font-semibold text-base">
            {t.guide.instructions.mainTitle}
          </h4>
          <p className="text-sm text-foreground">
              {t.guide.instructions.subtitle}
          </p>
          <div className="bg-gray-100 p-3 rounded-md border border-dashed text-sm font-mono overflow-auto">
              {t.guide.instructions.example}
          </div>
          <h4 className="font-semibold text-base mt-4">
              {t.guide.practices.mainTitle}
          </h4>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              {
                  t.guide.practices.content?.map((item: string, index: number)=> (
                      <li key={index}>{item}</li>
                  ))
              }
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
