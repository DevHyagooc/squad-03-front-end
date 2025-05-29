"use client"

import { useState, use } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  FileText,
  FileSignature,
  Download,
  Edit,
  Calendar,
  User,
  Building,
  DollarSign,
  Plus,
  FileCheck,
} from "lucide-react"
import Link from "next/link"
import { getContratoId } from "@/services/contrato"
import { EditarContratoDialog } from "@/components/EditContratoForm/index"

export interface Empresa {
  idOrgao: number
  nomeFantasia: string
  razaoSocial: string
  cnpj: string
  numeroEmpresa: string | null
  estado: string
  cidade: string
  inscricaoMunicipal: string
  tipoEmpresa: string
  cep: string
  bairro: string
  logradouro: string
  numero: string
  complemento: string
  email: string
  telefone: string
  representantes: Representante[]
}

export interface Representante {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
}

export interface Responsavel {
  idFuncionario: number
  nome: string
  email: string
  cpf: string
  cargo: string
  telefone: string
  dataNascimento: string
}

export interface Contrato {
  idContrato: number
  numeroContrato: string
  descricao: string
  dataInicio: string
  dataFim: string
  termosDePagamento: string
  valorContrato: number
  valorTotalPago: number
  valorTotalPendente: number
  autoRenovacao: boolean
  diasParaCancelamento: number
  motivoCancelamento: string
  criadoEm: string
  atualizadoEm: string
  criadoPor: string | null
  atualizadoPor: string | null
  statusContrato: string
  tipoContrato: string
  tags: string
  documentUrl: string | null
  empresa: Empresa
  responsavel: Responsavel
}

export default function ContratoDetalhesPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [contrato, setContrato] = useState<Contrato | null>(null)
  const [Loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Carrega os dados do contrato
  useState(() => {
    const fetchContrato = async () => {
      try {
        const data = await getContratoId(resolvedParams.id)
        setContrato(data)
      } catch (error) {
        console.error("Erro ao carregar contrato:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchContrato()
  })

  // Recarrega os dados do contrato após atualização
  const handleContratoUpdated = async () => {
    setLoading(true)
    try {
      const data = await getContratoId(resolvedParams.id)
      setContrato(data)
    } catch (error) {
      console.error("Erro ao recarregar contrato:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "ATIVO":
        return "bg-green-100 text-green-800"
      case "PENDENTE":
        return "bg-yellow-100 text-yellow-800"
      case "CANCELADO":
        return "bg-red-100 text-red-800"
      case "FINALIZADO":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (Loading) {
    return (
      <div className=" inset-0 flex items-center justify-center pointer-events-none z-50 bg-white/40 backdrop-blur-sm">
         <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-gray-300 rounded-full opacity-25"></div>
            <div className="absolute inset-0 border-4 border-t-gray-800 rounded-full animate-spin"></div>
         </div>
      </div>
    )
  }

  if (!contrato) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg font-medium">Contrato não encontrado</p>
          <Link href="/contratos">
            <Button className="mt-4">Voltar para contratos</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{contrato.descricao}</h1>
          <p className="text-muted-foreground">Contrato: {contrato.numeroContrato}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button>
            <FileSignature className="mr-2 h-4 w-4" />
            Adicionar Aditivo
          </Button>
        </div>
      </div>

      {/* Diálogo de edição */}
      {contrato && (
        <EditarContratoDialog
          contrato={contrato}
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onContratoUpdated={handleContratoUpdated}
        />
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cliente</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Building className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{contrato.empresa.nomeFantasia}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Valor do Contrato</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">
              {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(contrato.valorContrato)}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                contrato.statusContrato,
              )}`}
            >
              {contrato.statusContrato}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tipo</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <FileCheck className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{contrato.tipoContrato}</span>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Contrato</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Data de Início</p>
                <div className="flex items-center gap-2 pt-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(contrato.dataInicio).toLocaleDateString("pt-BR")}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Data de Término</p>
                <div className="flex items-center gap-2 pt-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(contrato.dataFim).toLocaleDateString("pt-BR")}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Termos de Pagamento</p>
                <div className="flex items-center gap-2 pt-1">
                  <span>{contrato.termosDePagamento} dias</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Auto Renovação</p>
                <div className="flex items-center gap-2 pt-1">
                  <span>{contrato.autoRenovacao ? "Sim" : "Não"}</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Responsável</p>
              <div className="flex items-center gap-2 pt-1">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>
                  {contrato.responsavel.nome} ({contrato.responsavel.cargo})
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Descrição</p>
              <p className="pt-1">{contrato.descricao}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Informações da Empresa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Razão Social</p>
              <p className="pt-1">{contrato.empresa.razaoSocial}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">CNPJ</p>
              <p className="pt-1">{contrato.empresa.cnpj}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Endereço</p>
              <p className="pt-1">
                {contrato.empresa.logradouro}, {contrato.empresa.numero} - {contrato.empresa.complemento}
                <br />
                {contrato.empresa.bairro}, {contrato.empresa.cidade} - {contrato.empresa.estado}
                <br />
                CEP: {contrato.empresa.cep}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Contato</p>
              <p className="pt-1">
                {contrato.empresa.email}
                <br />
                {contrato.empresa.telefone}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Valores</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Valor Total</p>
                <p className="pt-1 text-lg font-semibold">
                  {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                    contrato.valorContrato,
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Valor Pago</p>
                <p className="pt-1 text-lg font-semibold">
                  {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                    contrato.valorTotalPago,
                  )}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Valor Pendente</p>
              <p className="pt-1 text-lg font-semibold">
                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                  contrato.valorTotalPendente,
                )}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Histórico</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Contrato criado</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(contrato.criadoEm).toLocaleDateString("pt-BR")} às{" "}
                    {new Date(contrato.criadoEm).toLocaleTimeString("pt-BR")}
                    {contrato.criadoPor ? ` por ${contrato.criadoPor}` : ""}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
                  <Edit className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Última atualização</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(contrato.atualizadoEm).toLocaleDateString("pt-BR")} às{" "}
                    {new Date(contrato.atualizadoEm).toLocaleTimeString("pt-BR")}
                    {contrato.atualizadoPor ? ` por ${contrato.atualizadoPor}` : ""}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="entregaveis" className="space-y-4">
        <TabsList>
          <TabsTrigger value="entregaveis">Entregáveis</TabsTrigger>
          <TabsTrigger value="ordens">Ordens de Serviço</TabsTrigger>
          <TabsTrigger value="recaptulacoes">Recaptulações</TabsTrigger>
          <TabsTrigger value="aditivos">Aditivos</TabsTrigger>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
          <TabsTrigger value="representantes">Representantes</TabsTrigger>
        </TabsList>
        <TabsContent value="entregaveis">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Entregáveis</CardTitle>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Novo Entregável
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Data de Entrega</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: "ENT-001",
                      name: "Relatório Mensal",
                      date: "15/04/2025",
                      status: "Em andamento",
                      responsible: "João Silva",
                    },
                    {
                      id: "ENT-002",
                      name: "Manutenção Preventiva",
                      date: "30/04/2025",
                      status: "Planejado",
                      responsible: "Maria Santos",
                    },
                    {
                      id: "ENT-003",
                      name: "Vistoria Técnica",
                      date: "10/05/2025",
                      status: "Planejado",
                      responsible: "Carlos Oliveira",
                    },
                  ].map((deliverable) => (
                    <TableRow key={deliverable.id}>
                      <TableCell>{deliverable.id}</TableCell>
                      <TableCell>{deliverable.name}</TableCell>
                      <TableCell>{deliverable.date}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${deliverable.status === "Concluído"
                              ? "bg-green-100 text-green-800"
                              : deliverable.status === "Em andamento"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                        >
                          {deliverable.status}
                        </div>
                      </TableCell>
                      <TableCell>{deliverable.responsible}</TableCell>
                      <TableCell>
                        <Link href={`/entregaveis/${deliverable.id}`}>
                          <Button variant="outline" size="sm">
                            Detalhes
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="representantes">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Representantes da Empresa</CardTitle>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Novo Representante
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contrato.empresa.representantes.map((representante) => (
                    <TableRow key={representante.id}>
                      <TableCell>{representante.id}</TableCell>
                      <TableCell>{representante.nome}</TableCell>
                      <TableCell>{representante.cpf}</TableCell>
                      <TableCell>{representante.email}</TableCell>
                      <TableCell>{representante.telefone}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
