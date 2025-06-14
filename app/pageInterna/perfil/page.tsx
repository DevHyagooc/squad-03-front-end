"use client"

import { cn } from "@/lib/utils"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, User, Mail, Lock, Save, ArrowLeft } from "lucide-react"
import {
  getUserProfile,
  updateUserProfile,
  getDisplayRoles,
  type UserProfile,
  type UpdateProfileData,
} from "@/services/perfil"
import { useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Estados do formulário
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  })

  // Carrega o perfil do usuário
  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      setLoading(true)
      setError(null)
      const userProfile = await getUserProfile()
      setProfile(userProfile)
      setFormData({
        nome: userProfile.nome || "",
        email: userProfile.email || "",
        senha: "",
        confirmarSenha: "",
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar perfil")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    // Limpa mensagens ao editar
    setError(null)
    setSuccess(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validações
    if (!formData.nome.trim()) {
      setError("Nome é obrigatório")
      return
    }

    if (!formData.email.trim()) {
      setError("Email é obrigatório")
      return
    }

    if (formData.senha && formData.senha !== formData.confirmarSenha) {
      setError("As senhas não coincidem")
      return
    }

    if (formData.senha && formData.senha.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres")
      return
    }

    try {
      setUpdating(true)
      setError(null)
      setSuccess(null)

      const updateData: UpdateProfileData = {
        nome: formData.nome.trim(),
        email: formData.email.trim(),
      }

      // Só inclui a senha se foi preenchida
      if (formData.senha) {
        updateData.senha = formData.senha
      }

      const updatedProfile = await updateUserProfile(updateData)
      setProfile(updatedProfile)
      setSuccess("Perfil atualizado com sucesso!")

      // Limpa os campos de senha
      setFormData((prev) => ({
        ...prev,
        senha: "",
        confirmarSenha: "",
      }))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao atualizar perfil")
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Carregando perfil...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Meu Perfil</h1>
          <p className="text-muted-foreground">Gerencie suas informações pessoais</p>
        </div>
      </div>

      {/* Mensagens de erro e sucesso */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 border-green-200 bg-green-50">
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      {/* Card do perfil */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Informações Pessoais
          </CardTitle>
          <CardDescription>Atualize suas informações de perfil e senha</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informações básicas */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="nome"
                    type="text"
                    placeholder="Digite seu nome completo"
                    value={formData.nome}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Digite seu email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Seção de senha */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Alterar Senha</h3>
                <p className="text-sm text-muted-foreground">Deixe em branco se não quiser alterar a senha</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha">Nova senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="senha"
                    type="password"
                    placeholder="Digite a nova senha (opcional)"
                    value={formData.senha}
                    onChange={(e) => handleInputChange("senha", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmarSenha">Confirmar nova senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmarSenha"
                    type="password"
                    placeholder="Confirme a nova senha"
                    value={formData.confirmarSenha}
                    onChange={(e) => handleInputChange("confirmarSenha", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Botão de salvar */}
            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={updating} className="min-w-[120px]">
                {updating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Alterações
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Informações do usuário atual */}
      {profile && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Informações da Conta</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-sm space-y-2">
              <p>
                <span className="font-medium">ID:</span> {profile.id}
              </p>
              <p>
                <span className="font-medium">Email atual:</span> {profile.email}
              </p>
              <p>
                <span className="font-medium">Nome atual:</span> {profile.nome}
              </p>
              <div>
                <span className="font-medium">Roles:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {getDisplayRoles(profile).map((role, index) => (
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
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
