"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import type { User } from "@/types/user"
import { updateUser } from "@/services/user-service"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { se } from "date-fns/locale"

interface EditUserFormProps {
    user: User
    onSuccess: () => void
}

export function EditUserForm({ user, onSuccess }: EditUserFormProps) {
    const [email, setEmail] = useState(user.email)
    const [nome, setNome] = useState(user.nome || "")
    const [senha, setSenha] = useState("")
    const [confirmSenha, setConfirmSenha] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const { toast } = useToast()

    useEffect(() => {
        if (senha && confirmSenha && senha !== confirmSenha) {
            setPasswordError(true)
        } else {
            setPasswordError(false)
        }
    }, [senha, confirmSenha])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (senha && senha !== confirmSenha) {
            setPasswordError(true)
            toast({
                title: "Erro de validação",
                description: "As senhas não coincidem.",
                variant: "destructive",
            })
            return
        }

        setIsLoading(true)

        try {
            // Only include password if it was changed
            const userData = {
                email,
                nome,
                ...(senha ? { senha } : {}),
            }
            await updateUser(user.id, userData)

            toast({
                title: "Usuário atualizado",
                description: "As informações do usuário foram atualizadas com sucesso.",
            })
            onSuccess()
        } catch (error) {
            toast({
                title: "Erro ao atualizar usuário",
                description: "Não foi possível atualizar as informações do usuário.",
                variant: "destructive",
            })
            console.error("Error updating user:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Editar Usuário</CardTitle>
                <CardDescription>Atualize as informações do usuário</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="nome">Nome</Label>
                        <Input id="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmSenha" className={passwordError ? "text-destructive" : ""}>
                            Confirmar Nova Senha
                        </Label>
                        <Input id="senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                    </div>
                    {senha && (
                        <div className="space-y-2">
                            <Label htmlFor="confirmSenha">Confirmar Nova Senha</Label>
                            <Input
                                id="confirmSenha"
                                type="password"
                                value={confirmSenha}
                                onChange={(e) => setConfirmSenha(e.target.value)}
                                required={!!senha}
                                className={passwordError ? "border-destructive focus-visible:ring-destructive" : ""}
                            />
                        </div>
                    )}

                    {passwordError && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Erro</AlertTitle>
                            <AlertDescription>As senhas não coincidem. Por favor, verifique.</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={onSuccess}>
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={isLoading || passwordError} className="bg-cyan-500 hover:bg-cyan-600">
                        {isLoading ? "Salvando..." : "Salvar Alterações"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
