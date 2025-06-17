"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Info, Trash, Pencil, ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import FormColab from "@/components/ColaboradorForm"
import React, { useEffect, useState } from "react"
import { deleteColaborador, getColaboradorById, getColaboradorList, updateColaborador } from "@/services/colaboradores"
import Loading from "@/components/loading/index"
import InfoColab from "@/components/infoDialog/InfoColaborador"
import UpdateColab from "@/components/updateDialog/updateColaborador"
import { toast } from "sonner"

export interface Colaborador {
  idFuncionario: string
  nome: string
  cargo: string
  cpf: string
  telefone: string
  email: string
  dataNascimento: string
}

const ITEMS_PER_PAGE = 10

export default function ColaboradoresPage() {
  const [showForm, setShowForm] = useState(false)
  const [listColaboradores, setListColaboradores] = useState<Colaborador[]>([])
  const [loading, setLoading] = useState(false)
  const [colaborador, setColaborador] = useState<Colaborador | null>(null)
  const [colaboradorDetail, setColaboradorDetail] = useState<Colaborador | null>(null)
  const [loadingDetail, setLoadingDetail] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCargo, setSelectedCargo] = useState<string>("todos")

  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Estados separados para controle dos diálogos
  const [selectedColaborador, setSelectedColaborador] = useState<Colaborador | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)
  const [showUpdateDialog, setShowUpdateDialog] = useState<boolean>(false)
  const [showConfirmUpdateDialog, setShowConfirmUpdateDialog] = useState<boolean>(false)
  const [showInfoDialog, setShowInfoDialog] = useState<boolean>(false)

  const fetchListColaboradores = async () => {
    setLoading(true)
    try {
      const colaboradoresData = await getColaboradorList()
      setListColaboradores(colaboradoresData.reverse())
    } catch (error) {
      console.error("Erro ao buscar colaboradores:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleButtonClick = () => {
    setShowForm(true)
  }

  const handleUpdate = async (colaborador: Colaborador) => {
    try {
      await updateColaborador(colaborador.idFuncionario, colaborador)
      closeUpdateDialog()
      fetchListColaboradores()
    } catch (err) {
      console.error("Erro ao atualizar colaborador", err)
    }
  }

  const closeForm = async () => {
    setShowForm(false)
  }

  const submitForm = async () => {
    setShowForm(false)
    fetchListColaboradores()
  }

  const confirmDelete = (id: any) => {
    deleteColaborador(id)
    setShowDeleteDialog(false)
    fetchListColaboradores()
  }

  const confirmUpdate = (id: any, colaborador: any) => {
    updateColaborador(id, colaborador)
    setShowUpdateDialog(false)
    fetchListColaboradores()
  }

  useEffect(() => {
    fetchListColaboradores()
  }, [])

  // Filtrar colaboradores baseado na busca e filtros
  const filteredColaboradores = listColaboradores.filter((colaborador) => {
    const matchesSearch =
      colaborador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      colaborador.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `CL-${colaborador.idFuncionario}`.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCargo = selectedCargo === "todos" || colaborador.cargo === selectedCargo

    return matchesSearch && matchesCargo
  })

  // Calcular paginação
  useEffect(() => {
    const totalPagesCalculated = Math.ceil(filteredColaboradores.length / ITEMS_PER_PAGE)
    setTotalPages(totalPagesCalculated)
    if (currentPage > totalPagesCalculated && totalPagesCalculated > 0) {
      setCurrentPage(1)
    }
  }, [filteredColaboradores.length, currentPage])

  // Reset página quando filtros mudarem
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCargo])

  // Calcular colaboradores da página atual
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentColaboradores = filteredColaboradores.slice(startIndex, endIndex)

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

  const openInfoDialog = async (colab: Colaborador) => {
    setSelectedColaborador(colab)
    setLoadingDetail(true)
    setShowInfoDialog(true)

    try {
      const detalhe = await getColaboradorById(colab.idFuncionario)
      setColaboradorDetail(detalhe)
    } catch (err) {
      console.error("Erro ao buscar detalhes do colaborador:", err)
      toast.error("Não foi possível carregar detalhes do colaborador.")
      setShowInfoDialog(false)
    } finally {
      setLoadingDetail(false)
    }
  }

  const openDeleteDialog = (colaborador: Colaborador) => {
    setSelectedColaborador(colaborador)
    setShowDeleteDialog(true)
  }

  const openUpdateDialog = (colaborador: Colaborador) => {
    setSelectedColaborador(colaborador)
    setShowUpdateDialog(true)
  }

  const closeInfoDialog = () => {
    setShowInfoDialog(false)
    setSelectedColaborador(null)
  }

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false)
    setSelectedColaborador(null)
  }

  const closeUpdateDialog = () => {
    setShowUpdateDialog(false)
    setSelectedColaborador(null)
  }

  const closeConfirmUpdateDialog = () => {
    setShowConfirmUpdateDialog(false)
    setSelectedColaborador(null)
  }

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Colaboradores</h1>

        <Dialog open={showForm}>
          <DialogTrigger asChild>
            <Button id="btnNewColab" onClick={handleButtonClick}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Colaborador
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogTitle className="text-2xl">Cadastrar Novo Colaborador</DialogTitle>
            <FormColab closeForm={closeForm} onSubmit={submitForm} />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-none pt-1">
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar colaboradores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCargo} onValueChange={(value) => setSelectedCargo(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Cargo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="Desenvolvedor Back-end">Desenvolvedor Back-end</SelectItem>
                <SelectItem value="Desenvolvedor Front-end">Desenvolvedor Front-end</SelectItem>
                <SelectItem value="Desenvolvedor FullStack">Desenvolvedor FullStack</SelectItem>
                <SelectItem value="QA">QA</SelectItem>
                <SelectItem value="Product Owner">Product Owner</SelectItem>
              </SelectContent>
            </Select>
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
                  Mostrando {startIndex + 1} a {Math.min(endIndex, filteredColaboradores.length)} de{" "}
                  {filteredColaboradores.length} colaboradores
                  {searchTerm && ` (filtrado de ${listColaboradores.length} total)`}
                </div>
                <div className="text-sm text-muted-foreground">
                  Página {currentPage} de {totalPages}
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome do Colaborador</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentColaboradores.length > 0 ? (
                    currentColaboradores.map((colaborador) => (
                      <TableRow key={colaborador.idFuncionario}>
                        <TableCell>{`CL-${colaborador.idFuncionario}`}</TableCell>
                        <TableCell className="max-w-[150px] truncate">{colaborador.nome}</TableCell>
                        <TableCell>{colaborador.cargo}</TableCell>
                        <TableCell>{colaborador.telefone}</TableCell>
                        <TableCell>{colaborador.email}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              id="btnInfo"
                              variant="ghost"
                              size="icon"
                              onClick={() => openInfoDialog(colaborador)}
                            >
                              <Info className="h-4 w-4" />
                            </Button>
                            <Button
                              id="btnPencil"
                              variant="ghost"
                              size="icon"
                              onClick={() => openUpdateDialog(colaborador)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              id="btnTrash"
                              variant="ghost"
                              size="icon"
                              onClick={() => openDeleteDialog(colaborador)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        Nenhum colaborador encontrado
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

      {/* Dialog para exibir as informações do colaborador */}
      {showInfoDialog && (
        <Dialog open onOpenChange={closeInfoDialog}>
          <DialogContent>
            <DialogTitle className="text-2xl"></DialogTitle>

            {loadingDetail ? (
              <div className="flex justify-center py-8">
                <Loading />
              </div>
            ) : (
              colaboradorDetail && <InfoColab closeForm={closeInfoDialog} colaborador={colaboradorDetail} />
            )}
          </DialogContent>
        </Dialog>
      )}

      {/* Dialog para exibir as informações do colaborador */}
      {showUpdateDialog && selectedColaborador && (
        <Dialog open={showUpdateDialog} onOpenChange={() => closeUpdateDialog()}>
          <DialogContent>
            <DialogTitle className="text-2xl">Informações do Colaborador</DialogTitle>
            <InfoColab closeForm={closeInfoDialog} colaborador={selectedColaborador} />
          </DialogContent>
        </Dialog>
      )}

      {/* Dialog para exibir as informações do colaborador */}
      {showUpdateDialog && selectedColaborador && (
        <Dialog open={showUpdateDialog} onOpenChange={() => closeUpdateDialog()}>
          <DialogContent>
            <DialogTitle className="text-2xl"></DialogTitle>
            <UpdateColab closeForm={closeUpdateDialog} colaborador={selectedColaborador} onSave={handleUpdate} />
          </DialogContent>
        </Dialog>
      )}

      {/* Dialog para exibir a confirmação de exclusão do colaborador */}
      {showConfirmUpdateDialog && selectedColaborador && (
        <Dialog open={showConfirmUpdateDialog} onOpenChange={() => closeConfirmUpdateDialog()}>
          <DialogContent className="max-w-sm text-center">
            <DialogTitle className="text-2xl">Confirmar Alteração?</DialogTitle>
            <p>Você confirma a alteração dos dados do colaborador {selectedColaborador.nome}?</p>
            <div className="flex gap-4">
              <Button
                className="mr-2 ml-auto"
                variant="destructive"
                onClick={() => confirmUpdate(selectedColaborador.idFuncionario, selectedColaborador)}
              >
                Confirmar
              </Button>
              <Button className="mr-auto ml-2" variant="outline" onClick={closeConfirmUpdateDialog}>
                Cancelar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {showDeleteDialog && selectedColaborador && (
        <Dialog open={showDeleteDialog} onOpenChange={() => closeDeleteDialog()}>
          <DialogContent className="max-w-sm text-center">
            <DialogTitle className="text-2xl">Confirmar Exclusão?</DialogTitle>
            <p>Você confirma a exclusão do colaborador {selectedColaborador.nome}?</p>
            <div className="flex gap-4">
              <Button
                id="btnConfirmDelete"
                className="mr-2 ml-auto"
                variant="destructive"
                onClick={() => confirmDelete(selectedColaborador.idFuncionario)}
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
    </div>
  )
}
