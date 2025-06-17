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
import { CalendarIcon, Download, Plus, Save, Trash2, Upload, X, Edit2, Loader2 } from "lucide-react"

import {
  type AditivoRequest,
  type AditivoResponse,
  createAditivo,
  getAditivosByContrato,
  updateAditivo,
  deleteAditivo,
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
  { value: "OUTROS", label: "Outros" },
]

export function AditivosContrato({ contratoId }: AditivosContratoProps) {
  const [aditivos, setAditivos] = useState<AditivoResponse[]>([])
  const [loading, setLoading] = useState(true)

  const [isAditivoDialogOpen, setIsAditivoDialogOpen] = useState(false)
  const [selectedAditivoParaEdicao, setSelectedAditivoParaEdicao] = useState<AditivoResponse | null>(null)

  const [formData, setFormData] = useState<AditivoRequest>({
    tipo: "",
    descricaoMudancas: "",
    justificativa: "",
    dataVigencia: "",
    contratoId: contratoId,
  })
  const [dataVigencia, setDataVigencia] = useState<Date>()

  const [isDeleteAditivoDialogOpen, setIsDeleteAditivoDialogOpen] = useState(false)
  const [aditivoParaDeletar, setAditivoParaDeletar] = useState<{
    id: number
    tipo: string
  } | null>(null)

  const [isDocumentDialogOpen, setIsDocumentDialogOpen] = useState(false)
  const [selectedAditivo, setSelectedAditivo] = useState<AditivoResponse | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // Estados de loading
  const [savingAditivo, setSavingAditivo] = useState(false)
  const [deletingAditivo, setDeletingAditivo] = useState(false)
  const [uploadingDocument, setUploadingDocument] = useState(false)
  const [deletingDocument, setDeletingDocument] = useState(false)

  useEffect(() => {
    loadAditivos()
  }, [contratoId])

  async function loadAditivos() {
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

  function onOpenCreateAditivoDialog() {
    setSelectedAditivoParaEdicao(null)
    setFormData({
      tipo: "",
      descricaoMudancas: "",
      justificativa: "",
      dataVigencia: "",
      contratoId: contratoId,
    })
    setDataVigencia(undefined)
    setIsAditivoDialogOpen(true)
  }

  function onOpenEditAditivoDialog(aditivo: AditivoResponse) {
    setSelectedAditivoParaEdicao(aditivo)
    setFormData({
      tipo: aditivo.tipo,
      descricaoMudancas: aditivo.descricaoMudancas,
      justificativa: aditivo.justificativa,
      dataVigencia: aditivo.dataVigencia,
      contratoId: contratoId,
    })
    setDataVigencia(new Date(aditivo.dataVigencia))
    setIsAditivoDialogOpen(true)
  }

  async function handleSubmitAditivo() {
    if (!dataVigencia) {
      toast({
        title: "Atenção",
        description: "A data de vigência é obrigatória.",
        variant: "destructive",
      })
      return
    }
    if (!formData.tipo.trim()) {
      toast({
        title: "Atenção",
        description: "O tipo de aditivo é obrigatório.",
        variant: "destructive",
      })
      return
    }

    const payload: AditivoRequest = {
      ...formData,
      dataVigencia: dataVigencia.toISOString().split("T")[0],
      contratoId: contratoId,
    }

    try {
      setSavingAditivo(true)

      if (selectedAditivoParaEdicao) {
        await updateAditivo(selectedAditivoParaEdicao.idAditivoContractual, payload)
        toast({
          title: "Sucesso",
          description: "Aditivo atualizado com sucesso!",
        })
      } else {
        await createAditivo(payload)
        toast({
          title: "Sucesso",
          description: "Aditivo criado com sucesso!",
        })
      }
      setIsAditivoDialogOpen(false)
      setSelectedAditivoParaEdicao(null)
      loadAditivos()
    } catch (error) {
      toast({
        title: "Erro",
        description: selectedAditivoParaEdicao
          ? "Não foi possível atualizar o aditivo."
          : "Não foi possível criar o aditivo.",
        variant: "destructive",
      })
    } finally {
      setSavingAditivo(false)
    }
  }

  function onRequestDeleteAditivo(idAditivo: number, tipo: string) {
    setAditivoParaDeletar({ id: idAditivo, tipo })
    setIsDeleteAditivoDialogOpen(true)
  }

  async function onConfirmDeleteAditivo() {
    if (!aditivoParaDeletar) {
      setIsDeleteAditivoDialogOpen(false)
      return
    }

    try {
      setDeletingAditivo(true)
      await deleteAditivo(aditivoParaDeletar.id)
      toast({
        title: "Sucesso",
        description: "Aditivo excluído com sucesso!",
      })
      loadAditivos()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o aditivo.",
        variant: "destructive",
      })
    } finally {
      setDeletingAditivo(false)
      setIsDeleteAditivoDialogOpen(false)
      setAditivoParaDeletar(null)
    }
  }

  async function handleUploadDocument() {
    if (!selectedFile || !selectedAditivo) {
      toast({
        title: "Erro",
        description: "Selecione um arquivo para upload.",
        variant: "destructive",
      })
      return
    }

    try {
      setUploadingDocument(true)
      await uploadAditivoDocument(selectedAditivo.idAditivoContractual, selectedFile)
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
    } finally {
      setUploadingDocument(false)
    }
  }

  async function handleDownloadDocument(documentoId: number, fileName: string) {
    try {
      const blob = await downloadAditivoDocument(documentoId)
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

  async function handleDeleteDocument(documentoId: number) {
    try {
      setDeletingDocument(true)
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
    } finally {
      setDeletingDocument(false)
    }
  }

  function resetForm() {
    setFormData({
      tipo: "",
      descricaoMudancas: "",
      justificativa: "",
      dataVigencia: "",
      contratoId: contratoId,
    })
    setDataVigencia(undefined)
    setSelectedAditivoParaEdicao(null)
  }

  function getTipoLabel(tipo: string) {
    const tipoEncontrado = tiposAditivo.find((t) => t.value === tipo)
    return tipoEncontrado ? tipoEncontrado.label : tipo
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 border-4 border-gray-300 rounded-full opacity-25" />
              <div className="absolute inset-0 border-4 border-t-gray-800 rounded-full animate-spin" />
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
        <Button onClick={onOpenCreateAditivoDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Aditivo
        </Button>
      </div>

      {aditivos.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-40">
            <p className="text-muted-foreground">Nenhum aditivo encontrado para este contrato.</p>
            <Button variant="outline" className="mt-4" onClick={onOpenCreateAditivoDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Aditivo
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {aditivos.map((aditivo) => (
            <Card key={aditivo.idAditivoContractual}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{getTipoLabel(aditivo.tipo)}</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => onOpenEditAditivoDialog(aditivo)}>
                      <Edit2 className="mr-2 h-4 w-4" />
                      Editar
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onRequestDeleteAditivo(aditivo.idAditivoContractual, getTipoLabel(aditivo.tipo))}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir
                    </Button>

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
                                  disabled={deletingDocument}
                                >
                                  {deletingDocument ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Trash2 className="h-4 w-4" />
                                  )}
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

      {/* Modal de Confirmação para Deletar Aditivo */}
      <Dialog open={isDeleteAditivoDialogOpen} onOpenChange={setIsDeleteAditivoDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Tem certeza que deseja excluir o aditivo <strong>{aditivoParaDeletar?.tipo}</strong>?
            </p>
            <p className="text-sm text-muted-foreground mt-2">Esta ação não pode ser desfeita.</p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteAditivoDialogOpen(false)
                setAditivoParaDeletar(null)
              }}
            >
              Cancelar
            </Button>
            <Button variant="destructive" onClick={onConfirmDeleteAditivo} disabled={deletingAditivo}>
              {deletingAditivo ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Excluindo...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Excluir Aditivo
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAditivoDialogOpen} onOpenChange={setIsAditivoDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{selectedAditivoParaEdicao ? "Editar Aditivo" : "Novo Aditivo"}</DialogTitle>
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
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    descricaoMudancas: e.target.value,
                  })
                }
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
            <Button
              variant="outline"
              onClick={() => {
                setIsAditivoDialogOpen(false)
                resetForm()
              }}
            >
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button onClick={handleSubmitAditivo} disabled={savingAditivo}>
              {savingAditivo ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {selectedAditivoParaEdicao ? "Atualizando..." : "Salvando..."}
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {selectedAditivoParaEdicao ? "Salvar Alterações" : "Salvar"}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
            <Button onClick={handleUploadDocument} disabled={uploadingDocument}>
              {uploadingDocument ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Enviar
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
