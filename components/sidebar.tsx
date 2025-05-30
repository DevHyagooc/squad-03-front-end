"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, Users, MapPin, Settings, Home, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
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
      label: "Empresas",
      icon: MapPin,
      href: "/pageInterna/empresas",
      active: pathname === "/pageInterna/empresas",
    },
    {
      label: "Colaboradores",
      icon: Users,
      href: "/pageInterna/colaboradores",
      active: pathname === "/pageInterna/colaboradores",
    },
    {
      label: "Configurações",
      icon: Settings,
      href: "/pageInterna/configuracoes",
      active: pathname === "/pageInterna/configuracoes",
    },
  ]

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 z-50 w-64 transform bg-background border-r transition-transform duration-300 ease-in-out overflow-y-auto",
          // Mobile: ocupa toda a altura da tela (do topo até embaixo)
          "top-0 h-full lg:top-16 lg:h-[calc(100vh-4rem)]",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        )}
      >
        {/* Header da sidebar no mobile (com logo) */}
        <div className="flex items-center justify-between p-4 border-b lg:hidden">
          <img src="/images/logoGetInfo.png" className="w-28" alt="Logo GetInfo" />
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Menu items */}
        <div className="flex flex-col gap-2 p-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => {
                // Fecha a sidebar no mobile após clicar em um link
                if (window.innerWidth < 1024) {
                  onClose()
                }
              }}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-cyan-600 hover:bg-muted/50",
                route.active ? "bg-muted text-cyan-600" : "text-muted-foreground",
              )}
            >
              <route.icon className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{route.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
