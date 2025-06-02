"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { toast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { CalendarIcon, Edit, Plus, Save, Trash2, X } from "lucide-react"
import {
    type RepactuacaoRequest,
    type RepactuacaoResponse,
    createRepactuacao,
    getRepactuacoesByContrato,
    updateRepactuacao,
    deleteRepactuacao,
} from "@/services/repactuacao"

interface RepactuacoesContratoProps {
    contratoId: number
}

export function RepactuacoesContrato({ contratoId }: RepactuacoesContratoProps) {
    const [repactuacoes, setRepactuacoes] = useState<RepactuacaoResponse[]>([])
    const [loading, setLoading] = useState(true)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState<RepactuacaoRequest>({
        indice: "",
        dataBase: "",
        valorAnterior: 0,
        valorRepactuado: 0,
        justificativa: "",
        contratoId: contratoId,
    })
    const [dataBase, setDataBase] = useState<Date>()
    const [editId, setEditId] = useState<number | null>(null)

    useEffect(() => {
        loadRepactuacoes()
    }, [contratoId])

    const loadRepactuacoes = async () => {
        try {
            setLoading(true)
            const data = await getRepactuacoesByContrato(contratoId)
            setRepactuacoes(data)
        } catch (error) {
            toast({
                title: "Erro",
                description: "Não foi possível carregar as repactuações.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleOpenDialog = (repactuacao?: RepactuacaoResponse) => {
        if (repactuacao) {
            setFormData({
                indice: repactuacao.indice,
                dataBase: repactuacao.dataBase,
                valorAnterior: repactuacao.valorAnterior,
                valorRepactuado: repactuacao.valorRepactuado,
                justificativa: repactuacao.justificativa,
                contratoId: contratoId,
            })
            setDataBase(new Date(repactuacao.dataBase))
            setEditId(repactuacao.idRepactuacao)
            setIsEditing(true)
        } else {
            resetForm()
            setIsEditing(false)
            setEditId(null)
        }
        setIsDialogOpen(true)
    }

    const handleSaveRepactuacao = async () => {
        try {
            if (!dataBase) {
                toast({
                    title: "Erro",
                    description: "A data base é obrigatória.",
                    variant: "destructive",
                })
                return
            }

            const repactuacaoData = {
                ...formData,
                dataBase: dataBase.toISOString().split("T")[0],
            }

            if (isEditing && editId) {
                await updateRepactuacao(editId, repactuacaoData)
                toast({
                    title: "Sucesso",
                    description: "Repactuação atualizada com sucesso!",
                })
            } else {
                await createRepactuacao(repactuacaoData)
                toast({
                    title: "Sucesso",
                    description: "Repactuação criada com sucesso!",
                })
            }

            setIsDialogOpen(false)
            resetForm()
            loadRepactuacoes()
        } catch (error) {
            toast({
                title: "Erro",
                description: isEditing ? "Não foi possível atualizar a repactuação." : "Não foi possível criar a repactuação.",
                variant: "destructive",
            })
        }
    }

    const handleDeleteRepactuacao = async (id: number) => {
        if (!confirm("Tem certeza que deseja excluir esta repactuação?")) {
            return
        }

        try {
            await deleteRepactuacao(id)
            toast({
                title: "Sucesso",
                description: "Repactuação excluída com sucesso!",
            })
            loadRepactuacoes()
        } catch (error) {
            toast({
                title: "Erro",
                description: "Não foi possível excluir a repactuação.",
                variant: "destructive",
            })
        }
    }

    const resetForm = () => {
        setFormData({
            indice: "",
            dataBase: "",
            valorAnterior: 0,
            valorRepactuado: 0,
            justificativa: "",
            contratoId: contratoId,
        })
        setDataBase(undefined)
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
    }

    const calculatePercentage = (anterior: number, novo: number) => {
        if (anterior === 0) return 0
        const percentage = ((novo - anterior) / anterior) * 100
        return percentage.toFixed(2)
    }

    if (loading) {
        return (
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-center">
                        <div className="relative w-8 h-8">
                            <div className="absolute inset-0 border-4 border-gray-300 rounded-full opacity-25"></div>
                            <div className="absolute inset-0 border-4 border-t-gray-800 rounded-full animate-spin"></div>
                        </div>
                        <span className="ml-2">Carregando Repactuação...</span>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Repactuações do Contrato</h2>
                <Button onClick={() => handleOpenDialog()}>
                    <Plus className="mr-2 h-4 w-4" />
                    Nova Repactuação
                </Button>
            </div>

            {repactuacoes.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center h-40">
                        <p className="text-muted-foreground">Nenhuma repactuação registrada para este contrato.</p>
                        <Button variant="outline" className="mt-4" onClick={() => handleOpenDialog()}>
                            <Plus className="mr-2 h-4 w-4" />
                            Adicionar Repactuação
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Índice</TableHead>
                                    <TableHead>Data Base</TableHead>
                                    <TableHead>Valor Anterior</TableHead>
                                    <TableHead>Valor Repactuado</TableHead>
                                    <TableHead>Variação</TableHead>
                                    <TableHead>Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {repactuacoes.map((repactuacao) => (
                                    <TableRow key={repactuacao.idRepactuacao}>
                                        <TableCell>{repactuacao.indice}</TableCell>
                                        <TableCell>{new Date(repactuacao.dataBase).toLocaleDateString("pt-BR")}</TableCell>
                                        <TableCell>{formatCurrency(repactuacao.valorAnterior)}</TableCell>
                                        <TableCell>{formatCurrency(repactuacao.valorRepactuado)}</TableCell>
                                        <TableCell>
                                            <div
                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${repactuacao.valorRepactuado > repactuacao.valorAnterior
                                                    ? "bg-green-100 text-green-800"
                                                    : repactuacao.valorRepactuado < repactuacao.valorAnterior
                                                        ? "bg-red-100 text-red-800"
                                                        : "bg-gray-100 text-gray-800"
                                                    }`}
                                            >
                                                {calculatePercentage(repactuacao.valorAnterior, repactuacao.valorRepactuado)}%
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(repactuacao)}>
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-red-500 hover:text-red-700"
                                                    onClick={() => handleDeleteRepactuacao(repactuacao.idRepactuacao)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}

            {/* Dialog para adicionar/editar repactuação */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{isEditing ? "Editar Repactuação" : "Nova Repactuação"}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="indice">Índice</Label>
                            <Input
                                id="indice"
                                value={formData.indice}
                                onChange={(e) => setFormData({ ...formData, indice: e.target.value })}
                                placeholder="Ex: IPCA-15, IGP-M"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Data Base</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn("w-full justify-start text-left font-normal", !dataBase && "text-muted-foreground")}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dataBase ? format(dataBase, "PPP", { locale: ptBR }) : "Selecione a data"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={dataBase} onSelect={setDataBase} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="valorAnterior">Valor Anterior (R$)</Label>
                                <Input
                                    id="valorAnterior"
                                    type="number"
                                    step="0.01"
                                    value={formData.valorAnterior}
                                    onChange={(e) => setFormData({ ...formData, valorAnterior: Number(e.target.value) })}
                                    placeholder="0,00"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="valorRepactuado">Valor Repactuado (R$)</Label>
                                <Input
                                    id="valorRepactuado"
                                    type="number"
                                    step="0.01"
                                    value={formData.valorRepactuado}
                                    onChange={(e) => setFormData({ ...formData, valorRepactuado: Number(e.target.value) })}
                                    placeholder="0,00"
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="justificativa">Justificativa</Label>
                            <Textarea
                                id="justificativa"
                                value={formData.justificativa}
                                onChange={(e) => setFormData({ ...formData, justificativa: e.target.value })}
                                placeholder="Explique o motivo da repactuação"
                                rows={3}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            <X className="mr-2 h-4 w-4" />
                            Cancelar
                        </Button>
                        <Button onClick={handleSaveRepactuacao}>
                            <Save className="mr-2 h-4 w-4" />
                            Salvar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
