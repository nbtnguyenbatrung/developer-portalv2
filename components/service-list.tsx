"use client"

import { ChevronDown, ChevronRight } from "lucide-react"
import {useEffect, useState} from "react"
import type { ApiService, ApiEndpoint } from "@/types/api"
import { getMethodColor, cn } from "@/lib/utils"

interface ServiceListProps {
    services: ApiService[]
    selectedEndpoint: ApiEndpoint | null
    onSelectEndpoint: (endpoint: ApiEndpoint) => void
}

export default function ServiceList({ services, selectedEndpoint, onSelectEndpoint }: ServiceListProps) {
    const [expandedServices, setExpandedServices] = useState<Set<string>>(new Set(services.map((s) => s.id)))

    useEffect(() => {
        if (services)
            setExpandedServices(new Set(services.map((s) => s.id)))
    },[services])
    const toggleService = (serviceId: string) => {
        const newExpanded = new Set(expandedServices)
        if (newExpanded.has(serviceId)) {
            newExpanded.delete(serviceId)
        } else {
            newExpanded.add(serviceId)
        }
        setExpandedServices(newExpanded)
    }

    if (services.length === 0) {
        return (
            <div className="p-4 text-center text-muted-foreground">
                <p>No APIs found</p>
            </div>
        )
    }

    return (
        <div className="space-y-2 p-3">
            {services.map((service) => (
                <div key={service.id}>
                    {/* Service Header */}
                    <button
                        onClick={() => toggleService(service.id)}
                        className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors duration-200 flex items-center gap-2"
                    >
                        {expandedServices.has(service.id) ? (
                            <ChevronDown className="w-4 h-4 text-accent" />
                        ) : (
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        )}
                        <div className="flex-1">
                            <h3 className="font-semibold text-foreground text-sm">{service.name}</h3>
                            <p className="text-xs text-muted-foreground">{service.description}</p>
                        </div>
                    </button>

                    {/* Endpoints */}
                    {expandedServices.has(service.id) && (
                        <div className="space-y-1 pl-4">
                            {service?.endpoints?.map((endpoint) => (
                                <button
                                    key={endpoint.id}
                                    onClick={() => onSelectEndpoint(endpoint)}
                                    className={cn(
                                        "w-full text-left p-2.5 rounded-lg border transition-all duration-300 group hover:border-accent/50",
                                        selectedEndpoint?.id === endpoint.id
                                            ? "bg-accent/10 border-accent/50 shadow-lg shadow-accent/20"
                                            : "bg-muted border-border hover:bg-muted hover:opacity-75",
                                    )}
                                >
                                    <div className="flex items-start gap-2">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-0.5">
                        <span
                            className={cn("px-1.5 py-0.5 rounded text-xs font-semibold", getMethodColor(endpoint.method))}
                        >
                          {endpoint.method}
                        </span>
                                                <h4 className="font-semibold text-foreground text-xs group-hover:text-accent transition-colors">
                                                    {endpoint.name}
                                                </h4>
                                            </div>
                                            <p className="text-xs text-muted-foreground truncate font-mono">{endpoint.path}</p>
                                        </div>
                                        <ChevronRight
                                            className={cn(
                                                "w-3 h-3 text-muted-foreground transition-all duration-300 flex-shrink-0",
                                                selectedEndpoint?.id === endpoint.id && "text-accent translate-x-1",
                                            )}
                                        />
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
