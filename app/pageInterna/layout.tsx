import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <div className="min-h-screen flex flex-col">
        {/* Header fixo */}
        <div className="fixed top-0 left-0 w-full z-20">
          <Header />
        </div>
        <div className="flex flex-1 pt-16">
          {/* Sidebar fixo à esquerda */}
          <div className="fixed top-16 left-0 w-64 h-screen bg-muted/40 z-10">
            <Sidebar />
          </div>
          {/* Conteúdo principal com scroll horizontal */}
          <main className="flex-1 ml-64 overflow-x-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
