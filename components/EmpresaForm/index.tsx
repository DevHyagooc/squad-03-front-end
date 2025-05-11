import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Form = () => {
  interface FormEmpresaProps {
    closeForm: () => void; // closeForm é uma função que não retorna nada
  }

  const FormEmpresa: React.FC<FormEmpresaProps> = ({ closeForm }) => {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap w-full gap-4 py-3 px-1 pl-2">
          <div className="px-2 focus-within:text-cyan-500">
            <label htmlFor="cnpj" className="text-sm font-normal">
              CNPJ:
            </label>
            <Input
              id="cnpj"
              type="text"
              placeholder="xxx.xxx.xxx-xx"
              className="w-52 mt-1 text-black"
            />
          </div>

          <div className="px-2 focus-within:text-cyan-500">
            <label htmlFor="razaoSocial" className="text-sm font-normal">
              Razão Social:
            </label>
            <Input id="razaoSocial" type="text" className="w-52 mt-1 text-black" />
          </div>

          <div className="px-2 focus-within:text-cyan-500">
            <label htmlFor="nomeFantasia" className="text-sm font-normal">
              Nome Fantasia:
            </label>
            <Input id="nomeFantasia" type="text" className="w-52 mt-1 text-black" />
          </div>

          <div className="px-2 focus-within:text-cyan-500">
            <label htmlFor="cep" className="text-sm font-normal">
              CEP:
            </label>
            <Input id="cep" type="text" className="w-52 mt-1 text-black" />
          </div>

          <div className="px-2 focus-within:text-cyan-500">
            <label htmlFor="estado" className="text-sm font-normal">
              Estado:
            </label>
            <br />
            <select
              id="estado"
              className="text-black mt-1 flex h-9 w-52 rounded-md border border-input bg-background px-2 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:border-cyan-500 focus:border-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            >
              <option value="estado">Rio de Janeiro</option>
            </select>
          </div>

          <div className="px-2 focus-within:text-cyan-500">
            <label htmlFor="municipio" className="text-sm font-normal">
              Município:
            </label>
            <br />
            <select
              id="municipio"
              className="text-black mt-1 flex h-9 w-52 rounded-md border border-input bg-background px-2 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:border-cyan-500 focus:border-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            >
              <option value="rioDeJaneiro">Rio de Janeiro</option>
            </select>
          </div>

          <div className="px-2 focus-within:text-cyan-500">
            <label htmlFor="bairro" className="text-sm font-normal">
              Bairro:
            </label>
            <br />
            <select
              id="bairro"
              className="text-black mt-1 flex h-9 w-52 rounded-md border border-input bg-background px-2 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:border-cyan-500 focus:border-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            >
              <option value="Centro">Centro</option>
            </select>
          </div>

          <div className="px-2 focus-within:text-cyan-500">
            <label htmlFor="cep" className="text-sm font-normal">
              Endereço:
            </label>
            <Input id="cep" type="text" className="w-52 mt-1 text-black" />
          </div>

          <div className="px-2 focus-within:text-cyan-500">
            <label htmlFor="numero" className="text-sm font-normal">
              Número:
            </label>
            <Input id="numero" type="text" className="w-52 mt-1 text-black" />
          </div>

          <div className="px-2 focus-within:text-cyan-500">
            <label htmlFor="email" className="text-sm font-normal">
              Email:
            </label>
            <Input id="email" type="email" className="w-52 mt-1 text-black" />
          </div>

          <div className="px-2 focus-within:text-cyan-500">
            <label htmlFor="inscricaoMunicipal" className="text-sm font-normal">
              Inscrição Municipal:
            </label>
            <Input
              id="inscricaoMunicipal"
              type="text"
              className="w-52 mt-1 text-black"
            />
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
      </div>
    );
  };

  return <FormEmpresa closeForm={() => { }} />;
};

export default Form;
