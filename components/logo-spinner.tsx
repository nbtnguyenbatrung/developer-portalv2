"use client"

import {LogoNapas} from "@/public/icon/icon-napas";

export default function LogoSpinner() {
    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <div className="relative w-16 h-16">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-green-400 to-blue-600 opacity-20 blur-xl animate-pulse"></div>

                {/* Middle rotating ring */}
                <div
                    className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-400 border-r-green-400 animate-spin"
                    style={{ animationDuration: "2s" }}
                ></div>

                {/* SVG Logo with rotation */}
                <div
                    className="absolute inset-0 flex items-center justify-center animate-spin"
                    style={{ animationDuration: "3s" }}
                >
                    <LogoNapas/>
                </div>

                {/* Inner pulsing circle */}
                <div
                    className="absolute inset-2 rounded-full border border-blue-400 opacity-30 animate-pulse"
                    style={{ animationDuration: "2s" }}
                ></div>
            </div>

            {/* Loading text */}
            <style>{`
                @keyframes shimmer {
                  0%, 100% { opacity: 0.5; }
                  50% { opacity: 1; }
                }
                .animate-shimmer {
                  animation: shimmer 1.5s ease-in-out infinite;
                }
              `}</style>

            <div className="bottom-20 flex items-center gap-1">
                <span className="text-sm text-gray-400 font-medium">Loading</span>
                <span className="flex gap-1">
                    <span className="w-1 h-1 bg-blue-400 rounded-full animate-shimmer" style={{ animationDelay: "0s" }}></span>
                    <span className="w-1 h-1 bg-green-400 rounded-full animate-shimmer" style={{ animationDelay: "0.3s" }}></span>
                    <span className="w-1 h-1 bg-blue-400 rounded-full animate-shimmer" style={{ animationDelay: "0.6s" }}></span>
                </span>
            </div>
        </div>
    )
}

/*"use client"

import {LogoNapas} from "@/public/icon/icon-napas";

export default function LogoSpinner() {
    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <div className="relative w-40 h-40 rounded-full flex items-center justify-center">
                {/!* Rotating border *!/}
                <div
                    className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-green-500 border-b-blue-600 border-spin"
                    style={{ animationDuration: "13s" }}
                />

                {/!* Existing code *!/}
                <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 flex items-center justify-center shadow-lg">
                    {/!* SVG Logo with rotation *!/}
                    <div className="animate-spin" style={{ animationDuration: "4s" }}>
                        <LogoNapas/>
                    </div>
                </div>
            </div>

            <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 via-green-500 to-blue-700 bg-clip-text text-transparent">
        Loading
      </span>
        </div>
    )
}*/
