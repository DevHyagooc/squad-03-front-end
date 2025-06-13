// app/pageInterna/layout.tsx
"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/toaster";

import Cookies from "js-cookie"

interface PageInternaLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: PageInternaLayoutProps) {
  const router = useRouter();

  // 1) Estado para controlar se já verificamos o JWT
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);

  // 2) Estado para controlar a abertura/fechamento da sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 3) useEffect para, ao montar o layout, checar se existe token em localStorage
  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (!token) {
      // Se não houver token, redireciona para a página de login
      // Ajuste "/pageLogin" caso o seu caminho de login seja outro (ex: "/login")
      router.replace("/");
    } else {
      // Se existir token, sinaliza que podemos renderizar as children
      setCheckingAuth(false);
    }
  }, [router]);

  // 4) Enquanto estiver checando (checkingAuth === true), retornamos null para não exibir nada.
  if (checkingAuth) {
    return null;
  }

  // 5) Assim que checkingAuth for false, renderizamos o layout completo:
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-background overflow-x-hidden">
        {/* Header fixo */}
        <Header onMenuClick={() => setSidebarOpen((prev) => !prev)} />

        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Conteúdo principal com padding-top para compensar o header fixo */}
        <main className="pt-16 min-h-screen lg:ml-64">
          <div className="w-full max-w-full p-4 md:p-6">
            <div className="w-full max-w-full overflow-hidden">{children}</div>
          </div>
        </main>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
