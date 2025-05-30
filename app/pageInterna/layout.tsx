"use client"

import type React from "react"
import { useState, useEffect } from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Toaster } from "@/components/ui/toaster"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Fecha a sidebar quando a tela for redimensionada para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <div className="min-h-screen bg-background overflow-x-hidden">
        {/* Header fixo */}
        <Header onMenuClick={toggleSidebar} />

        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        {/* Conteúdo principal com padding-top para compensar o header fixo */}
        <main className="pt-16 min-h-screen lg:ml-64">
          <div className="w-full max-w-full p-4 md:p-6">
            <div className="w-full max-w-full overflow-hidden">{children}</div>
          </div>
        </main>
      </div>
      <Toaster />
    </ThemeProvider>
  )
}
