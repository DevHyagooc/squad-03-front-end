"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import Logo from "@/components/page-admin/logo"

export default function UnauthorizedPage() {
  const router = useRouter()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/pageAdmin/login")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <Logo className="mb-4" />
          <CardTitle className="text-2xl text-destructive">Acesso Negado</CardTitle>
          <CardDescription>Você não tem permissão para acessar esta página.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center">Esta área é restrita a usuários com permissões de administrador.</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleLogout} variant="outline">
            Voltar para o login
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
