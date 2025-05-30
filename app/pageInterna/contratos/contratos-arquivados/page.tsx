"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { CalendarIcon, FileText, Search, ArrowLeft, Filter, X } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { getContratoListArquivados, getContratoListByStatus, getContratoListNaoArquivado } from "@/services/contrato"
import { Skeleton } from "@/components/ui/skeleton"

interface Contrato {
  idContrato: number
  numeroContrato: string
  descricao: string
  dataInicio: string
  dataFim: string
  valorContrato: number
  statusContrato: string
  tipoContrato: string
  empresa: {
    nomeFantasia: string
  }
}

export default function ContratosArquivadosPage() {
  const [contratos, setContratos] = useState<Contrato[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [tipoFiltro, setTipoFiltro] = useState<string>("")
  const [dataInicio, setDataInicio] = useState<Date | undefined>(undefined)
  const [dataFim, setDataFim] = useState<Date | undefined>(undefined)
  const [filtrosAtivos, setFiltrosAtivos] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Carregar contratos arquivados
  useEffect(() => {
    const fetchContratos = async () => {
        setLoading(true);
        try {
          const data = await getContratoListArquivados();
          setContratos(data.reverse());
        } catch (err) {
          console.error("Erro ao buscar órgaos contratantes", err)
        } finally {
          setLoading(false);
        }
      }

    fetchContratos()
  }, [])

  // Aplicar filtros
  const filteredContratos = contratos.filter((contrato) => {
    // Filtro de busca
    const matchesSearch =
      contrato.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contrato.numeroContrato.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contrato.empresa.nomeFantasia.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtro de tipo
    const matchesTipo = tipoFiltro ? contrato.tipoContrato === tipoFiltro : true

    // Filtro de data de início
    const matchesDataInicio = dataInicio ? new Date(contrato.dataInicio) >= dataInicio : true

    // Filtro de data de fim
    const matchesDataFim = dataFim ? new Date(contrato.dataFim) <= dataFim : true

    return matchesSearch && matchesTipo && matchesDataInicio && matchesDataFim
  })

  // Paginação
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredContratos.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredContratos.length / itemsPerPage)

  // Limpar filtros
  const handleClearFilters = () => {
    setTipoFiltro("")
    setDataInicio(undefined)
    setDataFim(undefined)
    setFiltrosAtivos(false)
  }

  // Aplicar filtros
  const handleApplyFilters = () => {
    setFiltrosAtivos(!!tipoFiltro || !!dataInicio || !!dataFim)
  }

  // Formatar valor do contrato
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  // Formatar data
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy", { locale: ptBR })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Link href="/pageInterna/contratos">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Contratos Arquivados</h1>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar contratos..."
              className="pl-8 w-full md:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filtros</span>
                {filtrosAtivos && <Badge className="ml-1 bg-cyan-500 hover:bg-cyan-600">Ativos</Badge>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Filtrar Contratos</h4>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tipo de Contrato</label>
                  <Select value={tipoFiltro} onValueChange={setTipoFiltro}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TODOS">Todos</SelectItem>
                      <SelectItem value="SERVICO">Serviço</SelectItem>
                      <SelectItem value="PRODUTO">Produto</SelectItem>
                      <SelectItem value="MANUTENCAO">Manutenção</SelectItem>
                      <SelectItem value="CONSULTORIA">Consultoria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Data de Início</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dataInicio && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dataInicio ? format(dataInicio, "dd/MM/yyyy", { locale: ptBR }) : "Selecione uma data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={dataInicio} onSelect={setDataInicio} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Data de Término</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dataFim && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dataFim ? format(dataFim, "dd/MM/yyyy", { locale: ptBR }) : "Selecione uma data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={dataFim} onSelect={setDataFim} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <Button variant="outline" size="sm" onClick={handleClearFilters}>
                    <X className="mr-2 h-4 w-4" />
                    Limpar
                  </Button>
                  <Button size="sm" onClick={handleApplyFilters}>
                    Aplicar Filtros
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Card>
        <CardHeader className="px-6 py-4">
          <CardTitle>Lista de Contratos Arquivados</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredContratos.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-6">
              <FileText className="h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">Nenhum contrato arquivado encontrado.</p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Início</TableHead>
                    <TableHead>Término</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((contrato) => (
                    <TableRow key={contrato.idContrato}>
                      <TableCell className="font-medium">{contrato.numeroContrato}</TableCell>
                      <TableCell>{contrato.descricao}</TableCell>
                      <TableCell>{contrato.empresa.nomeFantasia}</TableCell>
                      <TableCell>{contrato.tipoContrato}</TableCell>
                      <TableCell>{formatDate(contrato.dataInicio)}</TableCell>
                      <TableCell>{formatDate(contrato.dataFim)}</TableCell>
                      <TableCell>{formatCurrency(contrato.valorContrato)}</TableCell>
                      <TableCell className="text-right">
                        <Link href={`/pageInterna/contratos/${contrato.idContrato}`}>
                          <Button variant="outline" size="sm">
                            Detalhes
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Paginação */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center py-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>

                      {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                        let pageNumber: number

                        // Lógica para mostrar as páginas corretas
                        if (totalPages <= 5) {
                          pageNumber = i + 1
                        } else if (currentPage <= 3) {
                          pageNumber = i + 1
                          if (i === 4)
                            return (
                              <PaginationItem key={i}>
                                <PaginationEllipsis />
                              </PaginationItem>
                            )
                        } else if (currentPage >= totalPages - 2) {
                          pageNumber = totalPages - 4 + i
                          if (i === 0)
                            return (
                              <PaginationItem key={i}>
                                <PaginationEllipsis />
                              </PaginationItem>
                            )
                        } else {
                          if (i === 0)
                            return (
                              <PaginationItem key={i}>
                                <PaginationLink
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    setCurrentPage(1)
                                  }}
                                >
                                  1
                                </PaginationLink>
                              </PaginationItem>
                            )
                          if (i === 1)
                            return (
                              <PaginationItem key={i}>
                                <PaginationEllipsis />
                              </PaginationItem>
                            )
                          if (i === 3)
                            return (
                              <PaginationItem key={i}>
                                <PaginationEllipsis />
                              </PaginationItem>
                            )
                          if (i === 4)
                            return (
                              <PaginationItem key={i}>
                                <PaginationLink
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    setCurrentPage(totalPages)
                                  }}
                                >
                                  {totalPages}
                                </PaginationLink>
                              </PaginationItem>
                            )
                          pageNumber = currentPage + i - 2
                        }

                        return (
                          <PaginationItem key={i}>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault()
                                setCurrentPage(pageNumber)
                              }}
                              isActive={currentPage === pageNumber}
                            >
                              {pageNumber}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      })}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                          }}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
