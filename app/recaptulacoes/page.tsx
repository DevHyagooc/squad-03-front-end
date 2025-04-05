import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Plus, Search, Download } from "lucide-react"
import Link from "next/link"

export default function RecaptulacoesPage() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Recaptulações</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Recaptulação
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
              <Input placeholder="Pesquisar recaptulações..." />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="aprovada">Aprovada</SelectItem>
                <SelectItem value="rejeitada">Rejeitada</SelectItem>
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
                <TableHead>Data</TableHead>
                <TableHead>Motivo</TableHead>
                <TableHead>Contrato</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  id: "REC-001",
                  date: "15/03/2025",
                  reason: "Alteração de Escopo",
                  contract: "Contrato de Manutenção Predial",
                  status: "Aprovada",
                  responsible: "João Silva",
                },
                {
                  id: "REC-002",
                  date: "20/03/2025",
                  reason: "Ajuste de Cronograma",
                  contract: "Fornecimento de Equipamentos",
                  status: "Pendente",
                  responsible: "Maria Santos",
                },
                {
                  id: "REC-003",
                  date: "25/03/2025",
                  reason: "Revisão de Valores",
                  contract: "Serviços de Consultoria",
                  status: "Rejeitada",
                  responsible: "Carlos Oliveira",
                },
                {
                  id: "REC-004",
                  date: "01/04/2025",
                  reason: "Inclusão de Serviços",
                  contract: "Contrato de Prestação de Serviços",
                  status: "Aprovada",
                  responsible: "Ana Pereira",
                },
                {
                  id: "REC-005",
                  date: "05/04/2025",
                  reason: "Extensão de Prazo",
                  contract: "Contrato de Fornecimento",
                  status: "Pendente",
                  responsible: "Pedro Costa",
                },
              ].map((recap) => (
                <TableRow key={recap.id}>
                  <TableCell>{recap.id}</TableCell>
                  <TableCell>{recap.date}</TableCell>
                  <TableCell>{recap.reason}</TableCell>
                  <TableCell>{recap.contract}</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        recap.status === "Aprovada"
                          ? "bg-green-100 text-green-800"
                          : recap.status === "Pendente"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {recap.status}
                    </div>
                  </TableCell>
                  <TableCell>{recap.responsible}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Link href={`/recaptulacoes/${recap.id}`}>
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

