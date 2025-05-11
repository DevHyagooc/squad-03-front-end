import { Button } from "../ui/button";
import { Input } from "../ui/input";


const Form = () => {
   interface FormColabProps {
      closeForm: () => void;  // closeForm é uma função que não retorna nada
   }

   const FormColab: React.FC<FormColabProps> = ({ closeForm }) => {
      return (
         <form className="space-y-4">
            <div className="flex flex-wrap w-full gap-4 justify-center py-4 px-1 pl-2">
               <div className="px-2 focus-within:text-cyan-500">
                  <label htmlFor="nome" className="text-sm font-normal">Nome do Colaborador:</label>
                  <Input id="nome" type="text" placeholder="Nome Completo..." className="w-52 mt-1 text-black" />
               </div>
               <div className="px-2 focus-within:text-cyan-500">
                  <label htmlFor="cpf" className="text-sm font-normal">CPF:</label>
                  <Input
                     id="cpf"
                     type="text"
                     placeholder="xxx.xxx.xxx-xx"
                     className="w-52 mt-1 text-black"
                  />
               </div>
               <div className="px-2 focus-within:text-cyan-500">
                  <label htmlFor="nome" className="text-sm font-normal">Nome:</label>
                  <Input id="nome" type="text" placeholder="Digite o nome do colaborador" className="w-52 mt-1 text-black" />
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

   return <FormColab closeForm={() => { }} />;
};

export default Form;
