import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Plus, Search, Download } from "lucide-react"
import Link from "next/link"

export default function ContratosPage() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Contratos</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Contrato
        </Button>
      </div>

      <Card className="border-none pt-1">
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Pesquisar contratos..." />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="em-analise">Em Análise</SelectItem>
                <SelectItem value="encerrado">Encerrado</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Data de Início" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="ultimo-mes">Último Mês</SelectItem>
                <SelectItem value="ultimos-3-meses">Últimos 3 Meses</SelectItem>
                <SelectItem value="ultimo-ano">Último Ano</SelectItem>
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
                <TableHead>Nome do Contrato</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Data de Início</TableHead>
                <TableHead>Data de Término</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  id: "CT-2023-001",
                  name: "Contrato de Manutenção Predial",
                  client: "Empresa ABC",
                  startDate: "01/01/2025",
                  endDate: "31/12/2025",
                  status: "Ativo",
                },
                {
                  id: "CT-2023-002",
                  name: "Fornecimento de Equipamentos",
                  client: "Empresa XYZ",
                  startDate: "15/02/2025",
                  endDate: "15/08/2025",
                  status: "Ativo",
                },
                {
                  id: "CT-2023-003",
                  name: "Serviços de Consultoria",
                  client: "Empresa 123",
                  startDate: "10/03/2025",
                  endDate: "10/06/2025",
                  status: "Em análise",
                },
                {
                  id: "CT-2023-004",
                  name: "Contrato de Prestação de Serviços",
                  client: "Empresa DEF",
                  startDate: "05/01/2025",
                  endDate: "05/01/2026",
                  status: "Ativo",
                },
                {
                  id: "CT-2023-005",
                  name: "Contrato de Fornecimento",
                  client: "Empresa GHI",
                  startDate: "20/12/2024",
                  endDate: "20/12/2025",
                  status: "Ativo",
                },
              ].map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell>{contract.id}</TableCell>
                  <TableCell>{contract.name}</TableCell>
                  <TableCell>{contract.client}</TableCell>
                  <TableCell>{contract.startDate}</TableCell>
                  <TableCell>{contract.endDate}</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${contract.status === "Ativo"
                        ? "bg-green-100 text-green-800"
                        : contract.status === "Em análise"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                        }`}
                    >
                      {contract.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Link href={`/pageInterna/contratos/${contract.id}`}>
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

