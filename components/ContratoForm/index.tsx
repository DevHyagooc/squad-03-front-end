import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Form = () => {
  interface FormFuncProps {
    closeForm: () => void; // closeForm é uma função que não retorna nada
  }

  const FormFunc: React.FC<FormFuncProps> = ({ closeForm }) => {
    return (
      <form className="space-y-4">
        <div className="flex flex-wrap w-full gap-4 justify-center py-4">
          <div className="px-2">
            <label htmlFor="prazo" className="text-sm font-semibold">
              Prazo do contrato:
            </label>
          <Input id="prazo" type="text" placeholder= "DD/MM/AAAA"className="w-52" />
          </div>

          <div className="px-2">
            <label htmlFor="ValorContrato" className="text-sm font-semibold">
              Valor do contrato:
            </label>
            <Input id="ValorContrato" type="text" className="w-52" />
          </div>

          <div className="px-2">
            <label htmlFor="OrgaoContratante" className="text-sm font-semibold">
              Orgão Contratante: 
            </label>
            <Input id="OrgaoContratante" type="text" className="w-52" />
          </div>          

          <div className="px-2">
            <label htmlFor="status" className="text-sm font-semibold">
              Status:
            </label>
            <br />
            <select id="status" className="w-52 h-10 border border-stone-200 rounded-md">
              <option value="status">Ativo</option>
              <option value="status">Cancelado</option>
              <option value="status">Encerrado</option>
            </select>
          </div>

          <div className="px-2">
            <label htmlFor="criado" className="text-sm font-semibold">
              Criado em:
            </label>
            <Input id="criado" type="text" placeholder="DD/MM/AAAA" className="w-52" />
            <br />
           
          </div>

          <div className="px-2">
            <label htmlFor="representante" className="text-sm font-semibold">
            Representante:
            </label>
            <Input id="representante" type="text" className="w-52" />
            <br />
            
          </div>

          <div className="px-2">
            <label htmlFor="responsavel" className="text-sm font-semibold">
              Responsável pelo contrato:
            </label> 
            <Input id="responsavel" type="text" className="w-52" />
            <br />
            
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

  return <FormFunc closeForm={() => {}} />;
};

export default Form;
