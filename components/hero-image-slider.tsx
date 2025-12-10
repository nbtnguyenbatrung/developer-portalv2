"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type {ApiEndpoint, ApiService} from "@/types/api";

interface HeroImageSliderProps {
    SLIDER_IMAGES: Array<string>
}

export function HeroImageSlider({SLIDER_IMAGES} : HeroImageSliderProps) {
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDER_IMAGES.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [autoPlay])

  const next = () => {
    setCurrent((prev) => (prev + 1) % SLIDER_IMAGES.length)
    setAutoPlay(false)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + SLIDER_IMAGES.length) % SLIDER_IMAGES.length)
    setAutoPlay(false)
  }

  return (
    <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden group">
      {SLIDER_IMAGES.map((image, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-500 ${idx === current ? "opacity-100" : "opacity-0"}`}
        >
          <img
            src={image || "/placeholder.svg"}
            alt={`Banking Dashboard ${idx + 1}`}
            className="w-full h-full object-cover rounded-2xl shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent rounded-2xl" />
        </div>
      ))}

      <Button
        variant="ghost"
        size="icon"
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDER_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrent(idx)
              setAutoPlay(false)
            }}
            className={`h-2 rounded-full transition-all ${
              idx === current ? "bg-primary w-8" : "bg-white/50 w-2 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
