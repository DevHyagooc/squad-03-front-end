"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDays, FileText, Plus, Search, Download, Info, Trash, Pencil } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import FormColab from "@/components/ColaboradorForm"
import React, { useEffect, useState } from 'react';
import { getColaboradorId, getColaboradorList } from "@/services/colaboradores";
import Loading from "@/components/loading/index";
import InfoColab from "@/components/InfoColaborador"

interface Colaborador {
  idFuncionario: string;
  nome: string;
  cargo: string;
  telefone: string;
  email: string;
  nascimento: string;
}





export default function ColaboradoresPage() {
  const [showForm, setShowForm] = useState(false);
  const [listColaboradores, setListColaboradores] = useState<Colaborador[]>([]);
  const [loading, setLoading] = useState(false);
  const [colaborador, setColaborador] = useState<Colaborador | null>(null);

  const [selectedColaborador, setSelectedColaborador] = useState<Colaborador | null>(null);

  const fetchListColaboradores = async () => {
    setLoading(true);  // Ativa o loading
    try {
      const colaboradoresData = await getColaboradorList();
      setListColaboradores(colaboradoresData);
    } catch (error) {
      console.error("Erro ao buscar colaboradores:", error);
    } finally {
      setLoading(false);  // Desativa o loading
    }
  };

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const submitForm = () => {
    setShowForm(false);
    fetchListColaboradores();
    fetchListColaboradores();
  };

  // Lógica para buscar colaboradores
  useEffect(() => {
    fetchListColaboradores();
  }, []);

  // Função para abrir o Dialog de informações do colaborador
  const openInfoDialog = (colaborador: Colaborador) => {
    setSelectedColaborador(colaborador);
  };

  const closeInfoDialog = () => {
    setSelectedColaborador(null);
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
          {/* Mostra o loading enquanto os colaboradores estão sendo carregados */}
          {loading ? (
            <Loading />
          ) : (
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
                {listColaboradores.map((Colaborador) => (
                  <TableRow key={Colaborador.idFuncionario}>
                    <TableCell>{`CO-${Colaborador.idFuncionario}`}</TableCell>
                    <TableCell className="max-w-[150px] truncate">{Colaborador.nome}</TableCell>
                    <TableCell>{Colaborador.cargo}</TableCell>
                    <TableCell>{Colaborador.telefone}</TableCell>
                    <TableCell>{Colaborador.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {/* Agora o Dialog é aberto para um colaborador específico */}
                        <Button variant="ghost" size="icon" onClick={() => openInfoDialog(Colaborador)}>
                          <Info className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
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
      {selectedColaborador && (
        <Dialog open={Boolean(selectedColaborador)} onOpenChange={() => closeInfoDialog()}>
          <DialogContent>
            <DialogTitle className="text-2xl">Informações do Colaborador</DialogTitle>
            <InfoColab closeForm={closeInfoDialog} colaborador={selectedColaborador} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
