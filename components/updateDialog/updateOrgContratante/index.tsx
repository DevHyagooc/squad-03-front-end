"use client"

import type React from "react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

interface OrgContratante {
    idOrgao: number
    nome: string
    nomeFantasia: string
    razaoSocial: string
    cnpj: string
    numeroEmpresa: string
    estado: string
    cidade: string
}

interface UpdateOrgContratanteProps {
    closeForm: () => void
    orgContratante: OrgContratante
    onSave: (orgContratante: OrgContratante) => void
}

const UpdateOrgContratante: React.FC<UpdateOrgContratanteProps> = ({ closeForm, orgContratante: initialData, onSave }) => {
    const [formData, setFormData] = useState<OrgContratante>(initialData)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            await onSave(formData)
            closeForm()
        } catch (error) {
            console.error("Erro ao salvar:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card className="w-full h-full shadow-none border-0">
            <CardHeader className="bg-gray-50 dark:bg-gray-800 pb-2">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">Editar Órgão Contratante</CardTitle>
                    <Button variant="ghost" size="icon" onClick={closeForm} className="h-8 w-8">
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="pt-6 pb-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="nome" className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Nome:
                            </Label>
                            <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} className="text-sm" required />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="nomeFantasia" className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Nome Fantasia:
                            </Label>
                            <Input
                                id="nomeFantasia"
                                name="nomeFantasia"
                                value={formData.nomeFantasia}
                                onChange={handleChange}
                                className="text-sm"
                            />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="razaoSocial" className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Razão Social:
                            </Label>
                            <Input
                                id="razaoSocial"
                                name="razaoSocial"
                                value={formData.razaoSocial}
                                onChange={handleChange}
                                className="text-sm"
                            />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="cnpj">CNPJ:</Label>
                            <Input
                                id="cnpj"
                                name="cnpj"
                                value={formData.cnpj}
                                onChange={handleChange}
                                className="text-sm"
                                required
                            />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="numeroEmpresa" className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Número Empresa:
                            </Label>
                            <Input
                                id="numeroEmpresa"
                                name="numeroEmpresa"
                                value={formData.numeroEmpresa}
                                onChange={handleChange}
                                className="text-sm"
                            />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="estado" className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Estado:
                            </Label>
                            <Input id="estado" name="estado" value={formData.estado} onChange={handleChange} className="text-sm" />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="cidade" className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Cidade:
                            </Label>
                            <Input id="cidade" name="cidade" value={formData.cidade} onChange={handleChange} className="text-sm" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 pt-2 pb-4 mt-auto">
                    <Button type="button" variant="outline" onClick={closeForm}>
                        Cancelar
                    </Button>
                    <Button type="submit" className="bg-gray-800 hover:bg-gray-700 text-white" disabled={isSubmitting}>
                        {isSubmitting ? "Salvando..." : "Salvar"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}

export default UpdateOrgContratante