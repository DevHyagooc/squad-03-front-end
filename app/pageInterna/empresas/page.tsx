"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Download, X, Info, Pencil, Trash, ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import FormEmpresa from "@/components/EmpresaForm"
import React, { useState, useEffect } from "react"
import { deleteEmpresa, getEmpresaById, getEmpresaList, postEmpresa, updateEmpresa } from "@/services/empresas"
import Loading from "@/components/loading"
import UpdateEmpresa from "@/components/updateDialog/updateEmpresa"
import InfoEmpresa from "@/components/infoDialog/infoEmpresa"

export interface Empresa {
  idOrgao: number
  nomeFantasia: string
  razaoSocial: string
  cnpj: string
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
  id: number
  nome: string
  cpf: string
  email: string
  telefone: string
  idOrgao: number
}

const ITEMS_PER_PAGE = 10

export default function EmpresasPage() {
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)
  const [showInfoDialog, setShowInfoDialog] = useState<boolean>(false)
  const [showUpdateDialog, setShowUpdateDialog] = useState<boolean>(false)
  const [listEmpresas, setListEmpresas] = useState<Empresa[]>([])
  const [selectedEmpresas, setSelectedEmpresas] = useState<Empresa | null>(null)
  const [empresaDetail, setEmpresaDetail] = useState<Empresa | null>(null)
  const [loadingDetailEmpresa, setLoadingDetailEmpresa] = useState(false)

  // Estados para busca e filtros
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [tipoEmpresaFilter, setTipoEmpresaFilter] = useState("todos")

  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchListEmpresas = async () => {
    setLoading(true)
    try {
      const data = await getEmpresaList()
      setListEmpresas(data)
    } catch (err) {
      console.error("Erro ao buscar empresas", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchListEmpresas()
  }, [])

  // Filtrar empresas baseado na busca e filtros
  const filteredEmpresas = listEmpresas.filter((empresa) => {
    const matchesSearch =
      empresa.razaoSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empresa.nomeFantasia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empresa.cnpj.includes(searchTerm) ||
      `EMP-${empresa.idOrgao}`.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTipo = tipoEmpresaFilter === "todos" || empresa.tipoEmpresa === tipoEmpresaFilter

    return matchesSearch && matchesTipo
  })

  // Calcular paginação
  useEffect(() => {
    const totalPagesCalculated = Math.ceil(filteredEmpresas.length / ITEMS_PER_PAGE)
    setTotalPages(totalPagesCalculated)
    if (currentPage > totalPagesCalculated && totalPagesCalculated > 0) {
      setCurrentPage(1)
    }
  }, [filteredEmpresas.length, currentPage])

  // Reset página quando filtros mudarem
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, tipoEmpresaFilter])

  // Calcular empresas da página atual
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentEmpresas = filteredEmpresas.slice(startIndex, endIndex)

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
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i)
        }
        if (totalPages > 5) {
          pages.push("...")
          pages.push(totalPages)
        }
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        if (totalPages > 5) {
          pages.push("...")
        }
        for (let i = totalPages - 4; i <= totalPages; i++) {
          if (i > 1) pages.push(i)
        }
      } else {
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

  const handleButtonClick = () => {
    setShowForm(true)
  }

  const handleCreateEmpresa = async (empresa: any) => {
    try {
      await postEmpresa(empresa)
      await fetchListEmpresas()
    } catch (err) {
      console.error("Erro ao criar empresa", err)
    }
  }

  const handleUpdate = async (emp: Empresa) => {
    try {
      await updateEmpresa(emp.idOrgao, emp)
      closeUpdateDialog()
      fetchListEmpresas()
    } catch (err) {
      console.error("Erro ao atualizar empresa", err)
    }
  }

  const closeForm = () => {
    setShowForm(false)
    console.log("Formulário fechado")
    fetchListEmpresas()
  }

  const confirmDelete = (id: any) => {
    deleteEmpresa(id)
    setShowDeleteDialog(false)
    fetchListEmpresas()
  }

  const openInfoDialog = async (emp: Empresa) => {
    setLoadingDetailEmpresa(true)
    setShowInfoDialog(true)
    try {
      const data = await getEmpresaById(emp.idOrgao)
      setEmpresaDetail(data)
    } catch (err) {
      console.error("Erro ao buscar detalhes da empresa:", err)
    } finally {
      setLoadingDetailEmpresa(false)
    }
  }

  const openDeleteDialog = (empresa: Empresa) => {
    setSelectedEmpresas(empresa)
    setShowDeleteDialog(true)
  }

  const openUpdateDialog = (empresa: Empresa) => {
    setSelectedEmpresas(empresa)
    setShowUpdateDialog(true)
  }

  const closeInfoDialog = () => {
    setShowInfoDialog(false)
    setSelectedEmpresas(null)
  }

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false)
    setSelectedEmpresas(null)
  }

  const closeUpdateDialog = () => {
    setShowUpdateDialog(false)
    setSelectedEmpresas(null)
  }

  // Obter tipos únicos de empresa para o filtro
  const tiposEmpresa = Array.from(new Set(listEmpresas.map((emp) => emp.tipoEmpresa))).filter(Boolean)

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Empresas</h1>

        <Dialog open={showForm}>
          <DialogTrigger asChild>
            <Button onClick={handleButtonClick}>
              <Plus className="mr-2 h-4 w-4" />
              Nova Empresa
            </Button>
          </DialogTrigger>

          <DialogContent>
            <div className="flex justify-between items-center mb-4">
              <DialogTitle className="text-2xl">Cadastrar Nova Empresa</DialogTitle>
              <DialogClose asChild>
                <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>

            <FormEmpresa closeForm={() => setShowForm(false)} onSubmit={handleCreateEmpresa} />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-none pt-1">
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar empresas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={tipoEmpresaFilter} onValueChange={setTipoEmpresaFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de Empresa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Tipos</SelectItem>
                {tiposEmpresa.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>
                    {tipo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Estados</SelectItem>
                {Array.from(new Set(listEmpresas.map((emp) => emp.estado)))
                  .filter(Boolean)
                  .map((estado) => (
                    <SelectItem key={estado} value={estado}>
                      {estado}
                    </SelectItem>
                  ))}
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
          {loading ? (
            <Loading />
          ) : (
            <>
              {/* Informações sobre a paginação */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-muted-foreground">
                  Mostrando {startIndex + 1} a {Math.min(endIndex, filteredEmpresas.length)} de{" "}
                  {filteredEmpresas.length} empresas
                  {searchTerm && ` (filtrado de ${listEmpresas.length} total)`}
                </div>
                <div className="text-sm text-muted-foreground">
                  Página {currentPage} de {totalPages}
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome da Empresa</TableHead>
                    <TableHead>Nome Fantasia</TableHead>
                    <TableHead>CNPJ</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentEmpresas.length > 0 ? (
                    currentEmpresas.map((emp) => (
                      <TableRow key={emp.idOrgao}>
                        <TableCell>EMP-{emp.idOrgao}</TableCell>
                        <TableCell>{emp.razaoSocial}</TableCell>
                        <TableCell>{emp.nomeFantasia}</TableCell>
                        <TableCell>{emp.cnpj}</TableCell>
                        <TableCell>{emp.estado}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" onClick={() => openInfoDialog(emp)}>
                              <Info className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => openUpdateDialog(emp)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(emp)}>
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        Nenhuma empresa encontrada
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

      {/* Dialog para exibir as informações da empresa */}
      {showInfoDialog && (
        <Dialog open onOpenChange={closeInfoDialog}>
          <DialogContent>
            <DialogTitle className="text-2xl"></DialogTitle>

            {loadingDetailEmpresa ? (
              <div className="flex justify-center py-8">
                <Loading />
              </div>
            ) : (
              empresaDetail && <InfoEmpresa closeForm={closeInfoDialog} empresa={empresaDetail} />
            )}
          </DialogContent>
        </Dialog>
      )}

      {/* Dialog para exibir a confirmação de exclusão da empresa */}
      {showDeleteDialog && selectedEmpresas && (
        <Dialog open={showDeleteDialog} onOpenChange={() => closeDeleteDialog()}>
          <DialogContent className="max-w-sm text-center">
            <DialogTitle className="text-2xl">Confirmar Exclusão?</DialogTitle>
            <p>Você confirma a exclusão da empresa {selectedEmpresas.razaoSocial}?</p>
            <div className="flex gap-4">
              <Button
                className="mr-2 ml-auto"
                variant="destructive"
                onClick={() => confirmDelete(selectedEmpresas.idOrgao)}
              >
                Confirmar
              </Button>
              <Button className="mr-auto ml-2" variant="outline" onClick={closeDeleteDialog}>
                Cancelar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Dialog para exibir o formulário para edição das informações */}
      {showUpdateDialog && selectedEmpresas && (
        <Dialog open={showUpdateDialog} onOpenChange={() => closeUpdateDialog()}>
          <DialogContent>
            <DialogTitle className="text-2xl"></DialogTitle>
            <UpdateEmpresa empresa={selectedEmpresas} onSave={handleUpdate} onCancel={closeUpdateDialog} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
