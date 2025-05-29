"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Download, X, Info, Pencil, Trash } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import FormEmpresa from "@/components/EmpresaForm"
import React, { useState, useEffect } from 'react';
import { deleteEmpresa, getEmpresaId, getEmpresaList, postEmpresa, updateEmpresa } from "@/services/empresas";
import Loading from "@/components/loading"
import UpdateEmpresa from "@/components/updateDialog/updateEmpresa"
import InfoEmpresa from "@/components/infoDialog/infoEmpresa"

export interface Empresa {
  idOrgao: number;
  nomeFantasia: string;
  razaoSocial: string;
  cnpj: string;
  numeroEmpresa: string;
  estado: string;
  cidade: string;
  inscricaoMunicipal: string;
  tipoEmpresa: string;
  cep: string;
  bairro: string;
  logradouro: string;
  numero: string;
  complemento: string;
  email: string;
  telefone: string;
  representante: Representante;
}

export interface Representante {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
}

export default function EmpresasPage() {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [showInfoDialog, setShowInfoDialog] = useState<boolean>(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState<boolean>(false);
  const [listEmpresas, setListEmpresas] = useState<Empresa[]>([]);
  const [selectedEmpresas, setSelectedEmpresas] = useState<Empresa | null>(null)
  const [empresaDetail, setEmpresaDetail] = useState<Empresa | null>(null);
  const [loadingDetailEmpresa, setLoadingDetailEmpresa] = useState(false);

  const fetchListEmpresas = async () => {
    setLoading(true);
    try {
      const data = await getEmpresaList();
      setListEmpresas(data);
    } catch (err) {
      console.error("Erro ao buscar empresas", err)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchListEmpresas();
  }, []);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleCreateEmpresa = async (empresa: any) => {
    try {
      await postEmpresa(empresa);       // chama a API de criação
      await fetchListEmpresas();       // recarrega a lista
    } catch (err) {
      console.error("Erro ao criar empresa", err);
    }
  };

  const handleUpdate = async (emp: Empresa) => {
    try {
      await updateEmpresa(emp.idOrgao, emp);
      // fecha o dialog e refaz a lista
      closeUpdateDialog();
      fetchListEmpresas();
    } catch (err) {
      console.error("Erro ao atualizar empresa", err);
    }
  };

  const closeForm = () => {
    setShowForm(false);
    console.log("Formulário fechado");
    fetchListEmpresas();
  };

  const confirmDelete = (id: any) => {
    deleteEmpresa(id)
    setShowDeleteDialog(false);
    fetchListEmpresas();
    fetchListEmpresas();
  };

  const openInfoDialog = async (emp: Empresa) => {
    setLoadingDetailEmpresa(true);
    setShowInfoDialog(true);
    try {
      // supondo que você tenha um serviço getEmpresaById
      const data = await getEmpresaId(emp.idOrgao);
      setEmpresaDetail(data);
    } catch (err) {
      console.error("Erro ao buscar detalhes da empresa:", err);
    } finally {
      setLoadingDetailEmpresa(false);
    }
  };

  // Função para abrir o Dialog de exclusão
  const openDeleteDialog = (empresa: Empresa) => {
    setSelectedEmpresas(empresa);
    setShowDeleteDialog(true); // Abre o diálogo de exclusão
  };

  const openUpdateDialog = (empresa: Empresa) => {
    setSelectedEmpresas(empresa)
    setShowUpdateDialog(true);
  }

  const closeInfoDialog = () => {
    setShowInfoDialog(false); // Fecha o diálogo de informações
    setSelectedEmpresas(null);
  };

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false); // Fecha o diálogo de exclusão
    setSelectedEmpresas(null);
  };

  const closeUpdateDialog = () => {
    setShowUpdateDialog(false);
    setSelectedEmpresas(null);
  }

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Empresas</h1>

        {/* Aqui o DialogTrigger deve estar dentro do Dialog */}
        <Dialog open={showForm}>
          <DialogTrigger asChild>
            <Button onClick={handleButtonClick}>
              <Plus className="mr-2 h-4 w-4" />
              Nova Empresa
            </Button>
          </DialogTrigger>

          {/* DialogContent que contém o conteúdo do modal */}
          <DialogContent>
            <div className="flex justify-between items-center mb-4">
              <DialogTitle className="text-2xl">Cadastrar Nova Empresa</DialogTitle>
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowForm(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>

            {/* Seu formulário */}
            <FormEmpresa
              closeForm={() => setShowForm(false)}
              onSubmit={handleCreateEmpresa}
            />

          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-none pt-1">
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Pesquisar empresas..." />
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nome da Empresa</TableHead>
                  <TableHead>Nome Fantasia</TableHead>
                  {/* <TableHead>Razão Social</TableHead> */}
                  {/* <TableHead>Numero da Empresa</TableHead> */}
                  <TableHead>Estado</TableHead>
                  {/* <TableHead>Cidade</TableHead> */}
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listEmpresas.map(emp => (
                  <TableRow key={emp.idOrgao}>
                    <TableCell>EMP-{emp.idOrgao}</TableCell>
                    <TableCell>{emp.razaoSocial}</TableCell>
                    <TableCell>{emp.nomeFantasia}</TableCell>
                    {/* <TableCell>{emp.razaoSocial}</TableCell> */}
                    {/* <TableCell>{emp.numeroEmpresa}</TableCell> */}
                    <TableCell>{emp.estado}</TableCell>
                    {/* <TableCell>{emp.cidade}</TableCell> */}
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
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Dialog para exibir as informações da empresa */}
      {showInfoDialog && (
        <Dialog open onOpenChange={closeInfoDialog}>
          <DialogContent>
            <DialogTitle className="text-2xl">Informações da Empresa</DialogTitle>

            {loadingDetailEmpresa ? (
              <div className="flex justify-center py-8">
                <Loading />
              </div>
            ) : (
              empresaDetail && (
                <InfoEmpresa
                  closeForm={closeInfoDialog}
                  empresa={empresaDetail}
                />
              )
            )}

          </DialogContent>
        </Dialog>
      )}

      {/* Dialog para exibir a confirmação de exclusão da empresa */}
      {showDeleteDialog && selectedEmpresas && (
        <Dialog open={showDeleteDialog} onOpenChange={() => closeDeleteDialog()}>
          <DialogContent className="max-w-sm text-center">
            <DialogTitle className="text-2xl">Confirmar Exclusão?</DialogTitle>
            <p>Você confirma a exclusão do orgão contratante {selectedEmpresas.razaoSocial}?</p>
            <div className="flex gap-4">
              <Button className='mr-2 ml-auto' variant="destructive" onClick={() => confirmDelete(selectedEmpresas.idOrgao)}>
                Confirmar
              </Button>
              <Button className='mr-auto ml-2' variant="outline" onClick={closeDeleteDialog}>
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
            <UpdateEmpresa closeForm={closeUpdateDialog} empresa={selectedEmpresas} onSave={handleUpdate} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
