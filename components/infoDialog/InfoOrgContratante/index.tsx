import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../../ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { X } from "lucide-react";

interface OrgContratante {
  idOrgao: number;
    nome: string;
    nomeFantasia: string;
    razaoSocial: string;
    numeroEmpresa: string;
    estado: string;
    cidade: string;
}

interface FormOrgContratantePorps {
    closeForm: () => void;
    orgContratante: OrgContratante
}

const InfoOrgContratante: React.FC<FormOrgContratantePorps> = ({ closeForm, orgContratante }) => {
    
    return (
    <Card className="w-full h-full shadow-none border-0">
      <CardHeader className="bg-gray-50 dark:bg-gray-800 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Informações do Órgão Contratante
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={closeForm} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6 pb-2">
        {/* <h3 className="text-md font-semibold mb-4 text-gray-700 dark:text-gray-300">Informações do Colaborador</h3> */}

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Nome:</span>
            <span className="text-sm col-span-2 font-medium">{orgContratante.nome}</span>
          </div>

          <Separator />

          <div className="grid grid-cols-3 gap-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Nome Fantasia:</span>
            <span className="text-sm col-span-2">{orgContratante.nomeFantasia}</span>
          </div>

          <Separator />

          <div className="grid grid-cols-3 gap-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Razão Social:</span>
            <span className="text-sm col-span-2">{orgContratante.razaoSocial}</span>
          </div>

          <Separator />

          <div className="grid grid-cols-3 gap-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Número Empresa:</span>
            <span className="text-sm col-span-2">{orgContratante.numeroEmpresa}</span>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Estado:</span>
              <span className="text-sm">{orgContratante.estado}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Cidade:</span>
              <span className="text-sm">{orgContratante.cidade}</span>
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
}

export default InfoOrgContratante;