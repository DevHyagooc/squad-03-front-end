"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
import { CalendarDays, FileText, Plus, Search, Download, Info, Trash, Pencil, Key } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import FormColab from "@/components/ColaboradorForm"
import React, { useEffect, useState } from 'react';
import { deleteColaborador, getColaboradorId, getColaboradorList, putColaborador } from "@/services/colaboradores";
import Loading from "@/components/loading/index";
import InfoColab from "@/components/infoDialog/InfoColaborador"
import UpdateColab from "@/components/updateDialog/updateColaborador"

export interface Colaborador {
  idFuncionario: string;
  nome: string;
  cargo: string;
  telefone: string;
  email: string;
  dataNascimento: string;
}

export default function ColaboradoresPage() {
  const [showForm, setShowForm] = useState(false);
  const [listColaboradores, setListColaboradores] = useState<Colaborador[]>([]);
  const [loading, setLoading] = useState(false);
  const [colaborador, setColaborador] = useState<Colaborador | null>(null);
  const [colaboradorDetail, setColaboradorDetail] = useState<Colaborador | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  // Estados separados para controle dos diálogos
  const [selectedColaborador, setSelectedColaborador] = useState<Colaborador | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false); // Controle do diálogo de exclusão
  const [showUpdateDialog, setShowUpdateDialog] = useState<boolean>(false); // Controle do diálogo de exclusão
  const [showConfirmUpdateDialog, setShowConfirmUpdateDialog] = useState<boolean>(false); // Controle do diálogo de exclusão
  const [showInfoDialog, setShowInfoDialog] = useState<boolean>(false); // Controle do diálogo de informações
  
  

  const fetchListColaboradores = async () => {
    setLoading(true);  // Ativa o loading
    try {
      const colaboradoresData = await getColaboradorList();
      setListColaboradores(colaboradoresData.reverse());
    } catch (error) {
      console.error("Erro ao buscar colaboradores:", error);
    } finally {
      setLoading(false);  // Desativa o loading
    }
  };

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleUpdate = async (colaborador: Colaborador) => {
    try {
      await putColaborador(colaborador.idFuncionario, colaborador);
      // fecha o dialog e refaz a lista
      closeUpdateDialog();
      fetchListColaboradores();
      fetchListColaboradores();
    } catch (err) {
      console.error("Erro ao atualizar orgão", err);
    }
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const submitForm = () => {
    setShowForm(false);
    fetchListColaboradores();
    
  };

  const confirmDelete = (id: any) => {
    deleteColaborador(id)
    setShowDeleteDialog(false);
    fetchListColaboradores();
    fetchListColaboradores();
  };

  const confirmUpdate = (id: any, colaborador: any) => {
    putColaborador(id, colaborador)
    setShowUpdateDialog(false);
    fetchListColaboradores();
    fetchListColaboradores();
  };

  // Lógica para buscar colaboradores
  useEffect(() => {
    fetchListColaboradores();
  }, []);

  // Função para abrir o Dialog de informações do colaborador
  const openInfoDialog = async (colab: Colaborador) => {
    setLoadingDetail(true);
    setShowInfoDialog(true);
    try {
      const data = await getColaboradorId(colab.idFuncionario);
      setColaboradorDetail(data);
    } catch (error) {
      console.error("Erro ao buscar detalhes:", error);
    } finally {
      setLoadingDetail(false);  // Desativa o loading
    }
  };

  // Função para abrir o Dialog de exclusão
  const openDeleteDialog = (colaborador: Colaborador) => {
    setSelectedColaborador(colaborador);
    setShowDeleteDialog(true); // Abre o diálogo de exclusão
  };

  const openUpdateDialog = (colaborador: Colaborador) => {
    setSelectedColaborador(colaborador);
    setShowUpdateDialog(true); // Abre o diálogo de exclusão
  };

  const closeInfoDialog = () => {
    setShowInfoDialog(false); // Fecha o diálogo de informações
    setSelectedColaborador(null);
  };

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false); // Fecha o diálogo de exclusão
    setSelectedColaborador(null);
  };

  const closeUpdateDialog = () => {
    setShowUpdateDialog(false); // Fecha o diálogo de exclusão
    setSelectedColaborador(null);
  };

  const closeConfirmUpdateDialog = () => {
    setShowConfirmUpdateDialog(false); // Fecha o diálogo de exclusão
    setSelectedColaborador(null);
  };
  //Paginação
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
   const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = listColaboradores.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(listColaboradores.length / itemsPerPage)
  return (
    
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Colaboradores</h1>

        <Dialog open={showForm}>
          <DialogTrigger asChild>
            <Button onClick={handleButtonClick}>
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
          {loading ? (
            <Loading />
          ) : (
            <>
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
                {currentItems.map((colaborador) => (
                  <TableRow key={colaborador.idFuncionario}>
                    <TableCell>{`CL-${colaborador.idFuncionario}`}</TableCell>
                    <TableCell className="max-w-[150px] truncate">{colaborador.nome}</TableCell>
                    <TableCell>{colaborador.cargo}</TableCell>
                    <TableCell>{colaborador.telefone}</TableCell>
                    <TableCell>{colaborador.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openInfoDialog(colaborador)}>
                          <Info className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openUpdateDialog(colaborador)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(colaborador)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
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
              colaboradorDetail && (
                < InfoColab
                  closeForm={closeInfoDialog}
                  colaborador={colaboradorDetail}      // só exibição
                />
              )
            )}
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
              <Button className='mr-2 ml-auto' variant="destructive" onClick={() => confirmUpdate(selectedColaborador.idFuncionario, selectedColaborador)}>
                Confirmar
              </Button>
              <Button className='mr-auto ml-2' variant="outline" onClick={closeConfirmUpdateDialog}>
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
              <Button className='mr-2 ml-auto' variant="destructive" onClick={() => confirmDelete(selectedColaborador.idFuncionario)}>
                Confirmar
              </Button>
              <Button className='mr-auto ml-2' variant="outline" onClick={closeDeleteDialog}>
                Cancelar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

    </div>
  );
}
