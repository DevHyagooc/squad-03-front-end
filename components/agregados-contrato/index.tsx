"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { toast } from "@/hooks/use-toast"
import { format, startOfDay } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { CalendarIcon, Edit, Plus, Save, Trash2, X } from "lucide-react"
import {
  createAgregado,
  getAgregadosByContrato,
  updateAgregado,
  deleteAgregado,
  getColaboradorList,
} from "@/services/agregado"

// Interfaces do componente
interface AgregadoRequest {
  funcao: string
  dataInicio: string
  dataFim: string | null
  contratoId: number
  colaboradorId: number
}

interface Colaborador {
  idFuncionario: number
  nome: string
  email: string
  cpf: string
  cargo: string
  telefone: string
  dataNascimento: string
}

interface AgregadoResponse {
  idAgregado: number
  funcao: string
  dataInicio: string
  dataFim: string | null
  contratoId: number
  colaboradorId: number
  colaborador: {
    idFuncionario: number
    nome: string
    email: string
    cargo: string
  }
  contrato: {
    idContrato: number
    numeroContrato: string
    descricao: string
  }
}

interface AgregadosContratoProps {
  contratoId: number
}

export function AgregadosContrato({ contratoId }: AgregadosContratoProps) {
  const [agregados, setAgregados] = useState<AgregadoResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<AgregadoRequest>({
    funcao: "",
    dataInicio: "",
    dataFim: null,
    contratoId: contratoId,
    colaboradorId: 0,
  })
  const [dataInicio, setDataInicio] = useState<Date>()
  const [dataFim, setDataFim] = useState<Date | undefined>()
  const [editId, setEditId] = useState<number | null>(null)

  const [colaboradores, setColaboradores] = useState<Colaborador[]>([])
  const [loadingColaboradores, setLoadingColaboradores] = useState(false)

  useEffect(() => {
    loadAgregados()
    loadColaboradores()
  }, [contratoId])

  // const hoje = startOfDay(new Date());

  const loadColaboradores = async () => {
    try {
      setLoadingColaboradores(true)
      const data = await getColaboradorList()
      setColaboradores(data)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar a lista de colaboradores.",
        variant: "destructive",
      })
    } finally {
      setLoadingColaboradores(false)
    }
  }

  useEffect(() => {
    loadAgregados()
  }, [contratoId])

  const loadAgregados = async () => {
    try {
      setLoading(true)
      const data = await getAgregadosByContrato(contratoId)
      setAgregados(data)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar os agregados.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDialog = (agregado?: AgregadoResponse) => {
    if (agregado) {
      setFormData({
        funcao: agregado.funcao,
        dataInicio: agregado.dataInicio,
        dataFim: agregado.dataFim,
        contratoId: contratoId,
        colaboradorId: agregado.colaboradorId,
      })
      setDataInicio(new Date(agregado.dataInicio))
      setDataFim(agregado.dataFim ? new Date(agregado.dataFim) : undefined)
      setEditId(agregado.idAgregado)
      setIsEditing(true)
    } else {
      resetForm()
      setIsEditing(false)
      setEditId(null)
    }
    setIsDialogOpen(true)
  }

  const handleSaveAgregado = async () => {
    try {
      if (!dataInicio) {
        toast({
          title: "Erro",
          description: "A data de início é obrigatória.",
          variant: "destructive",
        })
        return
      }

      const agregadoData = {
        ...formData,
        dataInicio: dataInicio.toISOString().split("T")[0],
        dataFim: dataFim ? dataFim.toISOString().split("T")[0] : null,
      }

      if (isEditing && editId) {
        await updateAgregado(editId, agregadoData)
        toast({
          title: "Sucesso",
          description: "Agregado atualizado com sucesso!",
        })
      } else {
        await createAgregado(agregadoData)
        toast({
          title: "Sucesso",
          description: "Agregado adicionado com sucesso!",
        })
      }

      setIsDialogOpen(false)
      resetForm()
      loadAgregados()
    } catch (error) {
      toast({
        title: "Erro",
        description: isEditing ? "Não foi possível atualizar o agregado." : "Não foi possível adicionar o agregado.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteAgregado = async (id: number) => {
    if (!confirm("Tem certeza que deseja remover este colaborador do contrato?")) {
      return
    }

    try {
      await deleteAgregado(id)
      toast({
        title: "Sucesso",
        description: "Colaborador removido com sucesso!",
      })
      loadAgregados()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível remover o colaborador.",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      funcao: "",
      dataInicio: "",
      dataFim: null,
      contratoId: contratoId,
      colaboradorId: 0,
    })
    setDataInicio(undefined)
    setDataFim(undefined)
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
            <span className="ml-2">Carregando Agregados...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Equipe do Contrato</h2>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Colaborador
        </Button>
      </div>

      {agregados.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-40">
            <p className="text-muted-foreground">Nenhum colaborador associado a este contrato.</p>
            <Button variant="outline" className="mt-4" onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Colaborador
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Colaborador</TableHead>
                  <TableHead>Função</TableHead>
                  <TableHead>Data de Início</TableHead>
                  <TableHead>Data de Término</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agregados.map((agregado) => (
                  <TableRow key={agregado.idAgregado}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{agregado.colaborador.nome}</p>
                        <p className="text-xs text-muted-foreground">{agregado.colaborador.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{agregado.funcao}</TableCell>
                    <TableCell>{new Date(agregado.dataInicio).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell>
                      {agregado.dataFim ? new Date(agregado.dataFim).toLocaleDateString("pt-BR") : "Em aberto"}
                    </TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${!agregado.dataFim ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                      >
                        {!agregado.dataFim ? "Ativo" : "Encerrado"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(agregado)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteAgregado(agregado.idAgregado)}
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

      {/* Dialog para adicionar/editar agregado */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Editar Colaborador" : "Adicionar Colaborador"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="colaboradorId">Colaborador</Label>
              <select
                id="colaboradorId"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.colaboradorId}
                onChange={(e) => setFormData({ ...formData, colaboradorId: Number(e.target.value) })}
                disabled={isEditing || loadingColaboradores}
              >
                <option value="0">
                  {loadingColaboradores ? "Carregando colaboradores..." : "Selecione um colaborador"}
                </option>
                {colaboradores.map((colaborador) => (
                  <option key={colaborador.idFuncionario} value={colaborador.idFuncionario}>
                    {colaborador.nome} - {colaborador.cargo}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="funcao">Função no Contrato</Label>
              <Input
                id="funcao"
                value={formData.funcao}
                onChange={(e) => setFormData({ ...formData, funcao: e.target.value })}
                placeholder="Ex: Coordenador de Projeto"
              />
            </div>
            <div className="grid gap-2">
              <Label>Data de Início</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !dataInicio && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dataInicio ? format(dataInicio, "PPP", { locale: ptBR }) : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dataInicio} onSelect={setDataInicio} />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label>Data de Término</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !dataFim && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dataFim ? format(dataFim, "PPP", { locale: ptBR }) : "Selecione a data (opcional)"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dataFim}
                    onSelect={setDataFim}
                    initialFocus
                    disabled={(date) => (dataInicio ? date < dataInicio : false)}
                  />
                </PopoverContent>
              </Popover>
              <p className="text-xs text-muted-foreground mt-1">Deixe em branco para vínculos em aberto.</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button onClick={handleSaveAgregado}>
              <Save className="mr-2 h-4 w-4" />
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
