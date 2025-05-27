import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../../ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { X } from "lucide-react";
import { Empresa } from "@/app/pageInterna/empresas/page";

// interface Empresa {
//   idOrgao: number;
//     nome: string;
//     nomeFantasia: string;
//     razaoSocial: string;
//     cnpj: string;
//     numeroEmpresa: string;
//     estado: string;
//     cidade: string;
// }

interface FormEmpresaPorps {
    closeForm: () => void;
    empresa: Empresa
}

const InfoEmpresa: React.FC<FormEmpresaPorps> = ({ closeForm, empresa }) => {
    
    return (
    <Card className="w-full h-full shadow-none border-0">
      <CardHeader className="bg-gray-50 dark:bg-gray-800 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Informações da Empresa
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={closeForm} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6 pb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Nome:</span>
            <span className="text-sm font-medium">{empresa.razaoSocial}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Nome Fantasia:</span>
            <span className="text-sm">{empresa.nomeFantasia}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Tipo Empresa:</span>
            <span className="text-sm">{empresa.tipoEmpresa}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">CNPJ:</span>
            <span className="text-sm">{empresa.cnpj}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Inscrição Municipal:</span>
            <span className="text-sm">{empresa.inscricaoMunicipal}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Logradouro:</span>
            <span className="text-sm">{empresa.logradouro}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Número:</span>
            <span className="text-sm">{empresa.numero}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Complemento:</span>
            <span className="text-sm">{empresa.complemento}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Bairro:</span>
            <span className="text-sm">{empresa.bairro}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Cidade:</span>
            <span className="text-sm">{empresa.cidade}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Estado:</span>
            <span className="text-sm">{empresa.estado}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">CEP:</span>
            <span className="text-sm">{empresa.cep}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Telefone:</span>
            <span className="text-sm">{empresa.telefone}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email:</span>
            <span className="text-sm">{empresa.email}</span>
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

export default InfoEmpresa;