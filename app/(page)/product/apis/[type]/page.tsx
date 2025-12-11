"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import {Menu, Search, X} from "lucide-react";
import ServiceList from "@/components/service-list";
import RequestBuilder from "@/components/request-builder";
import ResponseViewer from "@/components/response-viewer";
import { ApiService, ApiEndpoint, SwaggerSpec } from "@/types/api";
import { swaggerToApiServices } from "@/script/convert-swagger";
import axios from "axios";
import { useParams } from "next/navigation";
import { useLanguage } from "@/contexts/language-context";
import { Description } from "@/components/description";

export default function Home() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(
    null
  );
  const [selectedResponse, setSelectedResponse] = useState(0);
  const [API_SERVICES, setAPI_SERVICES] = useState<ApiService[] | []>([]);
  const rightRef = useRef<HTMLDivElement>(null);
  const [leftHeight, setLeftHeight] = useState(0);
  const { type } = useParams();
  const [isTocOpen, setIsTocOpen] = useState(false);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_MIS_BASE_URL + "/api/files", {
        params: {
          nameFile: type,
        },
      })
      .then((r) => {
        let arr: ApiService[] = [];
        r.data.forEach((data: any) => {
          const swagger: SwaggerSpec = data;
          const apiObs = swaggerToApiServices(swagger, data);
          arr = arr.concat(apiObs);
        });
        setAPI_SERVICES(arr);
      });
  }, []);

  const filteredServices = useMemo(() => {
    if (!searchQuery) return API_SERVICES;

    const query = searchQuery.toLowerCase();
    return API_SERVICES.map((service) => ({
      ...service,
      endpoints: service?.endpoints?.filter(
        (endpoint) =>
          endpoint.name.toLowerCase().includes(query) ||
          endpoint.path.toLowerCase().includes(query) ||
          endpoint.description.toLowerCase().includes(query)
      ),
    })).filter(
      (service) => service?.endpoints?.length && service?.endpoints?.length > 0
    );
  }, [searchQuery, API_SERVICES]);

  // Auto-select first matching API when searching
  // @ts-ignore
  const displayedEndpoint =
    selectedEndpoint &&
    filteredServices.some((s) =>
      s?.endpoints?.some((e) => e.id === selectedEndpoint.id)
    )
      ? selectedEndpoint
      : filteredServices?.[0]?.endpoints?.[0] || null;

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => setLeftHeight(entry.target.clientHeight));
    });

    if (rightRef.current) {
      observer.observe(rightRef.current);
    }

    return () => observer.disconnect();
  }, [displayedEndpoint]);

  return (
    <main className="w-full bg-background">
      {/* Main Content */}
      <div className={`flex overflow-hidden max-lg:flex-col`}>
        {/* Left Sidebar - API List */}
        <div
          className={`w-max lg:w-80 lg:border-r border-border flex flex-col bg-sidebar height-[${filteredServices.length === 0 ? 200 : leftHeight}] lg:h-max`}
        >
          {/* Search */}
          <div className="p-4 border-b border-border max-lg:flex max-lg:gap-2">
              <button
                  onClick={() => setIsTocOpen(!isTocOpen)}
                  className="lg:hidden px-3 py-2 rounded-lg text-foreground hover:bg-muted border border-border transition-colors flex items-center"
                  aria-label="Toggle Table of Contents"
              >
                  {isTocOpen ? (
                      <>
                          <X className="h-4 w-4" />
                      </>
                  ) : (
                      <>
                          <Menu className="h-4 w-4" />
                      </>
                  )}
              </button>
            <div className="relative max-lg:w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t("searchApi")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* API List */}
            {isTocOpen && (
                <div
                    className="absolute inset-0 z-20 bg-black/50"
                    onClick={() => setIsTocOpen(false)}
                >
                    <div
                        className="absolute left-0 top-0 bottom-0 w-3/4 max-w-xs bg-card overflow-y-auto shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsTocOpen(false)}
                            className="absolute top-[5rem] right-4 p-2 rounded-full text-2xl text-foreground hover:bg-muted font-bold leading-none z-10"
                            aria-label="Close Table of Contents"
                        >
                            <X className="mr-2 h-4 w-4" />
                        </button>

                        <div className="pt-[8rem] px-4 pb-4">
                            <ServiceList
                                services={filteredServices}
                                selectedEndpoint={displayedEndpoint}
                                onSelectEndpoint={setSelectedEndpoint}
                            />
                        </div>
                    </div>
                </div>
            )}
          <div className="flex-1 overflow-y-auto max-lg:hidden">
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
                  type={type as string}
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
  );
}
