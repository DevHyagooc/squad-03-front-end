// app/pageAdmin/layout.tsx
import type { ReactNode } from "react"
import { Inter } from "next/font/google"
import { AuthProvider } from "@/context/auth-context"
import "@/app/globals2.css"   // se precisar das mesmas classes globais

const inter = Inter({ subsets: ["latin"] })

export default function PageAdminLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    // tudo que vier aqui vai direto dentro do <body> do root
    <AuthProvider>
      <div className={inter.className}>
        {children}
      </div>
    </AuthProvider>
  )
}
