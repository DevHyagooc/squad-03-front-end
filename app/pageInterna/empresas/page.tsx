"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDays, FileText, Plus, Search, Download } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import FormEmpresa from "@/components/EmpresaForm"
import Link from "next/link"
import React, { useState } from 'react';

export default function EmpresasPage() {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

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
            <DialogTitle className="text-2xl">Cadastrar Nova Empresa</DialogTitle>
            <FormEmpresa closeForm={closeForm} />

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
    </div>
  );
}
