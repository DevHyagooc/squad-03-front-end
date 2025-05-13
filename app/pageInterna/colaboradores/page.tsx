"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDays, FileText, Plus, Search, Download } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import FormColab from "@/components/ColaboradorForm"
import Link from "next/link"
import React, { useState } from 'react';

export default function ColaboradoresPage() {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);  // Altere isso para setShowForm para fechar o formulário
    console.log("Formulário fechado");
  };

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Colaboradores</h1>

        {/* Aqui o DialogTrigger deve estar dentro do Dialog */}
        <Dialog open={showForm}>
          <DialogTrigger asChild>
            <Button onClick={handleButtonClick}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Colaborador
            </Button>
          </DialogTrigger>

          {/* DialogContent que contém o conteúdo do modal */}
          <DialogContent>
            <DialogTitle className="text-2xl">Cadastrar Novo Colaborador</DialogTitle>
            <FormColab closeForm={closeForm} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Pesquisar entregáveis..." />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="planejado">Planejado</SelectItem>
                <SelectItem value="em-andamento">Em Andamento</SelectItem>
                <SelectItem value="concluido">Concluído</SelectItem>
                <SelectItem value="atrasado">Atrasado</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Contrato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="ct-2023-001">Contrato de Manutenção Predial</SelectItem>
                <SelectItem value="ct-2023-002">Fornecimento de Equipamentos</SelectItem>
                <SelectItem value="ct-2023-003">Serviços de Consultoria</SelectItem>
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
                <TableHead>Nome do Entregável</TableHead>
                <TableHead>Contrato</TableHead>
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
                  contract: "Contrato de Manutenção Predial",
                  date: "15/04/2025",
                  status: "Em andamento",
                  responsible: "João Silva",
                },
                {
                  id: "ENT-002",
                  name: "Instalação de Equipamentos",
                  contract: "Fornecimento de Equipamentos",
                  date: "20/04/2025",
                  status: "Planejado",
                  responsible: "Maria Santos",
                },
                {
                  id: "ENT-003",
                  name: "Treinamento da Equipe",
                  contract: "Serviços de Consultoria",
                  date: "25/04/2025",
                  status: "Planejado",
                  responsible: "Carlos Oliveira",
                },
                {
                  id: "ENT-004",
                  name: "Documentação Técnica",
                  contract: "Contrato de Prestação de Serviços",
                  date: "10/04/2025",
                  status: "Concluído",
                  responsible: "Ana Pereira",
                },
                {
                  id: "ENT-005",
                  name: "Relatório de Qualidade",
                  contract: "Contrato de Fornecimento",
                  date: "05/04/2025",
                  status: "Atrasado",
                  responsible: "Pedro Costa",
                },
              ].map((deliverable) => (
                <TableRow key={deliverable.id}>
                  <TableCell>{deliverable.id}</TableCell>
                  <TableCell>{deliverable.name}</TableCell>
                  <TableCell>{deliverable.contract}</TableCell>
                  <TableCell className="flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" />
                    {deliverable.date}
                  </TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${deliverable.status === "Concluído"
                        ? "bg-green-100 text-green-800"
                        : deliverable.status === "Em andamento"
                          ? "bg-blue-100 text-blue-800"
                          : deliverable.status === "Planejado"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-red-100 text-red-800"
                        }`}
                    >
                      {deliverable.status}
                    </div>
                  </TableCell>
                  <TableCell>{deliverable.responsible}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Link href={`/entregaveis/${deliverable.id}`}>
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

