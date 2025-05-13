import { useState } from "react";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { getLocal } from "@/services/cep";  // Verifique se o caminho está correto

const FormEmpresa: React.FC<{ closeForm: () => void }> = ({ closeForm }) => {
  const methods = useForm({
    defaultValues: {
      cnpj: "",
      razaoSocial: "",
      nomeFantasia: "",
      cep: "",
      estado: "",
      municipio: "",
      bairro: "",
      logradouro: "",
      numero: "",
      email: "",
      inscricaoMunicipal: ""
    }
  });

  const { control, handleSubmit, formState: { errors }, setValue } = methods;
  const [cep, setCep] = useState<string>("");
  const [estado, setEstado] = useState<string>("");
  const [municipio, setMunicipio] = useState<string>("");
  const [bairro, setBairro] = useState<string>("");
  const [logradouro, setLogradouro] = useState<string>("");

  const handleCepChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, '');
    setCep(value);

    if (value.length === 8) {  // Verifica se o CEP tem 8 caracteres
      try {
        const localData = await getLocal(value);
        setEstado(localData.uf);
        setMunicipio(localData.localidade);
        setBairro(localData.bairro);
        setLogradouro(localData.logradouro);
        // Atualiza os campos automaticamente
        setValue("estado", localData.uf);
        setValue("municipio", localData.localidade);
        setValue("bairro", localData.bairro);
        setValue("logradouro", localData.logradouro);
      } catch (error) {
        console.error("Erro ao buscar o local:", error);
      }
    }
  };

  const onSubmit = (data: any) => {
    console.log(data);
    closeForm();
  };

  const formatCNPJ = (value: string) => {
    // Remover tudo que não for número
    const cleaned = value.replace(/\D/g, '');

    // Limitar o CEP a 8 caracteres
    const limited = cleaned.substring(0, 14);  // CNPJ tem 14 dígitos

    // Adicionar formatação conforme a máscara
    if (limited.length <= 2) {
      return limited;
    } else if (limited.length <= 5) {
      return limited.replace(/(\d{2})(\d{1,3})/, '$1.$2');
    } else if (limited.length <= 8) {
      return limited.replace(/(\d{2})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (limited.length <= 12) {
      return limited.replace(/(\d{2})(\d{3})(\d{3})(\d{1,4})/, '$1.$2.$3/$4');
    } else {
      return limited.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})/, '$1.$2.$3/$4-$5');
    }
  };

  const formatCEP = (value: string) => {
    // Remover tudo que não for número
    const cleaned = value.replace(/\D/g, '');

    // Limitar o CEP a 8 caracteres
    const limited = cleaned.substring(0, 8);  // CEP tem 8 dígitos

    // Adicionar formatação conforme a máscara
    if (limited.length <= 5) {
      return limited;
    } else {
      return limited.replace(/(\d{5})(\d{1,3})/, '$1-$2');
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-wrap w-full gap-4 py-3 px-1 pl-2">
          {/* CNPJ */}
          <FormItem className="px-2 focus-within:text-cyan-500">
            <FormLabel htmlFor="cnpj">CNPJ:</FormLabel>
            <FormControl>
              <Controller
                name="cnpj"
                control={control}
                render={({ field }) => (
                  <Input
                    id="cnpj"
                    type="text"
                    placeholder="xx.xxx.xxx/xxxx-xx"
                    className="w-52 mt-1 text-black"
                    value={field.value}
                    onChange={(e) => field.onChange(formatCNPJ(e.target.value))}
                  />
                )}
              />
            </FormControl>
            <FormMessage>{errors.cnpj && errors.cnpj.message}</FormMessage>
          </FormItem>

          {/* Razão Social */}
          <FormItem className="px-2 focus-within:text-cyan-500">
            <FormLabel htmlFor="razaoSocial">Razão Social:</FormLabel>
            <FormControl>
              <Controller
                name="razaoSocial"
                control={control}
                render={({ field }) => (
                  <Input
                    id="razaoSocial"
                    type="text"
                    className="w-52 mt-1 text-black"
                    {...field}
                  />
                )}
              />
            </FormControl>
            <FormMessage>{errors.razaoSocial && errors.razaoSocial.message}</FormMessage>
          </FormItem>

          {/* Nome Fantasia */}
          <FormItem className="px-2 focus-within:text-cyan-500">
            <FormLabel htmlFor="nomeFantasia">Nome Fantasia:</FormLabel>
            <FormControl>
              <Controller
                name="nomeFantasia"
                control={control}
                render={({ field }) => (
                  <Input
                    id="nomeFantasia"
                    type="text"
                    className="w-52 mt-1 text-black"
                    {...field}
                  />
                )}
              />
            </FormControl>
            <FormMessage>{errors.nomeFantasia && errors.nomeFantasia.message}</FormMessage>
          </FormItem>

          {/* CEP */}
          <FormItem className="px-2 focus-within:text-cyan-500">
            <FormLabel htmlFor="cep">CEP:</FormLabel>
            <FormControl>
              <Controller
                name="cep"
                control={control}
                render={({ field }) => (
                  <Input
                    id="cnpj"
                    type="text"
                    placeholder="xxxxx-xxx"
                    className="w-52 mt-1 text-black"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(formatCEP(e.target.value));
                      console.log(e);
                      handleCepChange(e);
                    }}
                  />
                )}
              />
            </FormControl>
            <FormMessage>{errors.cep && errors.cep.message}</FormMessage>
          </FormItem>

          {/* Estado */}
          <FormItem className="px-2 focus-within:text-cyan-500">
            <FormLabel htmlFor="estado">Estado:</FormLabel>
            <FormControl>
              <Controller
                name="estado"
                control={control}
                render={({ field }) => (
                  <select
                    id="estado"
                    {...field}
                    className="w-52 mt-1 text-black flex h-9 rounded-md border border-input bg-background px-2 py-2 text-sm"
                  >
                    <option value="">Selecione um estado</option>
                    <option value={estado}>{estado}</option>
                  </select>
                )}
              />
            </FormControl>
            <FormMessage>{errors.estado && errors.estado.message}</FormMessage>
          </FormItem>

          {/* Município */}
          <FormItem className="px-2 focus-within:text-cyan-500">
            <FormLabel htmlFor="municipio">Município:</FormLabel>
            <FormControl>
              <Controller
                name="municipio"
                control={control}
                render={({ field }) => (
                  <select
                    id="municipio"
                    {...field}
                    className="w-52 mt-1 text-black flex h-9 rounded-md border border-input bg-background px-2 py-2 text-sm"
                  >
                    <option value="">Selecione um município</option>
                    <option value={municipio}>{municipio}</option>
                  </select>
                )}
              />
            </FormControl>
            <FormMessage>{errors.municipio && errors.municipio.message}</FormMessage>
          </FormItem>

          {/* Bairro */}
          <FormItem className="px-2 focus-within:text-cyan-500">
            <FormLabel htmlFor="bairro">Bairro:</FormLabel>
            <FormControl>
              <Controller
                name="bairro"
                control={control}
                render={({ field }) => (
                  <select
                    id="bairro"
                    {...field}
                    className="w-52 mt-1 text-black flex h-9 rounded-md border border-input bg-background px-2 py-2 text-sm"
                  >
                    <option value="">Selecione um bairro</option>
                    <option value={bairro}>{bairro}</option>
                  </select>
                )}
              />
            </FormControl>
            <FormMessage>{errors.bairro && errors.bairro.message}</FormMessage>
          </FormItem>

          {/* Logradouro */}
          <FormItem className="px-2 focus-within:text-cyan-500">
            <FormLabel htmlFor="logradouro">Logradouro:</FormLabel>
            <FormControl>
              <Controller
                name="logradouro"
                control={control}
                render={({ field }) => (
                  <Input
                    id="logradouro"
                    type="text"
                    className="w-52 mt-1 text-black"
                    value={logradouro}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </FormControl>
            <FormMessage>{errors.logradouro && errors.logradouro.message}</FormMessage>
          </FormItem>

          {/* Número */}
          <FormItem className="px-2 focus-within:text-cyan-500">
            <FormLabel htmlFor="numero">Número:</FormLabel>
            <FormControl>
              <Controller
                name="numero"
                control={control}
                render={({ field }) => (
                  <Input
                    id="numero"
                    type="text"
                    className="w-52 mt-1 text-black"
                    {...field}
                  />
                )}
              />
            </FormControl>
            <FormMessage>{errors.numero && errors.numero.message}</FormMessage>
          </FormItem>

          {/* Email */}
          <FormItem className="px-2 focus-within:text-cyan-500">
            <FormLabel htmlFor="email">Email:</FormLabel>
            <FormControl>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    id="email"
                    type="email"
                    className="w-52 mt-1 text-black"
                    {...field}
                  />
                )}
              />
            </FormControl>
            <FormMessage>{errors.email && errors.email.message}</FormMessage>
          </FormItem>

          {/* Inscrição Municipal */}
          <FormItem className="px-2 focus-within:text-cyan-500">
            <FormLabel htmlFor="inscricaoMunicipal">Inscrição Municipal:</FormLabel>
            <FormControl>
              <Controller
                name="inscricaoMunicipal"
                control={control}
                render={({ field }) => (
                  <Input
                    id="inscricaoMunicipal"
                    type="text"
                    className="w-52 mt-1 text-black"
                    {...field}
                  />
                )}
              />
            </FormControl>
            <FormMessage>{errors.inscricaoMunicipal && errors.inscricaoMunicipal.message}</FormMessage>
          </FormItem>
        </div>

        <div className="flex justify-end gap-4">
          <Button onClick={closeForm} variant="destructive" className="w-20">
            Cancelar
          </Button>
          <Button type="submit" className="w-20">
            Salvar
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default FormEmpresa;
