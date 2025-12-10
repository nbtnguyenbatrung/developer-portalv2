'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import LogoNapas from './icon-napas'

interface LogoProps {
  asLink?: boolean
}

export function Logo({ asLink = true }: LogoProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const logoContent = isMobile ? (
    <LogoNapas className="h-8 w-8 rounded-md" size={30} />
  ) : (
    <img
      src="/logo-napas.png"
      alt="Napas Logo"
      className="h-8 w-32 rounded-md"
      style={{ objectFit: "contain" }}
    />
  )

  if (asLink) {
    return (
      <Link href="/" className="flex items-center gap-2">
        {logoContent}
      </Link>
    )
  }

  return <div className="flex items-center gap-2">{logoContent}</div>
}
