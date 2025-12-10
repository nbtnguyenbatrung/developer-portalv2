"use client"

export function HeroSkeleton() {
    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-background via-background to-background/95 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
            <div className="w-full max-w-3xl space-y-8">
                {/* Badge skeleton */}
                <div className="flex justify-center">
                    <div className="h-8 w-48 bg-gradient-to-r from-muted to-muted/50 rounded-full shimmer-blue"></div>
                </div>

                {/* Title skeleton */}
                <div className="space-y-3">
                    <div className="h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg w-full shimmer-blue"></div>
                    <div className="h-12 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg w-5/6 mx-auto shimmer-blue"></div>
                </div>

                {/* Subtitle skeleton */}
                <div className="space-y-2">
                    <div className="h-6 bg-gradient-to-r from-blue-300/60 to-blue-400/40 rounded-lg w-4/5 mx-auto shimmer-blue"></div>
                    <div className="h-6 bg-gradient-to-r from-blue-300/40 to-blue-400/20 rounded-lg w-3/5 mx-auto shimmer-blue"></div>
                </div>

                {/* Buttons skeleton */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <div className="h-12 w-32 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shimmer-blue"></div>
                    <div className="h-12 w-32 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full shimmer-blue"></div>
                </div>
            </div>

            <style jsx>{`
        @keyframes shimmer-blue {
          0% {
            background-position: -1000px 0;
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
          100% {
            background-position: 1000px 0;
            opacity: 0.8;
          }
        }

        .shimmer-blue {
          animation: shimmer-blue 2.5s infinite;
          background-size: 1000px 100%;
          background-image: linear-gradient(
            90deg,
            transparent 0%,
            rgba(59, 130, 246, 0.4) 20%,
            rgba(96, 165, 250, 0.6) 50%,
            rgba(59, 130, 246, 0.4) 80%,
            transparent 100%
          );
        }
      `}</style>
        </div>
    )
}
