import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { X, User, Briefcase, Phone, Mail, Calendar } from "lucide-react";
import { Button } from "../../ui/button";

interface Colaborador {
   idFuncionario: string;
   nome: string;
   cargo: string;
   telefone: string;
   email: string;
   nascimento: string;
}
interface FormColabProps {
   closeForm: () => void;
   colaborador: Colaborador
}

const InfoColab: React.FC<FormColabProps> = ({ closeForm, colaborador }) => {

   return (
    <Card className="w-full h-full shadow-none border-0">
      <CardHeader className="bg-gray-50 dark:bg-gray-800 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Informações do Colaborador
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={closeForm} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6 pb-2">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700">
              <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Nome</span>
              <span className="text-base font-medium">{colaborador.nome}</span>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700">
              <Briefcase className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Cargo</span>
              <span className="text-base">{colaborador.cargo}</span>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700">
              <Phone className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Telefone</span>
              <span className="text-base">{colaborador.telefone}</span>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700">
              <Mail className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</span>
              <span className="text-base">{colaborador.email}</span>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700">
              <Calendar className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Data de Nascimento</span>
              <span className="text-base">{colaborador.nascimento || "Não informado"}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end pt-2 pb-4 mt-auto">
        {/* <Button onClick={closeForm} className="bg-gray-800 hover:bg-gray-700 text-white">
          Fechar
        </Button> */}
      </CardFooter>
    </Card>
  );
};

export default InfoColab;
