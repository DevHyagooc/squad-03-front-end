"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import Logo from "@/components/page-admin/logo"

export function DashboardHeader() {
  const { logout, user } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("pageAdmin/login")
  }

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Logo />

        <div className="flex items-center gap-4">
          {user && (
            <div className="text-sm text-gray-600">
              Logado como: <span className="font-medium">{user.email}</span>
            </div>
          )}
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </div>
    </header>
  )
}
