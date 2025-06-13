"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { createUser } from "@/services/user-service"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface CreateUserFormProps {
    onSuccess: () => void
}

export function CreateUserForm({ onSuccess }: CreateUserFormProps) {
    const [email, setEmail] = useState("")
    const [nome, setNome] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmSenha, setConfirmSenha] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const { toast } = useToast()

    useEffect(() => {
        if (confirmSenha && senha !== confirmSenha) {
            setPasswordError(true)
        } else {
            setPasswordError(false)
        }
    }, [senha, confirmSenha])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (senha !== confirmSenha) {
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
            await createUser({ email, nome, senha })
            toast({
                title: "Usuário criado",
                description: "O usuário foi criado com sucesso.",
            })
            setEmail("")
            setNome("")
            setSenha("")
            setConfirmSenha("")
            onSuccess()
        } catch (error) {
            toast({
                title: "Erro ao criar usuário",
                description: "Não foi possível criar o usuário.",
                variant: "destructive",
            })
            console.error("Error creating user:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Criar Novo Usuário</CardTitle>
                <CardDescription>Adicione um novo usuário ao sistema</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="nome">Nome</Label>
                        <Input
                            id="nome"
                            type="nome"
                            placeholder="Admin"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="usuario@exemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="senha">Senha</Label>
                        <Input
                            id="senha"
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className={passwordError ? "text-destructive" : ""}>
                            Confirmar Senha
                        </Label>
                        <Input
                            id="confirmSenha"
                            type="password"
                            value={confirmSenha}
                            onChange={(e) => setConfirmSenha(e.target.value)}
                            required
                            className={passwordError ? "border-destructive focus-visible:ring-destructive" : ""}
                        />
                    </div>

                    {passwordError && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Erro</AlertTitle>
                            <AlertDescription>As senhas não coincidem. Por favor, verifique.</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => onSuccess()}>
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={isLoading || passwordError}>
                        {isLoading ? "Criando..." : "Criar Usuário"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
