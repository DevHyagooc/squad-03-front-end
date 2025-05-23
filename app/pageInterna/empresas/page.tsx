"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDays, FileText, Plus, Search, Download, X, Info, Pencil, Trash } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import FormEmpresa from "@/components/EmpresaForm"
import React, { useState, useEffect } from 'react';
import { deleteOrgaoContratante, getOrgaoContratanteList, updateOrgaoContratante } from "@/services/org_contratante";
import Loading from "@/components/loading"
import InfoOrgContratante from "@/components/infoDialog/InfoOrgContratante"
import UpdateOrgContratante from "@/components/updateDialog/updateOrgContratante"

interface OrgContratante {
  idOrgao: number;
  nome: string;
  nomeFantasia: string;
  razaoSocial: string;
  cnpj: string;
  numeroEmpresa: string;
  estado: string;
  cidade: string;
}

export default function OragosContratantesPage() {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [showInfoDialog, setShowInfoDialog] = useState<boolean>(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState<boolean>(false);
  const [listOrgContratantes, setListOrgContratantes] = useState<OrgContratante[]>([]);
  const [selectedOrgContratante, setSelectedOrgContratante] = useState<OrgContratante | null>(null)

  const fetchListOrgContratante = async () => {
    setLoading(true);
    try {
      const data = await getOrgaoContratanteList();
      setListOrgContratantes(data);
    } catch (err) {
      console.error("Erro ao buscar órgaos contratantes", err)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchListOrgContratante();
  }, []);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleUpdate = async (org: OrgContratante) => {
    try {
      await updateOrgaoContratante(org.idOrgao, org);
      // fecha o dialog e refaz a lista
      closeUpdateDialog();
      fetchListOrgContratante();
    } catch (err) {
      console.error("Erro ao atualizar orgão", err);
    }
  };

  const closeForm = () => {
    setShowForm(false);
    console.log("Formulário fechado");
    fetchListOrgContratante();
  };

  const confirmDelete = (id: any) => {
    deleteOrgaoContratante(id)
    setShowDeleteDialog(false);
    fetchListOrgContratante();
    fetchListOrgContratante();
  };

  const openInfoDialog = (orgContratante: OrgContratante) => {
    setSelectedOrgContratante(orgContratante);
    setShowInfoDialog(true); // Abre o diálogo de informações
  };

  // Função para abrir o Dialog de exclusão
  const openDeleteDialog = (orgContratante: OrgContratante) => {
    setSelectedOrgContratante(orgContratante);
    setShowDeleteDialog(true); // Abre o diálogo de exclusão
  };

  const openUpdateDialog = (orgContratante: OrgContratante) => {
    setSelectedOrgContratante(orgContratante)
    setShowUpdateDialog(true);
  }

  const closeInfoDialog = () => {
    setShowInfoDialog(false); // Fecha o diálogo de informações
    setSelectedOrgContratante(null);
  };

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false); // Fecha o diálogo de exclusão
    setSelectedOrgContratante(null);
  };

  const closeUpdateDialog = () => {
    setShowUpdateDialog(false);
    setSelectedOrgContratante(null);
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
            <FormEmpresa closeForm={closeForm} />

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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nome da Empresa</TableHead>
                  <TableHead>Nome Fantasia</TableHead>
                  <TableHead>Razão Social</TableHead>
                  <TableHead>Numero da Empresa</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listOrgContratantes.map(org => (
                  <TableRow key={org.idOrgao}>
                    <TableCell>{org.idOrgao}</TableCell>
                    <TableCell>{org.nome}</TableCell>
                    <TableCell>{org.nomeFantasia}</TableCell>
                    <TableCell>{org.razaoSocial}</TableCell>
                    <TableCell>{org.numeroEmpresa}</TableCell>
                    <TableCell>{org.estado}</TableCell>
                    <TableCell>{org.cidade}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openInfoDialog(org)}>
                          <Info className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openUpdateDialog(org)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(org)}>
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

      {/* Dialog para exibir as informações do colaborador */}
      {showInfoDialog && selectedOrgContratante && (
        <Dialog open={showInfoDialog} onOpenChange={() => closeInfoDialog()}>
          <DialogContent>
            <DialogTitle className="text-2xl"></DialogTitle>
            <InfoOrgContratante closeForm={closeInfoDialog} orgContratante={selectedOrgContratante} />
          </DialogContent>
        </Dialog>
      )}

      {/* Dialog para exibir a confirmação de exclusão do colaborador */}
      {showDeleteDialog && selectedOrgContratante && (
        <Dialog open={showDeleteDialog} onOpenChange={() => closeDeleteDialog()}>
          <DialogContent className="max-w-sm text-center">
            <DialogTitle className="text-2xl">Confirmar Exclusão?</DialogTitle>
            <p>Você confirma a exclusão do orgão contratante {selectedOrgContratante.nome}?</p>
            <div className="flex gap-4">
              <Button className='mr-2 ml-auto' variant="destructive" onClick={() => confirmDelete(selectedOrgContratante.idOrgao)}>
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
      {showUpdateDialog && selectedOrgContratante && (
        <Dialog open={showUpdateDialog} onOpenChange={() => closeUpdateDialog()}>
          <DialogContent>
            <DialogTitle className="text-2xl"></DialogTitle>
            <UpdateOrgContratante closeForm={closeUpdateDialog} orgContratante={selectedOrgContratante} onSave={handleUpdate} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
