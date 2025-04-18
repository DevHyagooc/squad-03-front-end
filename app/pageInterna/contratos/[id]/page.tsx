import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, FileSignature, Download, Edit, Calendar, User, Building, DollarSign, Plus } from "lucide-react"
import Link from "next/link"

export default function ContratoDetalhesPage({ params }: { params: { id: string } }) {
  // Simulação de dados do contrato
  const contract = {
    id: params.id,
    name: "Contrato de Manutenção Predial",
    client: "Empresa ABC",
    startDate: "01/01/2025",
    endDate: "31/12/2025",
    status: "Ativo",
    value: "R$ 120.000,00",
    description:
      "Contrato para prestação de serviços de manutenção predial preventiva e corretiva para as instalações da Empresa ABC.",
    responsible: "João Silva",
    createdAt: "15/12/2024",
    updatedAt: "20/12/2024",
  }

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{contract.name}</h1>
          <p className="text-muted-foreground">ID: {contract.id}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cliente</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Building className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{contract.client}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Valor</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{contract.value}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                contract.status === "Ativo"
                  ? "bg-green-100 text-green-800"
                  : contract.status === "Em análise"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
              }`}
            >
              {contract.status}
            </div>
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
                  <span>{contract.startDate}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Data de Término</p>
                <div className="flex items-center gap-2 pt-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{contract.endDate}</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Responsável</p>
              <div className="flex items-center gap-2 pt-1">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{contract.responsible}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Descrição</p>
              <p className="pt-1">{contract.description}</p>
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
                    {contract.createdAt} por {contract.responsible}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
                  <Edit className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Contrato atualizado</p>
                  <p className="text-sm text-muted-foreground">
                    {contract.updatedAt} por {contract.responsible}
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
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            deliverable.status === "Concluído"
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
      </Tabs>
    </div>
  )
}

