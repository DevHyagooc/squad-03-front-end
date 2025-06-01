"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDays, FileText, Plus, Search, Download, Inbox } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link"
import React, { useEffect, useState } from 'react';
import FormContrato from "../../../components/contratoForm"
import { Empresa } from "../empresas/page"
import { Colaborador } from "@/components/updateDialog/updateColaborador"
import Loading from "@/components/loading"
import { getContratoList, getContratoListArquivados, getContratoListNaoArquivado } from "@/services/contrato"
import { formatDate2 } from "@/lib/formatData"

interface Contrato {
  idContrato: number;
  prazo: string;
  valor: number;
  statusContrato: StatusContrato;
  criadoEm: string;
  dataInicio: string;
  dataFim: string;
  empresa: Empresa;
  responsavel: Colaborador;
}

export type StatusContrato = "ATIVO" | "INATIVO" | "ENCERRADO" | "ARQUIVADO";

export default function ContratosPage() {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false); // Estado para controlar a exibição do FormFunc
  const [listContratos, setListContratos] = useState<Contrato[]>([]);
  const [selectedContrato, setSelectedContrato] = useState<Contrato | null>(null)

  const handleButtonClick = () => {
    setShowForm(true); // Exibe o formulário quando o botão for clicado
  };

  const closeForm = () => {
    setShowForm(false); // Fecha o formulário quando o botão de "Cancelar" for clicado
  };

  const fetchListContratos = async () => {
    setLoading(true);
    try {
      const data = await getContratoListNaoArquivado();
      setListContratos(data.reverse());
    } catch (err) {
      console.error("Erro ao buscar órgaos contratantes", err)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchListContratos();
  }, []);

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Contratos</h1>


        {/* Aqui o DialogTrigger deve estar dentro do Dialog */}
        <Dialog open={showForm}>
          <DialogTrigger asChild>
            <Button onClick={handleButtonClick}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Contrato
            </Button>
          </DialogTrigger>

          {/* DialogContent que contém o conteúdo do modal */}
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
              <Input placeholder="Pesquisar contratos..." />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="em-analise">Em Análise</SelectItem>
                <SelectItem value="encerrado">Encerrado</SelectItem>
              </SelectContent>
            </Select>
            <Select>
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
                {listContratos.map((contrato) => (
                  <TableRow key={contrato.idContrato}>
                    <TableCell>CT-{contrato.idContrato}</TableCell>
                    <TableCell>{contrato.empresa.razaoSocial}</TableCell>
                    <TableCell>{formatDate2(contrato.dataInicio)}</TableCell>
                    <TableCell>{formatDate2(contrato.dataFim)}</TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${contrato.statusContrato === "ATIVO"
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
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}