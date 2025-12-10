import { BackToTopButton } from '@/components/back-to-top-button'
import Footer from '@/components/footer'
import Header from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/contexts/auth-context'
import { LanguageProvider } from '@/contexts/language-context'
import { authOptions } from '@/lib/auth-options'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { Inter } from 'next/font/google'
import type React from 'react'
import './globals.css'
import {Breadcrumb} from "@/components/breadcrumb";
import {Description} from "@/components/description";
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    icons: "/icon-napas.svg",
  title: 'Napas Developer Portal',
  description:
    'Access APIs, documentation, and tools to integrate with NexusBank banking services',
  generator: 'TTDT Department',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions)
  return (
    <html lang="vi" suppressHydrationWarning>
    <head>
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <title></title>
    </head>
      <body className={`${inter.className} min-h-screen bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <AuthProvider session={session}>
              <div className="flex min-h-screen flex-col">
                <Header />
                {/* <Breadcrumb />
                <Description/> */}
                <div className="flex-1 container">{children}</div>
                <Footer />
                <BackToTopButton />
              </div>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
