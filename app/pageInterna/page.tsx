import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, ClipboardList, FileText, Truck, Users } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="analytics">Análises</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Contratos Ativos</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+2 no último mês</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Entregáveis Pendentes</CardTitle>
                  <ClipboardList className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">3 com prazo próximo</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Contratos Finalizados</CardTitle>
                  <Truck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">2 em andamento</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">......................</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">6</div>
                  <p className="text-xs text-muted-foreground">.................................</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Contratos Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      {
                        id: 1,
                        name: "Contrato de Manutenção Predial",
                        client: "Empresa ABC",
                        date: "12/03/2025",
                        status: "Ativo",
                      },
                      {
                        id: 2,
                        name: "Fornecimento de Equipamentos",
                        client: "Empresa XYZ",
                        date: "05/02/2025",
                        status: "Ativo",
                      },
                      {
                        id: 3,
                        name: "Serviços de Consultoria",
                        client: "Empresa 123",
                        date: "20/01/2025",
                        status: "Em análise",
                      },
                      {
                        id: 4,
                        name: "Contrato de Prestação de Serviços",
                        client: "Empresa DEF",
                        date: "10/01/2025",
                        status: "Ativo",
                      },
                    ].map((contract) => (
                      <div key={contract.id} className="flex items-center justify-between rounded-lg border p-3">
                        <div className="space-y-1">
                          <p className="font-medium leading-none">{contract.name}</p>
                          <p className="text-sm text-muted-foreground">{contract.client}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-muted-foreground">{contract.date}</div>
                          <div
                            className={`rounded-full px-2 py-1 text-xs ${contract.status === "Ativo"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                              }`}
                          >
                            {contract.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/contratos" className="text-sm text-muted-foreground hover:underline">
                    Ver todos os contratos
                  </Link>
                </CardFooter>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Entregáveis Próximos</CardTitle>
                  <CardDescription>Entregáveis com prazo nos próximos 30 dias</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        id: 1,
                        name: "Relatório Mensal",
                        contract: "Contrato de Manutenção Predial",
                        date: "15/04/2025",
                        status: "Em andamento",
                      },
                      {
                        id: 2,
                        name: "Instalação de Equipamentos",
                        contract: "Fornecimento de Equipamentos",
                        date: "20/04/2025",
                        status: "Planejado",
                      },
                      {
                        id: 3,
                        name: "Treinamento da Equipe",
                        contract: "Serviços de Consultoria",
                        date: "25/04/2025",
                        status: "Planejado",
                      },
                    ].map((deliverable) => (
                      <div key={deliverable.id} className="flex flex-col space-y-2 rounded-lg border p-3">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{deliverable.name}</p>
                          <div
                            className={`rounded-full px-2 py-1 text-xs ${deliverable.status === "Em andamento"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                              }`}
                          >
                            {deliverable.status}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">{deliverable.contract}</div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CalendarDays className="mr-1 h-3 w-3" />
                          {deliverable.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/entregaveis" className="text-sm text-muted-foreground hover:underline">
                    Ver todos os entregáveis
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

