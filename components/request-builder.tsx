'use client'

import { Copy, Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { ApiEndpoint } from '@/types/api'
import { JsonHighlight } from '@/components/response-viewer'
import axios from 'axios'
import LogoSpinner from '@/components/logo-spinner'
import {useLanguage} from "@/contexts/language-context";

interface RequestBuilderProps {
  api: ApiEndpoint
  onResponseSelect: (index: number) => void
  type: string
}

const HEADERS = 'headers'
const PARAMS = 'params'
const BODY = 'body'

export default function RequestBuilder({
  api,
  onResponseSelect,
  type
}: RequestBuilderProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null)
  const [copiedJson, setCopiedJson] = useState(false)
  const [headers, setHeaders] = useState<
    Array<{
      key: string
      value: string
      required: boolean
      type: string
      description: string
    }>
  >(api?.headers || [])
  const [params, setParams] = useState<
    Array<{
      key: string
      value: string
      required: boolean
      type: string
      description: string
      in: string
    }>
  >(api?.params || [])
  const [body, setBody] = useState<any>('')
  const [responseView, setResponseView] = useState<boolean>(false)
  const [response, setResponse] = useState<any>()
  const [loading, setLoading] = useState(false)
  const {t} = useLanguage()

  useEffect(() => {
    if (api) {
      setHeaders(api?.headers || [])
      setParams(api?.params || [])
      setBody(formatJSON(api?.body || ''))
      setResponseView(false)
    }
  }, [api])

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text)
    setCopiedSection(section)
    setTimeout(() => setCopiedSection(null), 2000)
  }

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(api.body, null, 2))
    setCopiedJson(true)
    setTimeout(() => setCopiedJson(false), 2000)
  }

  const onChange = (key1: string, key2: string, value: any) => {
    if (key1 === HEADERS) {
      setHeaders((prev) =>
        prev.map((h) => (h.key === key2 ? { ...h, value } : h)),
      )
    } else if (key1 === PARAMS) {
      setParams((prev) =>
        prev.map((h) => (h.key === key2 ? { ...h, value } : h)),
      )
    } else if (key1 === BODY) {
      setBody(value)
    }
  }

  function replacePathParams(path: string, params: any) {
    return params.reduce((acc: any, p: any) => {
      const pattern = `{${p.key}}`
      if (acc.includes(pattern)) {
        return acc.replace(pattern, p.value || '')
      }
      return acc
    }, path)
  }

  function getParams(queryParams: any) {
    return queryParams.reduce((acc: any, item: any) => {
      acc[item.key] = item.value
      return acc
    }, {})
  }

  const sendApi = async () => {
    setLoading(true)
    let url = api.server + api.path
    const pathParam = params?.filter((item) => item.in === 'path')
    const pathQuery = params?.filter((item) => item.in === 'query')
    if (pathParam && pathParam.length > 0) {
      url = replacePathParams(url, pathParam)
    }
    let queryParams = {}
    if (pathQuery && pathQuery.length > 0) {
      queryParams = getParams(pathQuery || [])
    }
    let headersValue = {}
    if (headers) {
      headersValue = getParams(headers || [])
    }
    const timerId = setTimeout(async () => {
      try {
        const res = await axios.request({
          url,
          method: api.method,
          data: body,
          headers: {
            'Content-Type': 'application/json',
            ...headersValue,
          },
          params: queryParams,
        })
        setResponse(res.data)
      } catch (e: any) {
        setResponse({
          status: 500,
          data: {
            description: e?.message,
            code: e?.code,
          },
        })
      } finally {
        setLoading(false)
        setResponseView(true)
      }
    }, 500)

    return () => {
      clearTimeout(timerId)
    }
  }

  const formatJSON = (data: any) => {
    try {
      return JSON.stringify(data, null, 2)
    } catch {
      return String(data)
    }
  }

  return (
    <div className="space-y-6 p-6">
      {/* API Info */}
      <div className="bg-gradient-to-r from-card to-muted border border-border rounded-lg px-4 py-2 animate-fade-in">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground">{t(type)}</h2>
            {/*<p className="text-muted-foreground">{api.description}</p>*/}
          </div>
        </div>
      </div>

      {/* Method & URL */}
      <div className="space-y-1 animate-fade-in animation-delay-100">
        <label className="text-sm font-semibold text-foreground flex items-center gap-2">
          <span>Request Method & URL</span>
        </label>
        <div className="flex gap-2">
          <div className="px-4 py-2 bg-card border border-border rounded-lg font-semibold text-accent flex items-center">
            {api.method}
          </div>
          <div className="flex-1 relative group">
            <input
              type="text"
              value={api.path}
              readOnly
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              onClick={() => copyToClipboard(api.path, 'url')}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {copiedSection === 'url' ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-muted-foreground hover:text-accent" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Headers */}
      {api.headers && api.headers.length > 0 && (
        <div className="space-y-3 animate-fade-in animation-delay-150">
          <label className="text-sm font-semibold text-foreground">
            Headers{' '}
            {api.headers.some((h) => h.required) && (
              <span className="text-destructive">*</span>
            )}
          </label>
          {/*<div className="space-y-2 bg-muted border border-border rounded-lg p-3">
                        {api.headers.map((header, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-sm">
                <span
                    className={cn(
                        "px-2 py-1 rounded text-xs font-mono",
                        header.required ? "bg-destructive/20 text-destructive" : "bg-muted text-muted-foreground",
                    )}
                >
                  {header.required ? "Required" : "Optional"}
                </span>
                                <span className="font-mono text-foreground flex-1">
                  <span className="text-accent">{header.key}:</span> {header.value}
                </span>
                            </div>
                        ))}
                    </div>*/}

          <table className="min-w-full divide-y divide-border">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Value
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {api.headers.map((param, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 text-sm font-mono">
                    {param.key}
                    {param.required && (
                      <span className="text-destructive">*</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <input
                      type="text"
                      value={headers[index]?.value || ''}
                      onChange={(e) => {
                        onChange(HEADERS, param.key, e.target.value)
                      }}
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Parameters */}
      {api.params && api.params.length > 0 && (
        <div className="space-y-3 animate-fade-in animation-delay-200">
          <label className="text-sm font-semibold text-foreground">
            Parameters{' '}
            {api.params.some((p) => p.required) && (
              <span className="text-destructive">*</span>
            )}
          </label>
          {/*<div className="space-y-2 bg-muted border border-border rounded-lg p-3">
                        {api.params.map((param, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-sm">
                <span
                    className={cn(
                        "px-2 py-1 rounded text-xs font-mono whitespace-nowrap",
                        param.required ? "bg-destructive/20 text-destructive" : "bg-muted text-muted-foreground",
                    )}
                >
                  {param.required ? "Required" : "Optional"}
                </span>
                                <span className="font-mono text-foreground">
                  <span className="text-accent">{param.key}</span> ={" "}
                                    <span className="text-secondary">{param.value}</span>
                </span>
                            </div>
                        ))}
                    </div>*/}

          <table className="min-w-full divide-y divide-border">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Value
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {api.params.map((param, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 text-sm font-mono">
                    {param.key}
                    {param.required && (
                      <span className="text-destructive">*</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <input
                      type="text"
                      value={params[index]?.value || ''}
                      onChange={(e) => {
                        onChange(PARAMS, param.key, e.target.value)
                      }}
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Request Body */}
      {api.body && typeof api.body === 'object' && (
        /*<div className="space-y-3 animate-fade-in animation-delay-250">
                    <label className="text-sm font-semibold text-foreground">
                        Request Body <span className="text-destructive">*</span>
                    </label>
                    <div className="bg-muted border border-border rounded-lg p-3 font-mono text-sm space-y-1">
                        {Object.entries(api.body).map(([key, value]) => (
                            <div key={key}>
                                <span className="text-accent">"{key}"</span>: <span className="text-secondary">{String(value)}</span>
                            </div>
                        ))}
                    </div>
                </div>*/
        <div className="flex-1 space-y-4 overflow-y-auto">
          <div className="bg-muted border border-border rounded-lg overflow-hidden animate-slide-in animation-delay-100">
            <div className="flex items-center justify-between bg-muted/60 border-b border-border px-4 py-3">
              <span className="text-sm font-semibold text-foreground">
                Request Body
              </span>
              <button
                onClick={copyJson}
                className="flex items-center gap-2 text-xs px-2 py-1 bg-border hover:bg-border/50 text-foreground rounded transition-colors"
              >
                {copiedJson ? (
                  <>
                    <Check className="w-3 h-3 text-green-600" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="overflow-x-auto bg-card">
              <textarea
                value={body}
                onChange={(e) => {
                  onChange(BODY, '', e.target.value)
                }}
                placeholder="Request body (JSON, XML, etc.)"
                className="w-full h-[200px] p-3 bg-background rounded-md font-mono text-sm resize-none"
              />
              {/*<pre className="text-sm font-mono text-foreground whitespace-pre-wrap break-words">
                            <JsonHighlight json={JSON.stringify(api.body, null, 2)} />
                          </pre>*/}
            </div>
          </div>
        </div>
      )}

      {/* Send Button */}
      <div className={'flex gap-2'}>
        <button
          onClick={sendApi}
          className="w-full py-2 bg-gradient-to-r from-accent to-primary hover:from-accent hover:to-primary text-accent-foreground font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 active:scale-95 animate-fade-in animation-delay-300"
        >
          Send Request
        </button>
        {responseView && (
          <button
            onClick={() => setResponseView(false)}
            className="w-full py-2 bg-gradient-to-r from-accent to-primary hover:from-accent hover:to-primary text-accent-foreground font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 active:scale-95 animate-fade-in animation-delay-300"
          >
            Clear
          </button>
        )}
      </div>
      {loading && <LogoSpinner />}
      {responseView && !loading && (
        <div className="p-1 h-full flex flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto">
            {/* Response Body */}
            <div className="bg-muted border border-border rounded-lg overflow-hidden animate-slide-in animation-delay-100">
              <div className="flex items-center justify-between bg-muted/60 border-b border-border px-4 py-3">
                <span className="text-sm font-semibold text-foreground">
                  Response {response.status}
                </span>
                <button
                  onClick={copyJson}
                  className="flex items-center gap-2 text-xs px-2 py-1 bg-border hover:bg-border/50 text-foreground rounded transition-colors"
                >
                  {copiedJson ? (
                    <>
                      <Check className="w-3 h-3 text-green-600" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="p-4 overflow-x-auto bg-card">
                <pre className="text-sm font-mono text-foreground whitespace-pre-wrap break-words">
                  <JsonHighlight
                    json={JSON.stringify(
                      response?.data || response?.description,
                      null,
                      2,
                    )}
                  />
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
