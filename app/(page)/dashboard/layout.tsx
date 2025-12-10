import type React from "react"
import type { Metadata } from "next"
import { Sidebar } from "@/components/dashboard/sidebar"
import ProtectedRoute from "@/components/protected-route"

export const metadata: Metadata = {
  title: "Dashboard - Napas Developer Portal",
  description: "Manage your Napas API integrations",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <Sidebar />
        <main className="relative py-6 lg:gap-10 lg:py-8">{children}</main>
      </div>
    </ProtectedRoute>
  )
}
