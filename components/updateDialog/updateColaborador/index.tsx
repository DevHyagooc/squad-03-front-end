import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { formatDate, formatPhone } from "@/lib/formatData";
import ConfirmationDialog from "@/components/confirmDialog";
import { Colaborador } from "@/app/pageInterna/colaboradores/page";

export interface UpdateColaboradorProps {
  closeForm: () => void;
  colaborador: Colaborador;
  onSave: (colaborador: Colaborador) => void;
}

const UpdateColaborador: React.FC<UpdateColaboradorProps> = ({ closeForm, colaborador: initialData, onSave }) => {
  const [formData, setFormData] = useState<Colaborador>(initialData);
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true)
  };

  const handleConfirmSave = async () => {
    setIsSubmitting(true)

    try {
      await onSave(formData)
      closeForm
    } catch (error) {
      console.error("Erro ao salvar", error)
    } finally {
      setIsSubmitting
    }
  };

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialData)

  return (
    <>
      <Card className="w-full h-full shadow-none border-0">
        <CardHeader className="bg-gray-50 dark:bg-gray-800 pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Editar Colaborador
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={closeForm} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="pt-6 pb-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="nome" className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Nome:
                </Label>
                <Input
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="text-sm"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="cargo" className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Cargo:
                </Label>
                <select
                  id="cargo"
                  name="cargo"
                  value={formData.cargo}
                  onChange={handleChange}
                  required
                  className="text-black mt-1 flex h-9 w-52 rounded-md border border-input bg-background px-2 py-2 text-sm"
                >
                  <option value="" disabled>Escolha um cargo...</option>
                  <option value="Desenvolvedor Back-end">Desenvolvedor Back-end</option>
                  <option value="Desenvolvedor Front-end">Desenvolvedor Front-end</option>
                  <option value="Desenvolvedor FullStack">Desenvolvedor FullStack</option>
                  <option value="QA">QA</option>
                  <option value="Product Owner">Product Owner</option>
                </select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="telefone" className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Telefone:
                </Label>
                <Input
                  name="telefone"
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => {
                    const formatted = formatPhone(e.target.value)
                    setFormData((prev) => ({
                      ...prev,
                      telefone: formatted,
                    }))
                  }}
                  className="text-sm"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Email:
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="text-sm"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="nascimento" className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Data de Nascimento:
                </Label>
                <Input
                  name="nascimento"
                  id="nascimento"
                  value={formData.dataNascimento}
                  onChange={(e) => {
                    const formatted = formatDate(e.target.value)
                    setFormData((prev) => ({
                      ...prev,
                      nascimento: formatted,
                    }))
                  }}
                  className="text-sm"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 pt-2 pb-4 mt-auto">
            <Button type="button" variant="outline" onClick={closeForm}>
              Cancelar
            </Button>
            <Button
              id="saveBtn"
              type="submit"
              className="bg-gray-800 hover:bg-gray-700 text-white"
              disabled={isSubmitting || !hasChanges}
            >
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <ConfirmationDialog
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmSave}
        title="Confirmar alterações"
        description="Tem certeza que deseja salvar as alterações feitas no colaborador?"
        confirmText="Salvar alterações"
        cancelText="Cancelar"
      />

    </>
  );
};

export default UpdateColaborador;