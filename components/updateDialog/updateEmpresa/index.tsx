"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { formatCNPJ, formatCEP } from "@/lib/formatData";
import { getLocal } from "@/services/cep";
import { Empresa, Representante } from "@/app/pageInterna/empresas/page";

interface UpdateEmpresaProps {
  empresa: Empresa;
  onSave: (empresa: Empresa) => Promise<void>;
  onCancel: () => void;
  onEmpresaUpdated?: () => void;
}

const UpdateEmpresa: React.FC<UpdateEmpresaProps> = ({
  empresa: initialData,
  onSave,
  onCancel,
  onEmpresaUpdated,
}) => {
  // Estado do formulário
  const [formData, setFormData] = useState<Empresa>({ ...initialData });
  const [activeTab, setActiveTab] = useState<"gerais" | "endereco" | "contato">("gerais");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sempre que a empresa inicial mudar, recarrega os dados
  useEffect(() => {
    setFormData({ ...initialData });
    setActiveTab("gerais");
  }, [initialData]);

  // Verifica se houve alteração em relação aos dados iniciais
  const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialData);

  // Manipulador genérico para inputs de texto e selects
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Formata CNPJ à medida que digita
  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNPJ(e.target.value);
    setFormData((prev) => ({ ...prev, cnpj: formatted }));
  };

  // Formata CEP e busca endereço automático
  const handleCEPChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    const formattedCep = formatCEP(digits);
    setFormData((prev) => ({ ...prev, cep: formattedCep }));

    if (digits.length === 8) {
      try {
        const local = await getLocal(digits);
        setFormData((prev) => ({
          ...prev,
          estado: local.uf,
          cidade: local.localidade,
          bairro: local.bairro,
          logradouro: local.logradouro,
        }));
      } catch (err) {
        console.error("Erro ao buscar CEP:", err);
        toast({
          title: "Aviso",
          description: "Não foi possível buscar endereço pelo CEP.",
          variant: "destructive",
        });
      }
    }
  };

  // Submit do formulário de edição
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasChanges) {
      toast({
        title: "Nenhuma alteração",
        description: "Não há mudanças para salvar.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(formData);
      toast({
        title: "Sucesso",
        description: "Empresa atualizada com sucesso!",
      });
      onCancel();
      if (onEmpresaUpdated) onEmpresaUpdated();
    } catch (error) {
      console.error("Erro ao salvar empresa:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a empresa. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-h-[90vh] overflow-y-auto">
      {/* Cabeçalho manual, pois removemos o Dialog interno */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Editar Empresa</h2>
        <Button variant="ghost" size="icon" onClick={onCancel} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs
          defaultValue="gerais"
          value={activeTab}
          onValueChange={(tab) => setActiveTab(tab as "gerais" | "endereco" | "contato")}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="gerais">Dados Gerais</TabsTrigger>
            <TabsTrigger value="endereco">Endereço</TabsTrigger>
            <TabsTrigger value="contato">Contato</TabsTrigger>
          </TabsList>

          {/* TAB 1: Dados Gerais */}
          <TabsContent value="gerais" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="razaoSocial" className="text-sm font-medium">
                  Razão Social*
                </Label>
                <Input
                  id="razaoSocial"
                  name="razaoSocial"
                  value={formData.razaoSocial}
                  onChange={handleChange}
                  className="text-sm"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="nomeFantasia" className="text-sm font-medium">
                  Nome Fantasia
                </Label>
                <Input
                  id="nomeFantasia"
                  name="nomeFantasia"
                  value={formData.nomeFantasia}
                  onChange={handleChange}
                  className="text-sm"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="cnpj" className="text-sm font-medium">
                  CNPJ*
                </Label>
                <Input
                  id="cnpj"
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleCNPJChange}
                  className="text-sm"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="inscricaoMunicipal" className="text-sm font-medium">
                  Inscrição Municipal
                </Label>
                <Input
                  id="inscricaoMunicipal"
                  name="inscricaoMunicipal"
                  value={formData.inscricaoMunicipal}
                  onChange={handleChange}
                  className="text-sm"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="tipoEmpresa" className="text-sm font-medium">
                  Tipo de Empresa*
                </Label>
                <select
                  id="tipoEmpresa"
                  name="tipoEmpresa"
                  value={formData.tipoEmpresa}
                  onChange={handleChange}
                  className="w-52 mt-1 h-9 rounded-md border border-input bg-background px-2 text-sm"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Pública">Pública</option>
                  <option value="Privada">Privada</option>
                </select>
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: Endereço */}
          <TabsContent value="endereco" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="cep" className="text-sm font-medium">
                  CEP*
                </Label>
                <Input
                  id="cep"
                  name="cep"
                  value={formData.cep}
                  onChange={handleCEPChange}
                  placeholder="xxxxx-xxx"
                  className="text-sm"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="logradouro" className="text-sm font-medium">
                  Logradouro*
                </Label>
                <Input
                  id="logradouro"
                  name="logradouro"
                  value={formData.logradouro}
                  onChange={handleChange}
                  className="text-sm"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="numero" className="text-sm font-medium">
                  Número*
                </Label>
                <Input
                  id="numero"
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                  className="text-sm"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="complemento" className="text-sm font-medium">
                  Complemento
                </Label>
                <Input
                  id="complemento"
                  name="complemento"
                  value={formData.complemento}
                  onChange={handleChange}
                  className="text-sm"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="bairro" className="text-sm font-medium">
                  Bairro
                </Label>
                <Input
                  id="bairro"
                  name="bairro"
                  value={formData.bairro}
                  onChange={handleChange}
                  className="text-sm"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="cidade" className="text-sm font-medium">
                  Município*
                </Label>
                <Input
                  id="cidade"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  className="text-sm"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="estado" className="text-sm font-medium">
                  Estado*
                </Label>
                <Input
                  id="estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="text-sm"
                  required
                />
              </div>
            </div>
          </TabsContent>

          {/* TAB 3: Contato */}
          <TabsContent value="contato" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email*
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="text-sm"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="telefone" className="text-sm font-medium">
                  Telefone*
                </Label>
                <Input
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className="text-sm"
                  required
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Rodapé com botões */}
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="mr-2 h-4 w-4" />
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting || !hasChanges} className="bg-gray-800 hover:bg-gray-700 text-white">
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEmpresa;
