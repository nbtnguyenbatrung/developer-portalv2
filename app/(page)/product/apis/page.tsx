'use client'

import RequestBuilder from '@/components/request-builder'
import ResponseViewer from '@/components/response-viewer'
import ServiceList from '@/components/service-list'
import { swaggerToApiServices } from '@/script/convert-swagger'
import { ApiEndpoint, ApiService, SwaggerSpec } from '@/types/api'
import { Search } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios'
import {useLanguage} from "@/contexts/language-context";
import {callApi} from "@/app/_service/utils/api";
import LogoSpinner from "@/components/logo-spinner";

export default function Home() {
  const {t} = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(
    null,
  )
  const [selectedResponse, setSelectedResponse] = useState(0)
  const [API_SERVICES, setAPI_SERVICES] = useState<ApiService[] | []>([])
  const rightRef = useRef<HTMLDivElement>(null)
  const [leftHeight, setLeftHeight] = useState(0)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const loadData = async () => {
          setIsLoading(true);
          try {
              const r = await callApi("get", '/api/files', null, {
                  params: {
                      nameFile: '',
                  },
              })
              let arr: ApiService[] = []
              r.forEach((data: any) => {
                  const swagger: SwaggerSpec = data
                  const apiObs = swaggerToApiServices(swagger, data)
                  arr = arr.concat(apiObs)
              })
              setAPI_SERVICES(arr)
          } catch (error) {
              console.error("Failed to load hero data:", error);
          } finally {
              setIsLoading(false);
          }
      };

      loadData();
  }, [])

  const filteredServices = useMemo(() => {
    if (!searchQuery) return API_SERVICES

    const query = searchQuery.toLowerCase()
    return API_SERVICES.map((service) => ({
      ...service,
      endpoints: service?.endpoints?.filter(
        (endpoint) =>
          endpoint.name.toLowerCase().includes(query) ||
          endpoint.path.toLowerCase().includes(query) ||
          endpoint.description.toLowerCase().includes(query),
      ),
    })).filter(
      (service) => service?.endpoints?.length && service?.endpoints?.length > 0,
    )
  }, [searchQuery, API_SERVICES])

  // Auto-select first matching API when searching
  // @ts-ignore
  const displayedEndpoint =
    selectedEndpoint &&
    filteredServices.some((s) =>
      s?.endpoints?.some((e) => e.id === selectedEndpoint.id),
    )
      ? selectedEndpoint
      : filteredServices?.[0]?.endpoints?.[0] || null

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => setLeftHeight(entry.target.clientHeight))
    })

    if (rightRef.current) {
      observer.observe(rightRef.current)
    }

    return () => observer.disconnect()
  }, [displayedEndpoint])

    if (isLoading) {
        return (
            <main className="h-screen flex items-center justify-center w-full bg-background">
                <LogoSpinner />
            </main>
        );
    }

  return (
    <main className="w-full bg-background">
      {/* Main Content */}
      <div className={`flex overflow-hidden`}>
        {/* Left Sidebar - API List */}
        <div
          className="w-80 border-r border-border flex flex-col bg-sidebar"
          style={{
            height: filteredServices.length === 0 ? 200 : leftHeight,
          }}
        >
          {/* Search */}
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t('searchApi')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* API List */}
          <div className="flex-1 overflow-y-auto">
            <ServiceList
              services={filteredServices}
              selectedEndpoint={displayedEndpoint}
              onSelectEndpoint={setSelectedEndpoint}
            />
          </div>
        </div>

        {/* Right Content */}
        <div
          ref={rightRef}
          className="flex-1 overflow-hidden flex flex-col h-max"
        >
          {displayedEndpoint ? (
            <>
              {/* Request Builder Section */}
              <div className=" border-b border-border bg-card">
                <RequestBuilder
                  api={displayedEndpoint}
                  onResponseSelect={setSelectedResponse}
                  type={""}
                />
              </div>

              {/* Response Viewer Section */}
              <div className=" bg-background backdrop-blur-sm">
                <ResponseViewer
                  api={displayedEndpoint}
                  selectedResponseIndex={selectedResponse}
                  onSelectResponse={setSelectedResponse}
                />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground text-lg">No APIs found</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
