"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { toast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { CalendarIcon, Download, FileText, Plus, Save, Trash2, Upload, X } from "lucide-react"
import {
    type AditivoRequest,
    type AditivoResponse,
    createAditivo,
    getAditivosByContrato,
    uploadAditivoDocument,
    downloadAditivoDocument,
    deleteAditivoDocument,
} from "@/services/aditivo"

interface AditivosContratoProps {
    contratoId: number
}

const tiposAditivo = [
    { value: "PRORROGACAO", label: "Prorrogação" },
    { value: "ACRESCIMO", label: "Acréscimo" },
    { value: "SUPRESSAO", label: "Supressão" },
    { value: "REAJUSTE", label: "Reajuste" },
    { value: "REPACTUACAO", label: "Repactuação" },
    { value: "OUTROS", label: "Outros" },
]

export function AditivosContrato({ contratoId }: AditivosContratoProps) {
    const [aditivos, setAditivos] = useState<AditivoResponse[]>([])
    const [loading, setLoading] = useState(true)
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [isDocumentDialogOpen, setIsDocumentDialogOpen] = useState(false)
    const [selectedAditivo, setSelectedAditivo] = useState<AditivoResponse | null>(null)
    const [formData, setFormData] = useState<AditivoRequest>({
        tipo: "",
        descricaoMudancas: "",
        justificativa: "",
        dataVigencia: "",
        contratoId: contratoId,
    })
    const [dataVigencia, setDataVigencia] = useState<Date>()
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    useEffect(() => {
        loadAditivos()
    }, [contratoId])

    const loadAditivos = async () => {
        try {
            setLoading(true)
            const data = await getAditivosByContrato(contratoId)
            setAditivos(data)
        } catch (error) {
            toast({
                title: "Erro",
                description: "Não foi possível carregar os aditivos.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleCreateAditivo = async () => {
        try {
            if (!dataVigencia) {
                toast({
                    title: "Erro",
                    description: "A data de vigência é obrigatória.",
                    variant: "destructive",
                })
                return
            }

            const aditivoData = {
                ...formData,
                dataVigencia: dataVigencia.toISOString().split("T")[0],
            }

            await createAditivo(aditivoData)
            toast({
                title: "Sucesso",
                description: "Aditivo criado com sucesso!",
            })
            setIsCreateDialogOpen(false)
            resetForm()
            loadAditivos()
        } catch (error) {
            toast({
                title: "Erro",
                description: "Não foi possível criar o aditivo.",
                variant: "destructive",
            })
        }
    }

    const handleUploadDocument = async () => {
        if (!selectedFile || !selectedAditivo) {
            toast({
                title: "Erro",
                description: "Selecione um arquivo para upload.",
                variant: "destructive",
            })
            return
        }

        try {
            await uploadAditivoDocument(selectedAditivo.idAditivoContratual, selectedFile)
            toast({
                title: "Sucesso",
                description: "Documento anexado com sucesso!",
            })
            setIsDocumentDialogOpen(false)
            setSelectedFile(null)
            loadAditivos()
        } catch (error) {
            toast({
                title: "Erro",
                description: "Não foi possível anexar o documento.",
                variant: "destructive",
            })
        }
    }

    const handleDownloadDocument = async (documentoId: number, fileName: string) => {
        try {
            const blob = await downloadAditivoDocument(documentoId)

            // Criar um link para download
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", fileName)
            document.body.appendChild(link)
            link.click()
            link.remove()

            toast({
                title: "Sucesso",
                description: "Download iniciado.",
            })
        } catch (error) {
            toast({
                title: "Erro",
                description: "Não foi possível baixar o documento.",
                variant: "destructive",
            })
        }
    }

    const handleDeleteDocument = async (documentoId: number) => {
        if (!confirm("Tem certeza que deseja excluir este documento?")) {
            return
        }

        try {
            await deleteAditivoDocument(documentoId)
            toast({
                title: "Sucesso",
                description: "Documento excluído com sucesso!",
            })
            loadAditivos()
        } catch (error) {
            toast({
                title: "Erro",
                description: "Não foi possível excluir o documento.",
                variant: "destructive",
            })
        }
    }

    const resetForm = () => {
        setFormData({
            tipo: "",
            descricaoMudancas: "",
            justificativa: "",
            dataVigencia: "",
            contratoId: contratoId,
        })
        setDataVigencia(undefined)
    }

    const getTipoLabel = (tipo: string) => {
        const tipoEncontrado = tiposAditivo.find((t) => t.value === tipo)
        return tipoEncontrado ? tipoEncontrado.label : tipo
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
                        <span className="ml-2">Carregando Aditivos...</span>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Aditivos do Contrato</h2>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Aditivo
                </Button>
            </div>

            {aditivos.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center h-40">
                        <FileText className="h-10 w-10 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">Nenhum aditivo encontrado para este contrato.</p>
                        <Button variant="outline" className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Adicionar Aditivo
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-6">
                    {aditivos.map((aditivo) => (
                        <Card key={aditivo.idAditivoContratual}>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle>{getTipoLabel(aditivo.tipo)}</CardTitle>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setSelectedAditivo(aditivo)
                                            setIsDocumentDialogOpen(true)
                                        }}
                                    >
                                        <Upload className="mr-2 h-4 w-4" />
                                        Anexar Documento
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-sm font-medium">Descrição das Mudanças</p>
                                    <p className="text-sm text-muted-foreground">{aditivo.descricaoMudancas}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Justificativa</p>
                                    <p className="text-sm text-muted-foreground">{aditivo.justificativa}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium">Data de Vigência</p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(aditivo.dataVigencia).toLocaleDateString("pt-BR")}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Data de Criação</p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(aditivo.criadoEm).toLocaleDateString("pt-BR")}
                                        </p>
                                    </div>
                                </div>

                                {aditivo.documentos && aditivo.documentos.length > 0 && (
                                    <div>
                                        <p className="text-sm font-medium mb-2">Documentos</p>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Nome</TableHead>
                                                    <TableHead>Tipo</TableHead>
                                                    <TableHead>Tamanho</TableHead>
                                                    <TableHead>Data</TableHead>
                                                    <TableHead>Ações</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {aditivo.documentos.map((doc) => (
                                                    <TableRow key={doc.idDocumento}>
                                                        <TableCell>{doc.nomeArquivo}</TableCell>
                                                        <TableCell>{doc.mimeType}</TableCell>
                                                        <TableCell>{(doc.tamanho / 1024).toFixed(2)} KB</TableCell>
                                                        <TableCell>{new Date(doc.criadoEm).toLocaleDateString("pt-BR")}</TableCell>
                                                        <TableCell>
                                                            <div className="flex space-x-2">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => handleDownloadDocument(doc.idDocumento, doc.nomeArquivo)}
                                                                >
                                                                    <Download className="h-4 w-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="text-red-500 hover:text-red-700"
                                                                    onClick={() => handleDeleteDocument(doc.idDocumento)}
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Dialog para criar aditivo */}
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                        <DialogTitle>Novo Aditivo</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="tipo">Tipo de Aditivo</Label>
                            <Select value={formData.tipo} onValueChange={(value) => setFormData({ ...formData, tipo: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    {tiposAditivo.map((tipo) => (
                                        <SelectItem key={tipo.value} value={tipo.value}>
                                            {tipo.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="descricaoMudancas">Descrição das Mudanças</Label>
                            <Textarea
                                id="descricaoMudancas"
                                value={formData.descricaoMudancas}
                                onChange={(e) => setFormData({ ...formData, descricaoMudancas: e.target.value })}
                                placeholder="Descreva as mudanças que este aditivo implementa"
                                rows={3}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="justificativa">Justificativa</Label>
                            <Textarea
                                id="justificativa"
                                value={formData.justificativa}
                                onChange={(e) => setFormData({ ...formData, justificativa: e.target.value })}
                                placeholder="Justifique a necessidade deste aditivo"
                                rows={3}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Data de Vigência</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !dataVigencia && "text-muted-foreground",
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dataVigencia ? format(dataVigencia, "PPP", { locale: ptBR }) : "Selecione a data"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={dataVigencia} onSelect={setDataVigencia} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                            <X className="mr-2 h-4 w-4" />
                            Cancelar
                        </Button>
                        <Button onClick={handleCreateAditivo}>
                            <Save className="mr-2 h-4 w-4" />
                            Salvar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Dialog para anexar documento */}
            <Dialog open={isDocumentDialogOpen} onOpenChange={setIsDocumentDialogOpen}>
                <DialogContent className="sm:max-w-[450px]">
                    <DialogHeader>
                        <DialogTitle>Anexar Documento</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="file">Arquivo</Label>
                            <Input
                                id="file"
                                type="file"
                                onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDocumentDialogOpen(false)}>
                            <X className="mr-2 h-4 w-4" />
                            Cancelar
                        </Button>
                        <Button onClick={handleUploadDocument}>
                            <Upload className="mr-2 h-4 w-4" />
                            Enviar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
