import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Form = () => {
  interface FormColabProps {
    closeForm: () => void; // closeForm é uma função que não retorna nada
  }

  const FormColab: React.FC<FormColabProps> = ({ closeForm }) => {
    return (
      <form className="space-y-4">
        <div className="flex flex-wrap w-full gap-4 justify-center py-4">

          <div className="px-2">
            <label htmlFor="cnpj" className="text-sm font-semibold">
              CNPJ:
            </label>
            <Input
              id="cnpj"
              type="text"
              placeholder="xxx.xxx.xxx-xx"
              className="w-52"
            />
          </div>

          <div className="px-2">
            <label htmlFor="razaoSocial" className="text-sm font-semibold">
              Razão social:
            </label>
            <Input id="razaoSocial" type="text" className="w-52" />
          </div>

          <div className="px-2">
            <label htmlFor="nomeFantasia" className="text-sm font-semibold">
              Nome Fantasia:
            </label>
            <Input id="nomeFantasia" type="text" className="w-52" />
          </div>

          <div className="px-2">
            <label htmlFor="cep" className="text-sm font-semibold">
              CEP:
            </label>
            <Input id="cep" type="text" className="w-52" />
          </div>

          <div className="px-2">
            <label htmlFor="estado" className="text-sm font-semibold">
              Estado:
            </label>
            <br />
            <select id="estado" className="w-52 h-10 border border-stone-200 rounded-md">
              <option value="estado">Rio de Janeiro</option>
            </select>
          </div>

          <div className="px-2">
            <label htmlFor="municipio" className="text-sm font-semibold">
              Município:
            </label>
            <br />
            <select id="municipio" className="w-52 h-10 border border-stone-200 rounded-md">
              <option value="rioDeJaneiro">Rio de Janeiro</option>
            </select>
          </div>

          <div className="px-2">
            <label htmlFor="bairro" className="text-sm font-semibold">
              Bairro:
            </label>
            <br />
            <select id="bairro" className="w-52 h-10 border border-stone-200 rounded-md">
              <option value="Centro">Centro</option>
            </select>
          </div>

          <div className="px-2">
            <label htmlFor="endereco" className="text-sm font-semibold">
              Endereço:
            </label>
            <br />
            <select id="endereco" className="w-52 h-10 border border-stone-200 rounded-md">
              <option value="avRioBranco">AV Rio Branco</option>
            </select>
          </div>

          <div className="px-2">
            <label htmlFor="email" className="text-sm font-semibold">
              Email:
            </label>
            <Input id="email" type="email" className="w-52" />
          </div>

          <div className="px-2">
            <label htmlFor="inscricaoMunicipal" className="text-sm font-semibold">
              Inscrição municipal:
            </label>
            <Input id="inscricaoMunicipal" type="text" className="w-52" />
          </div>

          <div className="px-2">
            <label htmlFor="numero" className="text-sm font-semibold">
              Número:
            </label>
            <Input id="numero" type="text" className="w-52" />
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
