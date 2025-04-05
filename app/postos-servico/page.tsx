import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Users, Plus, Search, Download } from "lucide-react"
import Link from "next/link"

export default function PostosServicoPage() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Postos de Serviço</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Posto de Serviço
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
              <Input placeholder="Pesquisar postos..." />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de Serviço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="manutencao">Manutenção</SelectItem>
                <SelectItem value="atendimento">Atendimento</SelectItem>
                <SelectItem value="suporte">Suporte Técnico</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Localização" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="norte">Região Norte</SelectItem>
                <SelectItem value="sul">Região Sul</SelectItem>
                <SelectItem value="leste">Região Leste</SelectItem>
                <SelectItem value="oeste">Região Oeste</SelectItem>
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
                <TableHead>Nome</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Tipo de Serviço</TableHead>
                <TableHead>Horário de Funcionamento</TableHead>
                <TableHead>Funcionários</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  id: "PS-001",
                  name: "Posto Central",
                  location: "Av. Principal, 123",
                  type: "Manutenção",
                  hours: "08:00 - 18:00",
                  employees: 5,
                },
                {
                  id: "PS-002",
                  name: "Posto Norte",
                  location: "Rua Norte, 456",
                  type: "Atendimento",
                  hours: "24 horas",
                  employees: 8,
                },
                {
                  id: "PS-003",
                  name: "Posto Sul",
                  location: "Av. Sul, 789",
                  type: "Suporte Técnico",
                  hours: "08:00 - 20:00",
                  employees: 4,
                },
                {
                  id: "PS-004",
                  name: "Posto Leste",
                  location: "Rua Leste, 321",
                  type: "Manutenção",
                  hours: "07:00 - 17:00",
                  employees: 6,
                },
                {
                  id: "PS-005",
                  name: "Posto Oeste",
                  location: "Av. Oeste, 654",
                  type: "Atendimento",
                  hours: "08:00 - 18:00",
                  employees: 7,
                },
              ].map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.id}</TableCell>
                  <TableCell>{post.name}</TableCell>
                  <TableCell className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {post.location}
                  </TableCell>
                  <TableCell>{post.type}</TableCell>
                  <TableCell>{post.hours}</TableCell>
                  <TableCell className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {post.employees}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link href={`/postos-servico/${post.id}`}>
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

