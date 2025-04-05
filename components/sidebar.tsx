"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, ClipboardList, Truck, Users, FileSignature, BarChart, Settings, Home } from "lucide-react"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Contratos",
      icon: FileText,
      href: "/contratos",
      active: pathname === "/contratos",
    },
    {
      label: "Entregáveis",
      icon: ClipboardList,
      href: "/entregaveis",
      active: pathname === "/entregaveis",
    },
    {
      label: "Ordens de Serviço",
      icon: Truck,
      href: "/ordens-servico",
      active: pathname === "/ordens-servico",
    },
    {
      label: "Postos de Serviço",
      icon: Users,
      href: "/postos-servico",
      active: pathname === "/postos-servico",
    },
    {
      label: "Recaptulações",
      icon: FileSignature,
      href: "/recaptulacoes",
      active: pathname === "/recaptulacoes",
    },
    {
      label: "Relatórios",
      icon: BarChart,
      href: "/relatorios",
      active: pathname === "/relatorios",
    },
    {
      label: "Configurações",
      icon: Settings,
      href: "/configuracoes",
      active: pathname === "/configuracoes",
    },
  ]

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-muted/40">
      <div className="flex flex-col gap-2 p-4">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary",
              route.active ? "bg-muted text-primary" : "text-muted-foreground",
            )}
          >
            <route.icon className="h-4 w-4" />
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

