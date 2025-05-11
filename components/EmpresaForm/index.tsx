import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { getLocal } from "@/services/cep";  // Verifique se o caminho está correto

const Form = () => {
  interface FormEmpresaProps {
    closeForm: () => void; // closeForm é uma função que não retorna nada
  }

  const FormEmpresa: React.FC<FormEmpresaProps> = ({ closeForm }) => {
    const [cep, setCep] = useState<string>("");  // Estado para armazenar o valor do CEP
    const [estado, setEstado] = useState<string>("");  // Estado para armazenar o estado
    const [municipio, setMunicipio] = useState<string>("");  // Estado para armazenar o município
    const [bairro, setBairro] = useState<string>("");  // Estado para armazenar o bairro
    const [logradouro, setLogradouro] = useState<string>("");  // Estado para armazenar o bairro

    const handleCepChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setCep(value);  // Atualiza o valor do CEP

      if (value.length === 8) {  // Verifica se o CEP tem 8 caracteres
        try {
          const localData = await getLocal(value);  // Chama a função getLocal passando o CEP
          setEstado(localData.uf);  // Atualiza o estado com os dados retornados
          setMunicipio(localData.localidade);  // Atualiza o município com os dados retornados
          setBairro(localData.bairro);  // Atualiza o bairro com os dados retornados
          setLogradouro(localData.logradouro);  // Atualiza o logradouro com os dados retornados
        } catch (error) {
          console.error("Erro ao buscar o local:", error);
        }
      }
    };

    return (
      <form className="space-y-4">
        <div className="flex flex-wrap w-full gap-4 py-3 px-1 pl-2">
          {/* Outros campos */}

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
            <Input
              id="cep"
              type="text"
              className="w-52 mt-1 text-black"
              value={cep}
              onChange={handleCepChange}  // Chama a função handleCepChange quando o valor do CEP mudar
            />
          </div>

          <div className="px-2 focus-within:text-cyan-500">
            <label htmlFor="estado" className="text-sm font-normal">
              Estado:
            </label>
            <select
              id="estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}  // Atualiza o estado
              className="text-black mt-1 flex h-9 w-52 rounded-md border border-input bg-background px-2 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:border-cyan-500 focus:border-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            >
              <option value={estado}>{estado || "Selecione um estado"}</option>
            </select>
          </div>

          <div className="px-2 focus-within:text-cyan-500">
            <label htmlFor="municipio" className="text-sm font-normal">
              Município:
            </label>
            <select
              id="municipio"
              value={municipio}
              onChange={(e) => setMunicipio(e.target.value)}  // Atualiza o município
              className="text-black mt-1 flex h-9 w-52 rounded-md border border-input bg-background px-2 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:border-cyan-500 focus:border-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            >
              <option value={municipio}>{municipio || "Selecione um município"}</option>
            </select>
          </div>

          <div className="px-2 focus-within:text-cyan-500">
            <label htmlFor="bairro" className="text-sm font-normal">
              Bairro:
            </label>
            <select
              id="bairro"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}  // Atualiza o bairro
              className="text-black mt-1 flex h-9 w-52 rounded-md border border-input bg-background px-2 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:border-cyan-500 focus:border-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            >
              <option value={bairro}>{bairro || "Selecione um bairro"}</option>
            </select>
          </div>

          <div className="px-2 focus-within:text-cyan-500">
            <label htmlFor="logradouro" className="text-sm font-normal">
              Logradouro:
            </label>
            <input
              id="logradouro"
              value={logradouro}
              onChange={(e) => setLogradouro(e.target.value)}  // Atualiza o logradouro
              className="text-black mt-1 flex h-9 w-52 rounded-md border border-input bg-background px-2 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:border-cyan-500 focus:border-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            >
            </input>
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
      </form>
    );
  };

  return <FormEmpresa closeForm={() => { }} />;
};

export default Form;
