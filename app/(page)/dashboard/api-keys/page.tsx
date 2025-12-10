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
import { callApi } from '@/app/_service/utils/api'
import { useSession } from 'next-auth/react'
import { IApplication } from '@/app/model/Application'
import { useLanguage } from '@/contexts/language-context'
import LogoSpinner from '@/components/logo-spinner'

interface KeyGroup {
  environment: string
  applicationName: string
  appKey: IApplication[]
}
export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<IApplication[]>([])
  const { data: session } = useSession()
  const { language } = useLanguage()
  const [t, setT] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)
  const fetchData = async () => {
    try {
      if (!session) return
      const [data, t] = await Promise.all([
        callApi('post', '/api/application/get-all', {
          query: { user: session?.user.id },
        }),
        fetchLanguage,
      ])

      if (data.length > 0) {
        setApiKeys(data)
      }
    } catch (error) {
      console.log('error :>> ', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchLanguage = async () => {
    const t = await callApi('get', `/api/application/${language}`)
    setT(t)
  }

  useEffect(() => {
    fetchLanguage()
  }, [language])

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
        <p className="text-muted-foreground">{t.dashboard_api_key_header}</p>
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
          <CardTitle>🔒 {t.dashboard_api_key_guide_header}</CardTitle>
          <CardDescription>
            {t.dashboard_api_key_guide_sub_title}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <h4 className="font-semibold text-base">
            {t.dashboard_api_key_guide_content_1}
          </h4>
          <p className="text-sm text-foreground">
            {t.dashboard_api_key_guide_content_2}
          </p>
          <div className="bg-gray-100 p-3 rounded-md border border-dashed text-sm font-mono overflow-auto">
            {t.dashboard_api_key_guide_content_3}
          </div>
          <h4 className="font-semibold text-base mt-4">
            {t.dashboard_api_key_guide_content_4}
          </h4>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>{t.dashboard_api_key_guide_content_5}</li>
            <li>{t.dashboard_api_key_guide_content_6}</li>
            <li>{t.dashboard_api_key_guide_content_7}</li>
            <li>{t.dashboard_api_key_guide_content_8}</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
