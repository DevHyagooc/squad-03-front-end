"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Plus, MoreHorizontal, Edit, Trash2, ArrowLeft, ArrowRight, CalendarIcon, Save, X } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import {
    getEntregavelById,
    postEntregavel,
    updateEntregavel,
    deleteEntregavel,
    getEntregaveisByContratoId,
} from "@/services/entregavel"
import type { Contrato } from "@/app/pageInterna/contratos/[id]/page"
import { getContratoById } from "@/services/contrato"

export interface Entregavel {
    idEntregavel: number
    titulo: string
    descricao: string
    prazoEntrega: string
    status: string
    responsavelId: number
    contratoId: number
}

interface KanbanColumn {
    id: string
    title: string
    status: string
    limit?: number
}

interface KanbanEntregaveisProps {
    contratoId: number
}

//
// ─── DEFAULT + LOCALSTORAGE UTILITIES ───────────────────────────────────────
//

// Chave que usaremos para gravar/ler colunas
const LOCAL_STORAGE_KEY = "kanbanColumns";

// Seu estado inicial “fallback”
const defaultColumns: KanbanColumn[] = [
  { id: "pendente", title: "Pendente", status: "PENDENTE" },
  { id: "em-andamento", title: "Em Andamento", status: "EM_ANDAMENTO" },
  { id: "em-revisao", title: "Em Revisão", status: "EM_REVISAO" },
  { id: "concluido", title: "Concluído", status: "CONCLUIDO" },
];

/**
 * Tenta ler as colunas do localStorage. Se não existir ou der erro,
 * retorna o defaultColumns.
 */
function loadColumnsFromStorage(): KanbanColumn[] {
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn("Erro ao ler colunas do localStorage:", e);
  }
  return defaultColumns;
}

/**
 * Grava as colunas no localStorage.
 */
function saveColumnsToStorage(cols: KanbanColumn[]) {
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cols));
  } catch (e) {
    console.warn("Não foi possível salvar colunas no localStorage:", e);
  }
}

export function KanbanEntregaveis({ contratoId }: KanbanEntregaveisProps) {
  // ─── 1. COLUMNS (INICIALIZAÇÃO A PARTIR DO STORAGE) ─────────────────────────
  const [columns, setColumns] = useState<KanbanColumn[]>(() => {
    if (typeof window !== "undefined") {
      return loadColumnsFromStorage();
    }
    return defaultColumns;
  });

  // ─── 2. QUANDO COLUMNS MUDAR, GRAVA NO STORAGE ───────────────────────────────
  useEffect(() => {
    saveColumnsToStorage(columns);
  }, [columns]);


    const [entregaveis, setEntregaveis] = useState<Entregavel[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedEntregavel, setSelectedEntregavel] = useState<Entregavel | null>(null)
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [editingColumn, setEditingColumn] = useState<string | null>(null)
    const [newColumnTitle, setNewColumnTitle] = useState("")
    const [formData, setFormData] = useState<Partial<Entregavel>>({})
    const [prazoEntrega, setPrazoEntrega] = useState<Date>()
    const [contratoDetalhado, setContratoDetalhado] = useState<Contrato | null>(null)
    const [draggedItem, setDraggedItem] = useState<Entregavel | null>(null)
    const [dragOverColumn, setDragOverColumn] = useState<string | null>(null)

    useEffect(() => {
        loadEntregaveis()
        loadContrato()
    }, [contratoId])

    const loadContrato = async () => {
        try {
            const data = await getContratoById(contratoId)
            setContratoDetalhado(data)
        } catch (error) {
            toast({
                title: "Erro",
                description: "Não foi possível carregar dados do contrato.",
                variant: "destructive",
            })
        }
    }

    const loadEntregaveis = async () => {
        try {
            setLoading(true)
            const data = await getEntregaveisByContratoId(contratoId)
            setEntregaveis(data)
        } catch (error) {
            toast({
                title: "Erro",
                description: "Não foi possível carregar os entregáveis.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const getEntregaveisByStatus = (status: string) => {
        return entregaveis.filter((entregavel) => entregavel.status === status)
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "PENDENTE":
                return "bg-gray-100 text-gray-800"
            case "EM_ANDAMENTO":
                return "bg-blue-100 text-blue-800"
            case "EM_REVISAO":
                return "bg-yellow-100 text-yellow-800"
            case "CONCLUIDO":
                return "bg-green-100 text-green-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const handleCardClick = async (entregavel: Entregavel, event: React.MouseEvent) => {
        // Previne o clique se estiver arrastando
        if (event.defaultPrevented) return

        try {
            const detailedEntregavel = await getEntregavelById(entregavel.idEntregavel)
            setSelectedEntregavel(detailedEntregavel)
            setIsDetailModalOpen(true)
        } catch (error) {
            toast({
                title: "Erro",
                description: "Não foi possível carregar os detalhes do entregável.",
                variant: "destructive",
            })
        }
    }

    const handleEditEntregavel = (entregavel: Entregavel) => {
        setFormData(entregavel)
        setPrazoEntrega(new Date(entregavel.prazoEntrega))
        setIsDetailModalOpen(false)
        setIsEditModalOpen(true)
    }

    const handleCreateEntregavel = (status: string) => {
        setFormData({ status, contratoId, responsavelId: contratoDetalhado?.responsavel.idFuncionario })
        setPrazoEntrega(undefined)
        setIsCreateModalOpen(true)
    }

    const handleSaveEntregavel = async () => {
        try {
            const entregavelData = {
                ...formData,
                prazoEntrega: prazoEntrega?.toISOString().split("T")[0],
                contratoId,
                responsavelId: formData.responsavelId ?? contratoDetalhado?.responsavel.idFuncionario,
            }

            if (formData.idEntregavel) {
                await updateEntregavel(formData.idEntregavel, entregavelData)
                toast({
                    title: "Sucesso",
                    description: "Entregável atualizado com sucesso!",
                })
            } else {
                await postEntregavel(entregavelData)
                toast({
                    title: "Sucesso",
                    description: "Entregável criado com sucesso!",
                })
            }

            setIsEditModalOpen(false)
            setIsCreateModalOpen(false)
            loadEntregaveis()
        } catch (error) {
            toast({
                title: "Erro",
                description: "Não foi possível salvar o entregável.",
                variant: "destructive",
            })
        }
    }

    const handleDeleteEntregavel = async (id: number) => {
        try {
            await deleteEntregavel(id)
            toast({
                title: "Sucesso",
                description: "Entregável excluído com sucesso!",
            })
            setIsDetailModalOpen(false)
            loadEntregaveis()
        } catch (error) {
            toast({
                title: "Erro",
                description: "Não foi possível excluir o entregável.",
                variant: "destructive",
            })
        }
    }

    const handleAddColumn = () => {
        const title = prompt("Digite o nome da nova coluna:")
        if (!title) return
        // transforma, por exemplo, "Em testes" → "EM_TESTES"
        const status = title
            .trim()
            .toUpperCase()
            .replace(/[^0-9A-Z]+/g, "_")

        const newColumn: KanbanColumn = {
            id: `custom-${Date.now()}`,
            title,
            status,
        }
        setColumns([...columns, newColumn])
    }

    const handleEditColumnTitle = (columnId: string, newTitle: string) => {
        setColumns(columns.map((col) => (col.id === columnId ? { ...col, title: newTitle } : col)))
        setEditingColumn(null)
        setNewColumnTitle("")
    }

    const handleDeleteColumn = async (columnId: string) => {
        const col = columns.find((c) => c.id === columnId)
        if (!col) return

        if (!confirm(`Deseja excluir a coluna "${col.title}"?\nTodos os cards serão movidos para "Pendente".`))
            return

        const affected = entregaveis.filter((e) => e.status === col.status)
        try {
            await Promise.all(
                affected.map((e) =>
                    updateEntregavel(e.idEntregavel, {
                        ...e,
                        status: "PENDENTE",
                    })
                )
            )
        } catch {
            toast({
                title: "Erro",
                description: "Não foi possível remanejar os cards dessa coluna.",
                variant: "destructive",
            })
            return
        }
        setEntregaveis((prev) =>
            prev.map((e) =>
                e.status === col.status
                    ? {
                        ...e,
                        status: "PENDENTE",
                    }
                    : e
            )
        )
        setColumns((prev) => prev.filter((c) => c.id !== columnId))
        toast({
            title: "Sucesso",
            description: `Coluna "${col.title}" excluída e cards movidos para Pendente.`,
        })
    }

    const handleMoveColumn = (columnId: string, direction: "left" | "right") => {
        const currentIndex = columns.findIndex((col) => col.id === columnId)
        if ((direction === "left" && currentIndex > 0) || (direction === "right" && currentIndex < columns.length - 1)) {
            const newColumns = [...columns]
            const targetIndex = direction === "left" ? currentIndex - 1 : currentIndex + 1
                ;[newColumns[currentIndex], newColumns[targetIndex]] = [newColumns[targetIndex], newColumns[currentIndex]]
            setColumns(newColumns)
        }
    }

    const handleDragStart = (e: React.DragEvent, entregavel: Entregavel) => {
        setDraggedItem(entregavel)
        e.dataTransfer.effectAllowed = "move"
        e.dataTransfer.setData("text/html", e.currentTarget.outerHTML)

        setTimeout(() => {
            ; (e.target as HTMLElement).style.opacity = "0.5"
        }, 0)
    }

    const handleDragEnd = (e: React.DragEvent) => {
        setDraggedItem(null)
        setDragOverColumn(null)
            ; (e.target as HTMLElement).style.opacity = "1"
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = "move"
    }

    const handleDragEnter = (e: React.DragEvent, columnStatus: string) => {
        e.preventDefault()
        setDragOverColumn(columnStatus)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setDragOverColumn(null)
        }
    }

    const handleDrop = async (e: React.DragEvent, targetColumnStatus: string) => {
        e.preventDefault()
        setDragOverColumn(null)

        if (!draggedItem || draggedItem.status === targetColumnStatus) {
            return
        }

        try {
            const updatedEntregavel = {
                ...draggedItem,
                status: targetColumnStatus,
            }

            await updateEntregavel(draggedItem.idEntregavel, updatedEntregavel)

            setEntregaveis(
                entregaveis.map((item) =>
                    item.idEntregavel === draggedItem.idEntregavel ? { ...item, status: targetColumnStatus } : item,
                ),
            )

            toast({
                title: "Sucesso",
                description: "Entregável movido com sucesso!",
            })
        } catch (error) {
            toast({
                title: "Erro",
                description: "Não foi possível mover o entregável.",
                variant: "destructive",
            })
        }

        setDraggedItem(null)
    }

    if (loading) {
        return (
            <div className=" inset-0 flex items-center justify-center pointer-events-none z-50 bg-white/40 backdrop-blur-sm">
                <div className="relative w-12 h-12">
                    <div className="absolute inset-0 border-4 border-gray-300 rounded-full opacity-25"></div>
                    <div className="absolute inset-0 border-4 border-t-gray-800 rounded-full animate-spin"></div>
                </div>
                <span className="ml-2">Carregando Entregáveis...</span>
            </div>
        )
    }

    return (
        <div className="w-full">
            <div className="w-full h-[600px] border rounded-lg bg-gray-50 p-4">
                <div className="flex gap-4 overflow-x-auto h-full pb-4">
                    {columns.map((column, index) => (
                        <div
                            key={column.id}
                            className="flex-shrink-0 w-80"
                            onDragOver={handleDragOver}
                            onDragEnter={(e) => handleDragEnter(e, column.status)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, column.status)}
                        >
                            <div
                                className={cn(
                                    "bg-white rounded-lg p-4 h-full flex flex-col transition-colors",
                                    dragOverColumn === column.status && "bg-blue-50 border-2 border-blue-300 border-dashed",
                                )}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        {editingColumn === column.id ? (
                                            <Input
                                                value={newColumnTitle}
                                                onChange={(e) => setNewColumnTitle(e.target.value)}
                                                onBlur={() => handleEditColumnTitle(column.id, newColumnTitle)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        handleEditColumnTitle(column.id, newColumnTitle)
                                                    }
                                                }}
                                                className="h-6 text-sm font-medium"
                                                autoFocus
                                            />
                                        ) : (
                                            <h3 className="font-medium text-sm text-gray-700">{column.title}</h3>
                                        )}
                                        <Badge variant="secondary" className="text-xs">
                                            {getEntregaveisByStatus(column.status).length}
                                        </Badge>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    setEditingColumn(column.id)
                                                    setNewColumnTitle(column.title)
                                                }}
                                            >
                                                <Edit className="mr-2 h-4 w-4" />
                                                Editar nome
                                            </DropdownMenuItem>
                                            {index > 0 && (
                                                <DropdownMenuItem onClick={() => handleMoveColumn(column.id, "left")}>
                                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                                    Mover para esquerda
                                                </DropdownMenuItem>
                                            )}
                                            {index < columns.length - 1 && (
                                                <DropdownMenuItem onClick={() => handleMoveColumn(column.id, "right")}>
                                                    <ArrowRight className="mr-2 h-4 w-4" />
                                                    Mover para direita
                                                </DropdownMenuItem>
                                            )}
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => handleDeleteColumn(column.id)} className="text-red-600">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Excluir coluna
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                <div className="flex-1 overflow-y-auto space-y-3">
                                    {getEntregaveisByStatus(column.status).map((entregavel) => (
                                        <Card
                                            key={entregavel.idEntregavel}
                                            className={cn(
                                                "cursor-grab hover:shadow-md transition-all duration-200",
                                                draggedItem?.idEntregavel === entregavel.idEntregavel && "opacity-50 rotate-2 scale-105",
                                            )}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, entregavel)}
                                            onDragEnd={handleDragEnd}
                                            onClick={(e) => handleCardClick(entregavel, e)}
                                            onMouseDown={(e) => {
                                                // Adiciona um pequeno delay para distinguir entre clique e drag
                                                setTimeout(() => {
                                                    if (!draggedItem) {
                                                        e.preventDefault()
                                                    }
                                                }, 100)
                                            }}
                                        >
                                            <CardContent className="p-3">
                                                <p className="text-sm font-medium mb-1 line-clamp-1">{entregavel.titulo || "Sem título"}</p>
                                                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{entregavel.descricao}</p>
                                                <div className="flex items-center justify-between text-xs text-gray-500">
                                                    <span>{new Date(entregavel.prazoEntrega).toLocaleDateString("pt-BR")}</span>
                                                    <Badge className={cn("text-xs", getStatusColor(entregavel.status))}>
                                                        {entregavel.status.replace("_", " ")}
                                                    </Badge>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full justify-start text-gray-500 hover:text-gray-700 mt-auto"
                                        onClick={() => handleCreateEntregavel(column.status)}
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Adicionar entregável
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* <div className="flex-shrink-0 flex items-start pt-4">
                        <Button variant="outline" size="sm" onClick={handleAddColumn} className="h-10">
                            <Plus className="mr-2 h-4 w-4" />
                            Adicionar coluna
                        </Button>
                    </div> */}
                </div>
            </div>

            {/* Modal de Detalhes */}
            <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Detalhes do Entregável</DialogTitle>
                    </DialogHeader>
                    {selectedEntregavel && (
                        <div className="space-y-4">
                            <div>
                                <Label className="text-sm font-medium">Nome</Label>
                                <p className="mt-1 text-sm text-gray-700">{selectedEntregavel.titulo || "Sem título"}</p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium">Descrição</Label>
                                <p className="mt-1 text-sm text-gray-700">{selectedEntregavel.descricao}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-sm font-medium">Prazo de Entrega</Label>
                                    <p className="mt-1 text-sm text-gray-700">
                                        {new Date(selectedEntregavel.prazoEntrega).toLocaleDateString("pt-BR")}
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium">Status</Label>
                                    <Badge className={cn("mt-1", getStatusColor(selectedEntregavel.status))}>
                                        {selectedEntregavel.status.replace("_", " ")}
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex gap-2 pt-4">
                                <Button onClick={() => handleEditEntregavel(selectedEntregavel)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Editar
                                </Button>
                                <Button variant="destructive" onClick={() => handleDeleteEntregavel(selectedEntregavel.idEntregavel)}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Excluir
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Modal de Edição/Criação */}
            <Dialog
                open={isEditModalOpen || isCreateModalOpen}
                onOpenChange={(open) => {
                    setIsEditModalOpen(open)
                    setIsCreateModalOpen(open)
                }}
            >
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{formData.idEntregavel ? "Editar Entregável" : "Novo Entregável"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="nome">Nome do Entregável</Label>
                            <Input
                                id="titulo"
                                value={formData.titulo || ""}
                                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                                placeholder="Ex: Desenvolvimento do módulo de login"
                            />
                        </div>
                        <div>
                            <Label htmlFor="descricao">Descrição</Label>
                            <Textarea
                                id="descricao"
                                value={formData.descricao || ""}
                                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                                placeholder="Descreva detalhadamente o entregável..."
                                rows={3}
                            />
                        </div>
                        <div>
                            <Label>Prazo de Entrega</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !prazoEntrega && "text-muted-foreground",
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {prazoEntrega ? format(prazoEntrega, "PPP", { locale: ptBR }) : "Selecione a data"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={prazoEntrega} onSelect={setPrazoEntrega} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div>
                            <Label>Status</Label>
                            <Select
                                value={formData.status || ""}
                                onValueChange={(value) => setFormData({ ...formData, status: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {columns.map((column) => (
                                        <SelectItem key={column.status} value={column.status}>
                                            {column.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex gap-2 pt-4">
                            <Button onClick={handleSaveEntregavel}>
                                <Save className="mr-2 h-4 w-4" />
                                Salvar
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setIsEditModalOpen(false)
                                    setIsCreateModalOpen(false)
                                }}
                            >
                                <X className="mr-2 h-4 w-4" />
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}