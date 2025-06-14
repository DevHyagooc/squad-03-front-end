"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Loader2, Shield, Plus, Minus, ArrowLeft, AlertTriangle, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  getAllUsers,
  addRoleToUser,
  removeRoleFromUser,
  formatRoleForDisplay,
  AVAILABLE_ROLES,
  type User,
} from "@/services/admin"

export default function RolesManagementPage() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Estados dos modais
  const [addRoleModalOpen, setAddRoleModalOpen] = useState(false)
  const [removeRoleModalOpen, setRemoveRoleModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedRole, setSelectedRole] = useState<string>("")

  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      const usersData = await getAllUsers()
      setUsers(usersData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar usuários")
    } finally {
      setLoading(false)
    }
  }

  const handleAddRole = async () => {
    if (!selectedUser || !selectedRole) {
      setError("Selecione um usuário e uma role")
      return
    }

    if (selectedUser.roles.includes(selectedRole)) {
      setError("O usuário já possui esta role")
      return
    }

    try {
      setSubmitting(true)
      setError(null)
      await addRoleToUser(selectedUser.id, selectedRole)
      setAddRoleModalOpen(false)
      setSelectedUser(null)
      setSelectedRole("")
      await loadUsers()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao adicionar role")
    } finally {
      setSubmitting(false)
    }
  }

  const handleRemoveRole = async () => {
    if (!selectedUser || !selectedRole) {
      setError("Selecione um usuário e uma role")
      return
    }

    try {
      setSubmitting(true)
      setError(null)
      await removeRoleFromUser(selectedUser.id, selectedRole)
      setRemoveRoleModalOpen(false)
      setSelectedUser(null)
      setSelectedRole("")
      await loadUsers()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao remover role")
    } finally {
      setSubmitting(false)
    }
  }

  const openAddRoleModal = (user: User) => {
    setSelectedUser(user)
    setSelectedRole("")
    setAddRoleModalOpen(true)
  }

  const openRemoveRoleModal = (user: User, role: string) => {
    setSelectedUser(user)
    setSelectedRole(role)
    setRemoveRoleModalOpen(true)
  }

  const getAvailableRolesToAdd = (user: User) => {
    return AVAILABLE_ROLES.filter((role) => !user.roles.includes(role))
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Carregando usuários...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Gerenciar Roles
          </h1>
          <p className="text-muted-foreground">Gerencie as permissões e roles dos usuários</p>
        </div>
      </div>

      {/* Mensagem de erro */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Informações sobre roles */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Roles Disponíveis
          </CardTitle>
          <CardDescription>Roles que podem ser atribuídas aos usuários</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            {AVAILABLE_ROLES.map((role) => (
              <Badge
                key={role}
                variant={role === "ROLE_ADMIN" ? "default" : "secondary"}
                className={role === "ROLE_ADMIN" ? "bg-orange-100 text-orange-700" : ""}
              >
                {formatRoleForDisplay(role)}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabela de usuários e suas roles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Usuários e Roles ({users.length})
          </CardTitle>
          <CardDescription>Visualize e gerencie as roles de cada usuário</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Roles Atuais</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-mono">{user.id}</TableCell>
                  <TableCell className="font-medium">{user.nome}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {user.roles.map((role) => (
                        <div key={role} className="flex items-center gap-1">
                          <Badge
                            variant={role === "ROLE_ADMIN" ? "default" : "secondary"}
                            className={role === "ROLE_ADMIN" ? "bg-orange-100 text-orange-700" : ""}
                          >
                            {formatRoleForDisplay(role)}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 hover:bg-red-100"
                            onClick={() => openRemoveRoleModal(user, role)}
                          >
                            <Minus className="h-3 w-3 text-red-600" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openAddRoleModal(user)}
                      disabled={getAvailableRolesToAdd(user).length === 0}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Adicionar Role
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal para Adicionar Role */}
      <Dialog open={addRoleModalOpen} onOpenChange={setAddRoleModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Role</DialogTitle>
            <DialogDescription>
              Adicione uma nova role ao usuário <strong>{selectedUser?.nome}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Selecione a role:</label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Escolha uma role" />
                </SelectTrigger>
                <SelectContent>
                  {selectedUser &&
                    getAvailableRolesToAdd(selectedUser).map((role) => (
                      <SelectItem key={role} value={role}>
                        {formatRoleForDisplay(role)}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddRoleModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddRole} disabled={submitting || !selectedRole}>
              {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Adicionar Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para Remover Role */}
      <Dialog open={removeRoleModalOpen} onOpenChange={setRemoveRoleModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remover Role</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja remover a role <strong>{formatRoleForDisplay(selectedRole)}</strong> do usuário{" "}
              <strong>{selectedUser?.nome}</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRemoveRoleModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleRemoveRole} disabled={submitting}>
              {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Remover Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
