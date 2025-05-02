import { Button } from "../ui/button";
import { Input } from "../ui/input";


const Form = () => {
   interface FormFuncProps {
      closeForm: () => void;  // closeForm é uma função que não retorna nada
   }

   const FormFunc: React.FC<FormFuncProps> = ({ closeForm }) => {
      return (
         <form className="space-y-4">
            <div className="flex flex-wrap w-full gap-4 justify-center py-4">
               <div className="px-2">
                  <label htmlFor="nome" className="text-sm font-semibold">Nome do Funcionário:</label>
                  <Input id="nome" type="text" placeholder="Nome Completo..." className="w-52" />
               </div>
               <div className="px-2">
                  <label htmlFor="cpf" className="text-sm font-semibold">CPF:</label>
                  <Input
                     id="cpf"
                     type="text"
                     placeholder="xxx.xxx.xxx-xx"
                     className="w-52"
                  />
               </div>
               <div className="px-2">
                  <label htmlFor="nome" className="text-sm font-semibold">Nome:</label>
                  <Input id="nome" type="text" placeholder="Digite o nome do funcionário" className="w-52" />
               </div>
            </div>
            <div className="flex justify-end gap-4">
               {/* Botão "Cancelar" chama o closeForm */}
               <Button onClick={closeForm} variant="destructive" className="w-20">
                  Cancelar
               </Button>
               <Button onClick={closeForm} className="w-20">
                  Salvar
               </Button>
            </div>
         </form>
      );
   };

   return <FormFunc closeForm={() => { }} />;
};

export default Form;
