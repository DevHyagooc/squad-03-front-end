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
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1">
          <div className="fixed top-16 w-64 h-screen bg-muted/40 z-10">
            <Sidebar />
          </div>
          <main className="flex-1 ml-64 overflow-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}

