"use client"

import { Copy, Check, AlertCircle, CheckCircle, XCircle } from "lucide-react"
import { useState } from "react"
import type {ApiEndpoint} from "@/types/api"
import { cn } from "@/lib/utils"

interface ResponseViewerProps {
    api: ApiEndpoint
    selectedResponseIndex: number
    onSelectResponse: (index: number) => void
}

export default function ResponseViewer({ api, selectedResponseIndex, onSelectResponse }: ResponseViewerProps) {
    const [copiedJson, setCopiedJson] = useState(false)
    const response = api.responses[selectedResponseIndex]

    const copyJson = () => {
        navigator.clipboard.writeText(JSON.stringify(response.data, null, 2))
        setCopiedJson(true)
        setTimeout(() => setCopiedJson(false), 2000)
    }

    return (
        <div className="p-6 h-full flex flex-col">
            <h3 className="text-lg font-semibold text-foreground mb-4">Response Examples</h3>

            {/* Status Tabs */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2 pl-3 pt-3">
                {api.responses.map((resp, idx) => (
                    <button
                        key={idx}
                        onClick={() => onSelectResponse(idx)}
                        className={cn(
                            "px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-300 flex items-center gap-2 whitespace-nowrap",
                            selectedResponseIndex === idx
                                ? cn("ring-2 ring-offset-2 ring-offset-background")
                                : "bg-muted border-border text-muted-foreground hover:border-border/50",
                        )}
                    >
                        {resp.status}
                    </button>
                ))}
            </div>

            {/* Response Content */}
            {response && (
                <div className="flex-1 space-y-4 overflow-y-auto">
                    {/* Response Body */}
                    <div className="bg-muted border border-border rounded-lg overflow-hidden animate-slide-in animation-delay-100">
                        <div className="flex items-center justify-between bg-muted/60 border-b border-border px-4 py-3">
                            <span className="text-sm font-semibold text-foreground">Response Body</span>
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
                <JsonHighlight json={JSON.stringify(response.data || response.description, null, 2)} />
              </pre>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export function JsonHighlight({ json }: { json: string }) {
    return (
        <>
            {json?.split("\n").map((line, idx) => {
                const keyMatch = line.match(/^(\s*)"([^"]+)"/)
                const isKey = keyMatch !== null

                return (
                    <div key={idx} className="leading-relaxed">
                        {isKey ? (
                            <>
                                <span className="text-muted-foreground">{keyMatch[1]}</span>
                                <span className="text-accent">"{keyMatch[2]}"</span>
                                <span className="text-muted-foreground">{line.slice(keyMatch[0].length)}</span>
                            </>
                        ) : (
                            <span className="text-muted-foreground">{line}</span>
                        )}
                    </div>
                )
            })}
        </>
    )
}
