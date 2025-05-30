'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Save, X } from 'lucide-react'
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { updateContrato } from "@/services/contrato"
import { toast } from "@/hooks/use-toast"
import { Colaborador } from '@/app/pageInterna/colaboradores/page'
import { Empresa } from '@/app/pageInterna/empresas/page'
import { Contrato } from '@/app/pageInterna/contratos/[id]/page'

 interface ContratoForm {
   idContrato: number
   numeroContrato: string
   descricao: string
   dataInicio: string
   dataFim: string
   termosDePagamento: string
   valorContrato: number
   valorTotalPago: number
   autoRenovacao: boolean
   diasParaCancelamento: number
   motivoCancelamento: string
   statusContrato: string
   tipoContrato: string
   tags: string
   documentUrl: string | null
   empresa: Empresa
   responsavel: Colaborador
   [key: string]: any // Para permitir acesso a outras propriedades
 }

interface EditarContratoDialogProps {
  contrato: Contrato
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onContratoUpdated?: () => void
}

export function EditarContratoDialog({ 
  contrato, 
  isOpen, 
  onOpenChange,
  onContratoUpdated 
}: EditarContratoDialogProps) {
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<Partial<ContratoForm>>({})
  const [dataInicio, setDataInicio] = useState<Date>()
  const [dataFim, setDataFim] = useState<Date>()

  // Inicializa o formulário quando o contrato muda ou o diálogo é aberto
  useEffect(() => {
    if (contrato && isOpen) {
      setFormData({
        numeroContrato: contrato.numeroContrato,
        descricao: contrato.descricao,
        termosDePagamento: contrato.termosDePagamento,
        valorContrato: contrato.valorContrato,
        valorTotalPago: contrato.valorTotalPago,
        autoRenovacao: contrato.autoRenovacao,
        diasParaCancelamento: contrato.diasParaCancelamento,
        motivoCancelamento: contrato.motivoCancelamento,
        statusContrato: contrato.statusContrato,
        tipoContrato: contrato.tipoContrato,
        tags: contrato.tags,
        documentUrl: contrato.documentUrl,
        empresaId: contrato.empresa.idOrgao.toString(),
        responsavelId: contrato.responsavel.idFuncionario.toString()
      })
      setDataInicio(new Date(contrato.dataInicio))
      setDataFim(new Date(contrato.dataFim))
    }
  }, [contrato, isOpen])

  const handleInputChange = (field: keyof ContratoForm, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const dadosAtualizados = {
        ...formData,
        dataInicio: dataInicio?.toISOString(),
        dataFim: dataFim?.toISOString(),
      }

      await updateContrato(contrato.idContrato.toString(), dadosAtualizados)
      
      toast({
        title: "Sucesso",
        description: "Contrato atualizado com sucesso!",
      })
      
      // Fecha o diálogo e notifica o componente pai sobre a atualização
      onOpenChange(false)
      if (onContratoUpdated) {
        onContratoUpdated()
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o contrato. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Editar Contrato</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <Tabs defaultValue="informacoes" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="informacoes">Informações Básicas</TabsTrigger>
              <TabsTrigger value="datas">Datas e Valores</TabsTrigger>
              <TabsTrigger value="observacoes">Observações</TabsTrigger>
            </TabsList>
            
            <TabsContent value="informacoes" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="numeroContrato">Número do Contrato</Label>
                <Input
                  id="numeroContrato"
                  value={formData.numeroContrato || ''}
                  onChange={(e) => handleInputChange('numeroContrato', e.target.value)}
                  placeholder="Ex: CTR-2024-001"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao || ''}
                  onChange={(e) => handleInputChange('descricao', e.target.value)}
                  placeholder="Descrição do contrato"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Status do Contrato</Label>
                  <Select
                    value={formData.statusContrato || ''}
                    onValueChange={(value) => handleInputChange('statusContrato', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ATIVO">Ativo</SelectItem>
                      <SelectItem value="INATIVO">Inativo</SelectItem>
                      <SelectItem value="ENCERRADO">Encerrado</SelectItem>
                      <SelectItem value="ARQUIVADO">Arquivado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tipo do Contrato</Label>
                  <Select
                    value={formData.tipoContrato || ''}
                    onValueChange={(value) => handleInputChange('tipoContrato', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PRESTACAO_SERVICOS">Prestação de Serviços</SelectItem>
                      <SelectItem value="FORNECIMENTO">Fornecimento</SelectItem>
                      <SelectItem value="MANUTENCAO">Manutenção</SelectItem>
                      <SelectItem value="CONSULTORIA">Consultoria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={formData.tags || ''}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  placeholder="Ex: manutenção, urgente, mensal"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="datas" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Data de Início</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dataInicio && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dataInicio ? format(dataInicio, "PPP", { locale: ptBR }) : "Selecione a data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dataInicio}
                        onSelect={setDataInicio}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Data de Término</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dataFim && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dataFim ? format(dataFim, "PPP", { locale: ptBR }) : "Selecione a data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dataFim}
                        onSelect={setDataFim}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="termosDePagamento">Termos de Pagamento (dias)</Label>
                <Input
                  id="termosDePagamento"
                  type="number"
                  value={formData.termosDePagamento || ''}
                  onChange={(e) => handleInputChange('termosDePagamento', e.target.value)}
                  placeholder="Ex: 30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="valorContrato">Valor do Contrato (R$)</Label>
                <Input
                  id="valorContrato"
                  type="number"
                  step="0.01"
                  value={formData.valorContrato || ''}
                  onChange={(e) => handleInputChange('valorContrato', Number(e.target.value))}
                  placeholder="Ex: 50000.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="valorTotalPago">Valor Total Pago (R$)</Label>
                <Input
                  id="valorTotalPago"
                  type="number"
                  step="0.01"
                  value={formData.valorTotalPago || ''}
                  onChange={(e) => handleInputChange('valorTotalPago', Number(e.target.value))}
                  placeholder="Ex: 50000.00"
                />
              </div>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="diasParaCancelamento">Dias para Cancelamento</Label>
                      <Input
                        id="diasParaCancelamento"
                        type="number"
                        value={formData.diasParaCancelamento || ''}
                        onChange={(e) => handleInputChange('diasParaCancelamento', Number(e.target.value))}
                        placeholder="Ex: 30"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="autoRenovacao"
                        checked={formData.autoRenovacao || false}
                        onCheckedChange={(checked) => handleInputChange('autoRenovacao', checked)}
                      />
                      <Label htmlFor="autoRenovacao">Auto Renovação</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="observacoes" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="motivoCancelamento">Motivo de Cancelamento</Label>
                <Textarea
                  id="motivoCancelamento"
                  value={formData.motivoCancelamento || ''}
                  onChange={(e) => handleInputChange('motivoCancelamento', e.target.value)}
                  placeholder="Descreva o motivo caso aplicável"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="documentUrl">URL do Documento</Label>
                <Input
                  id="documentUrl"
                  type="url"
                  value={formData.documentUrl || ''}
                  onChange={(e) => handleInputChange('documentUrl', e.target.value)}
                  placeholder="https://exemplo.com/documento.pdf"
                />
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button type="submit" disabled={saving}>
              <Save className="mr-2 h-4 w-4" />
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}