import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

export interface Colaborador {
   idFuncionario: string;
   nome: string;
   cargo: string;
   telefone: string;
   email: string;
   nascimento: string;
}

export interface UpdateColaboradorProps {
   closeForm: () => void;
   colaborador: Colaborador;
   onSave: (colaborador: Colaborador) => void;
}

const UpdateColaborador: React.FC<UpdateColaboradorProps> = ({ closeForm, colaborador: initialData, onSave }) => {
   const [formData, setFormData] = useState<Colaborador>(initialData);
   const [isSubmitting, setIsSubmitting] = useState(false);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
         await onSave(formData);
         closeForm();
      } catch (error) {
         console.error("Erro ao salvar colaborador:", error);
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
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
                     <Input
                        id="cargo"
                        name="cargo"
                        value={formData.cargo}
                        onChange={handleChange}
                        required
                        className="text-sm"
                     />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                     <Label htmlFor="telefone" className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Telefone:
                     </Label>
                     <Input
                        id="telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        className="text-sm"
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
                        id="nascimento"
                        name="nascimento"
                        type="date"
                        value={formData.nascimento}
                        onChange={handleChange}
                        className="text-sm"
                     />
                  </div>
               </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 pt-2 pb-4 mt-auto">
               <Button type="button" variant="outline" onClick={closeForm}>
                  Cancelar
               </Button>
               <Button
                  type="submit"
                  className="bg-gray-800 hover:bg-gray-700 text-white"
                  disabled={isSubmitting}
               >
                  {isSubmitting ? "Salvando..." : "Salvar"}
               </Button>
            </CardFooter>
         </form>
      </Card>
   );
};

export default UpdateColaborador;