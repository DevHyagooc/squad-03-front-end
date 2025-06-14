"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Users, Settings, Database, AlertTriangle, Construction } from "lucide-react"
import { getUserProfile, isAdmin, type UserProfile } from "@/services/perfil"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"

export default function AdminPage() {
  const router = useRouter()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [accessDenied, setAccessDenied] = useState(false)

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const profile = await getUserProfile()
        setUserProfile(profile)

        if (!isAdmin(profile)) {
          setAccessDenied(true)
        }
      } catch (error) {
        console.error("Erro ao verificar acesso admin:", error)
        setAccessDenied(true)
      } finally {
        setLoading(false)
      }
    }

    checkAdminAccess()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
            <span>Verificando permissões...</span>
          </div>
        </div>
      </div>
    )
  }

  if (accessDenied) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>Acesso negado. Você não tem permissão para acessar esta página.</AlertDescription>
        </Alert>
        <div className="flex justify-center mt-4">
          <Button onClick={() => router.back()} variant="outline">
            Voltar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Shield className="h-8 w-8 text-orange-600" />
        <div>
          <h1 className="text-3xl font-bold">Painel de Administração</h1>
          <p className="text-muted-foreground">Gerencie usuários, roles e configurações do sistema</p>
        </div>
      </div>

      {/* Cards de funcionalidades admin */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Gerenciar Usuários - Funcional */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Gerenciar Usuários
            </CardTitle>
            <CardDescription>Visualize, edite e gerencie todos os usuários do sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => router.push("/pageInterna/admin/usuarios")}>
              Acessar Usuários
            </Button>
          </CardContent>
        </Card>

        {/* Gerenciar Roles - Funcional */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Gerenciar Roles
            </CardTitle>
            <CardDescription>Configure permissões e roles de acesso do sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => router.push("/pageInterna/admin/roles")}>
              Acessar Roles
            </Button>
          </CardContent>
        </Card>

        {/* Configurações - Em desenvolvimento */}
        <Card className="hover:shadow-md transition-shadow opacity-75">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-purple-600" />
              Configurações
              <Badge variant="secondary" className="ml-auto">
                <Construction className="h-3 w-3 mr-1" />
                Em desenvolvimento
              </Badge>
            </CardTitle>
            <CardDescription>Configurações gerais e parâmetros do sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" disabled variant="outline">
              Em breve
            </Button>
          </CardContent>
        </Card>

        {/* Logs do Sistema - Em desenvolvimento */}
        <Card className="hover:shadow-md transition-shadow opacity-75">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-red-600" />
              Logs do Sistema
              <Badge variant="secondary" className="ml-auto">
                <Construction className="h-3 w-3 mr-1" />
                Em desenvolvimento
              </Badge>
            </CardTitle>
            <CardDescription>Visualize logs de atividades e auditoria</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" disabled variant="outline">
              Em breve
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Informações do admin atual */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">Sessão Administrativa</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-sm space-y-1">
            <p>
              <span className="font-medium">Administrador:</span> {userProfile?.nome}
            </p>
            <p>
              <span className="font-medium">Email:</span> {userProfile?.email}
            </p>
            <p>
              <span className="font-medium">Roles:</span>
              <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                Admin
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
