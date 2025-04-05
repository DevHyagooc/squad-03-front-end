import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Plus, Search, Download } from "lucide-react"
import Link from "next/link"

export default function OrdensServicoPage() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Ordens de Serviço</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Ordem de Serviço
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Pesquisar ordens..." />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="aberta">Aberta</SelectItem>
                <SelectItem value="em-andamento">Em Andamento</SelectItem>
                <SelectItem value="concluida">Concluída</SelectItem>
                <SelectItem value="cancelada">Cancelada</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Responsável" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="joao">João Silva</SelectItem>
                <SelectItem value="maria">Maria Santos</SelectItem>
                <SelectItem value="carlos">Carlos Oliveira</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Data de Início</TableHead>
                <TableHead>Data de Término</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  id: "OS-2023-001",
                  description: "Manutenção Preventiva",
                  startDate: "10/03/2025",
                  endDate: "15/03/2025",
                  status: "Concluída",
                  responsible: "João Silva",
                },
                {
                  id: "OS-2023-002",
                  description: "Instalação de Equipamentos",
                  startDate: "20/03/2025",
                  endDate: "25/03/2025",
                  status: "Em andamento",
                  responsible: "Maria Santos",
                },
                {
                  id: "OS-2023-003",
                  description: "Vistoria Técnica",
                  startDate: "05/04/2025",
                  endDate: "05/04/2025",
                  status: "Aberta",
                  responsible: "Carlos Oliveira",
                },
                {
                  id: "OS-2023-004",
                  description: "Reparo de Emergência",
                  startDate: "01/04/2025",
                  endDate: "02/04/2025",
                  status: "Concluída",
                  responsible: "Ana Pereira",
                },
                {
                  id: "OS-2023-005",
                  description: "Treinamento Operacional",
                  startDate: "10/04/2025",
                  endDate: "12/04/2025",
                  status: "Aberta",
                  responsible: "Pedro Costa",
                },
              ].map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.description}</TableCell>
                  <TableCell>{order.startDate}</TableCell>
                  <TableCell>{order.endDate}</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        order.status === "Concluída"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Em andamento"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Aberta"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </div>
                  </TableCell>
                  <TableCell>{order.responsible}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Link href={`/ordens-servico/${order.id}`}>
                        <Button variant="outline" size="sm">
                          Detalhes
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

