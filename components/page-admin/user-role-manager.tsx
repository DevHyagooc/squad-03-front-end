"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import type { User } from "@/types/user"
import { addUserRole, removeUserRole } from "@/services/user-service"
import { Check, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface UserRoleManagerProps {
  user: User
}

const AVAILABLE_ROLES = ["ROLE_USER", "ROLE_ADMIN"]

export function UserRoleManager({ user }: UserRoleManagerProps) {
  const [userRoles, setUserRoles] = useState<string[]>(user.roles || [])
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Filter out roles the user already has
  const availableRolesToAdd = AVAILABLE_ROLES.filter((role) => !userRoles.includes(role))

  const handleAddRole = async () => {
    if (!selectedRole) return

    setIsLoading(true)

    try {
      await addUserRole(user.id, selectedRole)
      setUserRoles([...userRoles, selectedRole])
      setSelectedRole("")
      toast({
        title: "Role adicionada",
        description: `A role ${selectedRole} foi adicionada ao usuário.`,
      })
    } catch (error) {
      toast({
        title: "Erro ao adicionar role",
        description: "Não foi possível adicionar a role ao usuário.",
        variant: "destructive",
      })
      console.error("Error adding role:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveRole = async (role: string) => {
    setIsLoading(true)

    try {
      await removeUserRole(user.id, role)
      setUserRoles(userRoles.filter((r) => r !== role))
      toast({
        title: "Role removida",
        description: `A role ${role} foi removida do usuário.`,
      })
    } catch (error) {
      toast({
        title: "Erro ao remover role",
        description: "Não foi possível remover a role do usuário.",
        variant: "destructive",
      })
      console.error("Error removing role:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardDescription>Gerencie as permissões do usuário {user.nome || user.email}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Roles Atuais</h3>
          <div className="flex flex-wrap gap-2">
            {userRoles.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhuma role atribuída</p>
            ) : (
              userRoles.map((role) => (
                <Badge key={role} variant="outline" className="flex items-center gap-1 py-1">
                  {role}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 rounded-full"
                    onClick={() => handleRemoveRole(role)}
                    disabled={isLoading}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="role">Adicionar Role</Label>
            <div className="flex gap-2">
              <Select
                value={selectedRole}
                onValueChange={setSelectedRole}
                disabled={availableRolesToAdd.length === 0 || isLoading}
              >
                <SelectTrigger id="role" className="flex-1">
                  <SelectValue placeholder="Selecione uma role" />
                </SelectTrigger>
                <SelectContent>
                  {availableRolesToAdd.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleAddRole} disabled={!selectedRole || isLoading} className="gap-1">
                <Check className="h-4 w-4" /> Adicionar
              </Button>
            </div>
          </div>
          {availableRolesToAdd.length === 0 && (
            <p className="text-sm text-muted-foreground">O usuário já possui todas as roles disponíveis.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
