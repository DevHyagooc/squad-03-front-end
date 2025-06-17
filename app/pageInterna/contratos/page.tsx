"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Inbox, ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Link from "next/link"
import React, { useEffect, useState } from "react"

import FormContrato from "@/components/ContratoForm"

import type { Empresa } from "../empresas/page"
import Loading from "@/components/loading"
import { getContratoListNaoArquivado } from "@/services/contrato"
import { formatDate2 } from "@/lib/formatData"
import type { Colaborador } from "../colaboradores/page"

interface Contrato {
  idContrato: number
  prazo: string
  valor: number
  statusContrato: StatusContrato
  criadoEm: string
  dataInicio: string
  dataFim: string
  empresa: Empresa
  responsavel: Colaborador
}

export type StatusContrato = "ATIVO" | "INATIVO" | "ENCERRADO" | "ARQUIVADO"

const ITEMS_PER_PAGE = 10

export default function ContratosPage() {
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [listContratos, setListContratos] = useState<Contrato[]>([])
  const [selectedContrato, setSelectedContrato] = useState<Contrato | null>(null)

  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Adicionar após os estados de paginação existentes
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [dateFilter, setDateFilter] = useState("todos")

  const handleButtonClick = () => {
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    fetchListContratos()
  }

  const fetchListContratos = async () => {
    setLoading(true)
    try {
      const data = await getContratoListNaoArquivado()
      setListContratos(data.reverse())

      // Calcular total de páginas
      const totalPagesCalculated = Math.ceil(data.length / ITEMS_PER_PAGE)
      setTotalPages(totalPagesCalculated)

      // Se a página atual for maior que o total de páginas, voltar para a primeira
      if (currentPage > totalPagesCalculated) {
        setCurrentPage(1)
      }
    } catch (err) {
      console.error("Erro ao buscar contratos", err)
    } finally {
      setLoading(false)
    }
  }

  // Filtrar contratos baseado na busca e filtros
  const filteredContratos = listContratos.filter((contrato) => {
    const matchesSearch =
      contrato.empresa.razaoSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `CT-${contrato.idContrato}`.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === "todos" || contrato.statusContrato.toLowerCase() === statusFilter.toLowerCase()

    // Filtro de data (implementação básica)
    let matchesDate = true
    if (dateFilter !== "todos") {
      const contratoDate = new Date(contrato.dataInicio)
      const now = new Date()

      switch (dateFilter) {
        case "ultimo-mes":
          const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
          matchesDate = contratoDate >= lastMonth
          break
        case "ultimos-3-meses":
          const last3Months = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate())
          matchesDate = contratoDate >= last3Months
          break
        case "ultimo-ano":
          const lastYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
          matchesDate = contratoDate >= lastYear
          break
      }
    }

    return matchesSearch && matchesStatus && matchesDate
  })

  // Recalcular paginação baseado nos contratos filtrados
  const totalPagesCalculated = Math.ceil(filteredContratos.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentContratos = filteredContratos.slice(startIndex, endIndex)

  useEffect(() => {
    fetchListContratos()
  }, [])

  // Atualizar o useEffect para resetar a página quando filtros mudarem
  useEffect(() => {
    setCurrentPage(1)
    setTotalPages(Math.ceil(filteredContratos.length / ITEMS_PER_PAGE))
  }, [searchTerm, statusFilter, dateFilter, filteredContratos.length])

  // Funções de navegação
  const goToFirstPage = () => setCurrentPage(1)
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const goToLastPage = () => setCurrentPage(totalPages)
  const goToPage = (page: number) => setCurrentPage(page)

  // Gerar números das páginas para exibição
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      // Se temos poucas páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Lógica para mostrar páginas com reticências
      if (currentPage <= 3) {
        // Início: 1, 2, 3, 4, 5, ..., last
        for (let i = 1; i <= 5; i++) {
          pages.push(i)
        }
        if (totalPages > 5) {
          pages.push("...")
          pages.push(totalPages)
        }
      } else if (currentPage >= totalPages - 2) {
        // Final: 1, ..., last-4, last-3, last-2, last-1, last
        pages.push(1)
        if (totalPages > 5) {
          pages.push("...")
        }
        for (let i = totalPages - 4; i <= totalPages; i++) {
          if (i > 1) pages.push(i)
        }
      } else {
        // Meio: 1, ..., current-1, current, current+1, ..., last
        pages.push(1)
        pages.push("...")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Contratos</h1>

        <Dialog open={showForm}>
          <DialogTrigger asChild>
            <Button onClick={handleButtonClick}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Contrato
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogTitle className="text-2xl">Novo Contrato</DialogTitle>
            <FormContrato closeForm={closeForm} />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-none pt-1">
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar contratos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="inativo">Inativo</SelectItem>
                <SelectItem value="encerrado">Encerrado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
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
            <div>
              <Link href={`/pageInterna/contratos/contratos-arquivados`}>
                <Button variant="outline">
                  <Inbox className="mr-2 h-4 w-4" />
                  Arquivados
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          {loading ? (
            <Loading />
          ) : (
            <>
              {/* Informações sobre a paginação */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-muted-foreground">
                  Mostrando {startIndex + 1} a {Math.min(endIndex, filteredContratos.length)} de{" "}
                  {filteredContratos.length} contratos
                  {searchTerm && ` (filtrado de ${listContratos.length} total)`}
                </div>
                <div className="text-sm text-muted-foreground">
                  Página {currentPage} de {totalPagesCalculated}
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Data de Início</TableHead>
                    <TableHead>Data de Término</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentContratos.length > 0 ? (
                    currentContratos.map((contrato) => (
                      <TableRow key={contrato.idContrato}>
                        <TableCell>CT-{contrato.idContrato}</TableCell>
                        <TableCell>{contrato.empresa.razaoSocial}</TableCell>
                        <TableCell>{formatDate2(contrato.dataInicio)}</TableCell>
                        <TableCell>{formatDate2(contrato.dataFim)}</TableCell>
                        <TableCell>
                          <div
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              contrato.statusContrato === "ATIVO"
                                ? "bg-green-100 text-green-800"
                                : contrato.statusContrato === "INATIVO"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : contrato.statusContrato === "ENCERRADO"
                                    ? "bg-slate-100 text-slate-800"
                                    : contrato.statusContrato === "ARQUIVADO"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-white-100 text-black-800"
                            }`}
                          >
                            {contrato.statusContrato}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Link href={`/pageInterna/contratos/${contrato.idContrato}`}>
                              <Button variant="outline" size="sm">
                                Gerenciar
                              </Button>
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        Nenhum contrato encontrado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              {/* Componente de Paginação */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={goToFirstPage} disabled={currentPage === 1}>
                      Primeira
                    </Button>
                    <Button variant="outline" size="sm" onClick={goToPreviousPage} disabled={currentPage === 1}>
                      <ChevronLeft className="h-4 w-4" />
                      Anterior
                    </Button>
                  </div>

                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, index) => (
                      <React.Fragment key={index}>
                        {page === "..." ? (
                          <span className="px-3 py-2 text-muted-foreground">...</span>
                        ) : (
                          <Button
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => goToPage(page as number)}
                            className="min-w-[40px]"
                          >
                            {page}
                          </Button>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={goToNextPage} disabled={currentPage === totalPages}>
                      Próxima
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={goToLastPage} disabled={currentPage === totalPages}>
                      Última
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
