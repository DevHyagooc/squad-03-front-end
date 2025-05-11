import { Button } from "../ui/button";
import { Input } from "../ui/input";


const Form = () => {
   interface FormColabProps {
      closeForm: () => void;  // closeForm é uma função que não retorna nada
   }

   const FormColab: React.FC<FormColabProps> = ({ closeForm }) => {
      return (
         <form className="space-y-4">
            <div className="flex flex-wrap w-full gap-4 py-4 px-1 pl-2">
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
                  <label htmlFor="estado" className="text-sm font-normal">
                     Função do colaborador:
                  </label>
                  <select
                     id="estado"
                     className="text-black mt-1 flex h-9 w-52 rounded-md border border-input bg-background px-2 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:border-cyan-500 focus:border-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  >
                     <option value="estado" className="" disabled selected>Escolha uma função...</option>
                     <option value="estado">Desenvolvedor Back-end</option>
                  </select>
               </div>
               <div className="px-2 focus-within:text-cyan-500">
                  <label htmlFor="nome" className="text-sm font-normal">Email:</label>
                  <Input id="nome" type="text" placeholder="Digite aqui o email" className="w-52 mt-1 text-black" />
               </div>
               <div className="px-2 focus-within:text-cyan-500">
                  <label htmlFor="nome" className="text-sm font-normal">Telefone:</label>
                  <Input id="nome" type="text" placeholder="Digite aqui o número" className="w-52 mt-1 text-black" />
               </div>
               <div className="px-2 focus-within:text-cyan-500">
                  <label htmlFor="nome" className="text-sm font-normal">Data de Nascimento:</label>
                  <Input id="nome" type="text" placeholder="dd/mm/aaaa" className="w-52 mt-1 text-black" />
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
