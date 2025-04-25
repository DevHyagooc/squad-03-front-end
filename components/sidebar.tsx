"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, ClipboardList, Truck, Users, MapPin, FileSignature, BarChart, Settings, Home } from "lucide-react"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/pageInterna",
      active: pathname === "/pageInterna",
    },
    {
      label: "Contratos",
      icon: FileText,
      href: "/pageInterna/contratos",
      active: pathname === "/pageInterna/contratos",
    },
    {
      label: "Entregáveis",
      icon: ClipboardList,
      href: "/pageInterna/entregaveis",
      active: pathname === "/pageInterna/entregaveis",
    },
    {
      label: "Funcionários",
      icon: Users,
      href: "/pageInterna/funcionarios",
      active: pathname === "/pageInterna/funcionarios",
    },
    {
      label: "Ordens de Serviço",
      icon: Truck,
      href: "/pageInterna/ordens-servico",
      active: pathname === "/pageInterna/ordens-servico",
    },
    {
      label: "Postos de Serviço",
      icon: MapPin,
      href: "/pageInterna/postos-servico",
      active: pathname === "/pageInterna/postos-servico",
    },
    {
      label: "Relatórios",
      icon: BarChart,
      href: "/pageInterna/relatorios",
      active: pathname === "/pageInterna/relatorios",
    },
    {
      label: "Configurações",
      icon: Settings,
      href: "/pageInterna/configuracoes",
      active: pathname === "/pageInterna/configuracoes",
    },
  ]

  return (
    <div className="sticky flex h-screen w-64 flex-col border-r bg-muted/40">
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

