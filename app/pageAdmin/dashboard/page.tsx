"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserList } from "@/components/page-admin/user-list"
import { CreateUserForm } from "@/components/page-admin/create-user-form"
import { EditUserForm } from "@/components/page-admin/edit-user-form"
import { UserRoleManager } from "@/components/page-admin/user-role-manager"
import { DashboardHeader } from "@/components/page-admin/dashboard-header"
import type { User } from "@/types/user"

export default function DashboardPage() {
  const { isAuthenticated, hasRole } = useAuth()
  const router = useRouter()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState("list")

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/pageAdmin/login")
    } else if (!hasRole("ROLE_ADMIN")) {
      router.push("/pageAdmin/unauthorized")
    }
  }, [isAuthenticated, hasRole, router])

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setActiveTab("edit")
  }

  const handleManageRoles = (user: User) => {
    setSelectedUser(user)
    setActiveTab("roles")
  }

  const handleUserCreated = () => {
    setActiveTab("list")
  }

  const handleUserUpdated = () => {
    setActiveTab("list")
    setSelectedUser(null)
  }

  if (!isAuthenticated || !hasRole("ROLE_ADMIN")) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold mb-6 text-secondary">Gerenciamento de Usuários</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="list">Lista de Usuários</TabsTrigger>
            <TabsTrigger value="create">Criar Usuário</TabsTrigger>
            {selectedUser && <TabsTrigger value="edit">Editar Usuário</TabsTrigger>}
            {selectedUser && <TabsTrigger value="roles">Gerenciar Roles</TabsTrigger>}
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            <UserList onEdit={handleEditUser} onManageRoles={handleManageRoles} />
          </TabsContent>

          <TabsContent value="create">
            <CreateUserForm onSuccess={handleUserCreated} />
          </TabsContent>

          <TabsContent value="edit">
            {selectedUser && <EditUserForm user={selectedUser} onSuccess={handleUserUpdated} />}
          </TabsContent>

          <TabsContent value="roles">{selectedUser && <UserRoleManager user={selectedUser} />}</TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
