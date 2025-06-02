"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Download, Trash2, FileText, Plus, AlertTriangle, FileIcon } from "lucide-react"
import { getDocumentosByContrato, uploadDocumento, downloadDocumento, deleteDocumento } from "@/services/documento"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Documento {
  idDocumento: number
  nomeArquivo: string
  mimeType: string
  tamanho: number
  criadoEm: string
  contratoId: number
}

interface DocumentosContratoProps {
  contratoId: number
}

export function DocumentosContrato({ contratoId }: DocumentosContratoProps) {
  const [documentos, setDocumentos] = useState<Documento[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [documentoToDelete, setDocumentoToDelete] = useState<Documento | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    carregarDocumentos()
  }, [contratoId])

  const carregarDocumentos = async () => {
    try {
      setLoading(true)
      const data = await getDocumentosByContrato(contratoId)
      setDocumentos(data)
    } catch (error) {
      console.error("Erro ao carregar documentos:", error)
      toast({
        title: "Erro",
        description: "Erro ao carregar documentos do contrato.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "Erro",
        description: "Selecione um arquivo para upload.",
        variant: "destructive",
      })
      return
    }

    try {
      setUploading(true)
      await uploadDocumento(contratoId.toString(), selectedFile)

      toast({
        title: "Sucesso",
        description: "Documento anexado com sucesso!",
      })

      setSelectedFile(null)
      setIsUploadOpen(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      await carregarDocumentos()
    } catch (error) {
      console.error("Erro no upload:", error)
      toast({
        title: "Erro",
        description: "Erro ao fazer upload do documento.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleDownload = async (documento: Documento) => {
    try {
      const blob = await downloadDocumento(documento.idDocumento)

      // Criar URL temporária e fazer download
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = documento.nomeArquivo
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({
        title: "Sucesso",
        description: "Download iniciado!",
      })
    } catch (error) {
      console.error("Erro no download:", error)
      toast({
        title: "Erro",
        description: "Erro ao fazer download do documento.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async () => {
    if (!documentoToDelete) return

    try {
      await deleteDocumento(documentoToDelete.idDocumento)

      toast({
        title: "Sucesso",
        description: "Documento excluído com sucesso!",
      })

      setDocumentoToDelete(null)
      await carregarDocumentos()
    } catch (error) {
      console.error("Erro ao deletar:", error)
      toast({
        title: "Erro",
        description: "Erro ao excluir documento.",
        variant: "destructive",
      })
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes("pdf")) return <FileText className="h-4 w-4 text-red-500" />
    if (mimeType.includes("image")) return <FileIcon className="h-4 w-4 text-blue-500" />
    if (mimeType.includes("word") || mimeType.includes("document"))
      return <FileText className="h-4 w-4 text-blue-600" />
    return <FileIcon className="h-4 w-4 text-gray-500" />
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className=" inset-0 flex items-center justify-center pointer-events-none z-50 bg-white/40 backdrop-blur-sm">
                <div className="relative w-12 h-12">
                    <div className="absolute inset-0 border-4 border-gray-300 rounded-full opacity-25"></div>
                    <div className="absolute inset-0 border-4 border-t-gray-800 rounded-full animate-spin"></div>
                </div>
                <span className="ml-2">Carregando Documentos...</span>
            </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Documentos do Contrato
        </CardTitle>
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Anexar Documento
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Anexar Novo Documento</DialogTitle>
              <DialogDescription>Selecione um arquivo para anexar ao contrato.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="file">Arquivo</Label>
                <Input
                  id="file"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                />
                {selectedFile && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Arquivo selecionado: {selectedFile.name} ({formatFileSize(selectedFile.size)})
                  </p>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleUpload} disabled={!selectedFile || uploading}>
                  {uploading ? (
                    <>
                      <Upload className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Anexar
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {documentos.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum documento anexado a este contrato.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Arquivo</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Tamanho</TableHead>
                <TableHead>Data de Upload</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documentos.map((documento) => (
                <TableRow key={documento.idDocumento}>
                  <TableCell className="flex items-center gap-2">
                    {getFileIcon(documento.mimeType)}
                    <span className="font-medium">{documento.nomeArquivo}</span>
                  </TableCell>
                  <TableCell>{documento.mimeType}</TableCell>
                  <TableCell>{formatFileSize(documento.tamanho)}</TableCell>
                  <TableCell>{new Date(documento.criadoEm).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleDownload(documento)}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setDocumentoToDelete(documento)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* Dialog de Confirmação de Exclusão */}
        <AlertDialog open={!!documentoToDelete} onOpenChange={() => setDocumentoToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Confirmar Exclusão
              </AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir o documento "{documentoToDelete?.nomeArquivo}"? Esta ação não pode ser
                desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}
