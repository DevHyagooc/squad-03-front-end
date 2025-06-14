"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, Users, MapPin, Home, X, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { getUserProfile, isAdmin, getDisplayRoles, type UserProfile } from "@/services/perfil"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const profile = await getUserProfile()
        console.log("✅ Perfil carregado:", profile)
        console.log("✅ É admin?", isAdmin(profile))
        setUserProfile(profile)
      } catch (error) {
        console.error("Erro ao carregar perfil do usuário:", error)
      } finally {
        setLoading(false)
      }
    }

    loadUserProfile()
  }, [])

  const baseRoutes = [
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
  ]

  // Rotas que só aparecem para admins
  const adminRoutes = [
    {
      label: "Administração",
      icon: Shield,
      href: "/pageInterna/admin",
      active: pathname === "/pageInterna/admin" || pathname.startsWith("/pageInterna/admin/"),
    },
  ]

  // Combina as rotas baseado na role do usuário
  const routes = [...baseRoutes, ...(isAdmin(userProfile) ? adminRoutes : [])]

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
                // Destaque especial para o item de admin
                route.label === "Administração" && "border border-orange-200 bg-orange-50/50 hover:bg-orange-100/50",
              )}
            >
              <route.icon
                className={cn("h-4 w-4 flex-shrink-0", route.label === "Administração" && "text-orange-600")}
              />
              <span className="truncate">{route.label}</span>
              {route.label === "Administração" && (
                <span className="ml-auto text-xs bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-full">Admin</span>
              )}
            </Link>
          ))}

          {/* Indicador de loading enquanto carrega o perfil */}
          {loading && (
            <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground">
              <div className="h-4 w-4 animate-pulse bg-muted rounded" />
              <div className="h-4 flex-1 animate-pulse bg-muted rounded" />
            </div>
          )}
        </div>

        {/* Informações do usuário no rodapé da sidebar */}
        {userProfile && (
          <div className="mt-auto p-4 border-t">
            <div className="text-xs text-muted-foreground space-y-2">
              <p className="font-medium truncate">{userProfile.nome}</p>
              <p className="truncate">{userProfile.email}</p>
              {userProfile.roles && userProfile.roles.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {getDisplayRoles(userProfile).map((role, index) => (
                    <span
                      key={index}
                      className={cn(
                        "inline-block px-2 py-1 rounded-full text-xs font-medium",
                        role === "Admin" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700",
                      )}
                    >
                      {role}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
