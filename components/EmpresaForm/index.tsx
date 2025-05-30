// src/components/FormEmpresa.tsx
import { useState } from "react";
import { FormProvider, useForm, Controller, SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { getLocal } from "@/services/cep";
import { formatCEP, formatCNPJ, formatCPF, formatPhone } from "@/lib/formatData";

const steps = ["Empresa", "Endereço", "Contato Empresa", "Representante"];

type FormData = {
  cnpj: string;
  inscricaoMunicipal: string;
  razaoSocial: string;
  nomeFantasia: string;
  tipoEmpresa: string;
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  logradouro: string;
  numero: string;
  complemento: string;
  email: string;
  telefone: string;
  representanteNome: string;
  representanteCpf: string;
  emailRepresentante: string;
  representanteTelefone: string;
};

const FormEmpresa: React.FC<FormEmpresaProps> = ({ closeForm, onSubmit }) => {
  const methods = useForm<FormData>({
    defaultValues: {
      cnpj: "",
      inscricaoMunicipal: "",
      razaoSocial: "",
      nomeFantasia: "",
      tipoEmpresa: "",
      cep: "",
      estado: "",
      cidade: "",
      bairro: "",
      logradouro: "",
      numero: "",
      complemento: "",
      email: "",
      telefone: "",
      representanteNome: "",
      representanteCpf: "",
      emailRepresentante: "",
      representanteTelefone: "",
    },
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    trigger,
  } = methods;

  // Observa todos os valores do formulário
  const formValues = watch();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit: SubmitHandler<any> = (empresa) => {

    const payload = {
      // campos “chave-valor” 1:1
      razaoSocial: empresa.razaoSocial,
      nomeFantasia: empresa.nomeFantasia,
      cnpj: empresa.cnpj,
      inscricaoMunicipal: empresa.inscricaoMunicipal,
      tipoEmpresa: empresa.tipoEmpresa,       // rename aqui
      cep: empresa.cep,
      bairro: empresa.bairro,
      logradouro: empresa.logradouro,
      numero: empresa.numero,
      complemento: empresa.complemento,
      estado: empresa.estado,
      cidade: empresa.cidade,         // seu post usa “cidade”
      email: empresa.email,
      telefone: empresa.telefone,

      // monta o array de representantes
      representantes: [
        {
          nome: empresa.representanteNome,
          cpf: empresa.representanteCpf,
          email: empresa.emailRepresentante,
          telefone: empresa.representanteTelefone,
        }
      ]
    };


    if (onSubmit) onSubmit(payload);
    closeForm();
  }

  const handleNext = async () => {
    // Valida os campos do passo atual antes de avançar
    const fields = stepsFields[step];
    const isValidStep = await trigger(fields as any);

    if (isValidStep && step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    const formattedCep = formatCEP(digits);
    setValue("cep", formattedCep, { shouldValidate: true });

    if (digits.length === 8) {
      try {
        const local = await getLocal(digits);
        setValue("estado", local.uf, { shouldValidate: true });
        setValue("cidade", local.localidade, { shouldValidate: true });
        setValue("bairro", local.bairro, { shouldValidate: true });
        setValue("logradouro", local.logradouro, { shouldValidate: true });
      } catch (err) {
        console.error("Erro ao buscar CEP:", err);
      }
    }
  };

  // const onSubmit = async (data: FormData) => {
  //   setIsSubmitting(true);
  //   try {
  //     const data = await postEmpresa(data)
  //     console.log("Dados enviados:", data);
  //     closeForm();
  //   } catch (error) {
  //     console.error("Erro ao salvar:", error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // Campos requeridos para validação em cada step
  const stepsFields = [
    ["cnpj", "razaoSocial", "tipoEmpresa"], // Step 0
    ["cep", "logradouro", "numero", "municipio", "estado"], // Step 1
    ["email", "telefone"], // Step 2
    ["representanteNome", "representanteCpf"], // Step 3
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{steps[step]}</h2>
          <span className="text-sm text-gray-500">Passo {step + 1} de {steps.length}</span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-cyan-500 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / 4) * 100}%` }}
          ></div>
        </div>

        {/* STEP 0: Empresa */}
        {step === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>CNPJ*</FormLabel>
              <FormControl>
                <Controller
                  name="cnpj"
                  control={control}
                  rules={{ required: "CNPJ é obrigatório" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="xx.xxx.xxx/xxxx-xx"
                      onChange={(e) => field.onChange(formatCNPJ(e.target.value))}
                    />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Inscrição Municipal</FormLabel>
              <FormControl>
                <Controller
                  name="inscricaoMunicipal"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Razão Social*</FormLabel>
              <FormControl>
                <Controller
                  name="razaoSocial"
                  control={control}
                  rules={{ required: "Razão social é obrigatória" }}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Nome Fantasia</FormLabel>
              <FormControl>
                <Controller
                  name="nomeFantasia"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel htmlFor="tipoEmpresa">Tipo de Empresa:</FormLabel>
              <FormControl>
                <Controller
                  name="tipoEmpresa"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Tipo de empresa é obrigatório" }}
                  render={({ field }) => (
                    <select
                      id="tipoEmpresa"
                      {...field}
                      className="w-52 mt-1 text-black flex h-9 rounded-md border border-input bg-background px-2 py-2 text-sm"
                    >
                      <option value="">Selecione...</option>
                      <option value="Pública">Pública</option>
                      <option value="Privada">Privada</option>

                    </select>
                  )}
                />
              </FormControl>
              <FormMessage>{errors.tipoEmpresa && errors.tipoEmpresa.message}</FormMessage>
            </FormItem>
          </div>
        )}

        {/* STEP 1: Endereço */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>CEP*</FormLabel>
              <FormControl>
                <Controller
                  name="cep"
                  control={control}
                  rules={{ required: "CEP é obrigatório" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="xxxxx-xxx"
                      onChange={(e) => {
                        field.onChange(formatCEP(e.target.value));
                        handleCepChange(e);
                      }}
                    />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Logradouro*</FormLabel>
              <FormControl>
                <Controller
                  name="logradouro"
                  control={control}
                  rules={{ required: "Logradouro é obrigatório" }}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Número*</FormLabel>
              <FormControl>
                <Controller
                  name="numero"
                  control={control}
                  rules={{ required: "Número é obrigatório" }}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Complemento</FormLabel>
              <FormControl>
                <Controller
                  name="complemento"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Bairro</FormLabel>
              <FormControl>
                <Controller
                  name="bairro"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Município*</FormLabel>
              <FormControl>
                <Controller
                  name="cidade"
                  control={control}
                  rules={{ required: "Município é obrigatório" }}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Estado*</FormLabel>
              <FormControl>
                <Controller
                  name="estado"
                  control={control}
                  rules={{ required: "Estado é obrigatório" }}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
        )}

        {/* STEP 2: Contato */}
        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Email*</FormLabel>
              <FormControl>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email é obrigatório",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email inválido"
                    }
                  }}
                  render={({ field }) => <Input type="email" {...field} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel htmlFor="telefone">Telefone*</FormLabel>
              <FormControl>
                <Controller
                  name="telefone"
                  control={control}
                  rules={{ required: "Telefone é obrigatório" }}
                  render={({ field }) => (
                    <div className="mt-1">
                      <PhoneInput
                        international
                        defaultCountry="BR"
                        id="telefone"
                        value={field.value || ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        placeholder="(xx) x xxxx-xxxx"
                        className={`w-52 h-9 px-3 py-2 border rounded-md text-black ${errors.telefone ? "border-red-500" : "border-input"}
                          bg-background text-sm
                          ring-offset-background
                          focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2
                        `}
                      />
                    </div>
                  )}
                />
              </FormControl>
              <FormMessage>
                {errors.telefone && errors.telefone.message}
              </FormMessage>
            </FormItem>
          </div>
        )}

        {/* STEP 3: Representante */}
        {step === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Nome do Representante*</FormLabel>
              <FormControl>
                <Controller
                  name="representanteNome"
                  control={control}
                  rules={{ required: "Nome do representante é obrigatório" }}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>CPF*</FormLabel>
              <FormControl>
                <Controller
                  name="representanteCpf"
                  control={control}
                  rules={{ required: "CPF é obrigatório" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      onChange={(e) => field.onChange(formatCPF(e.target.value))}
                    />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel htmlFor="representanteTelefone">Telefone*</FormLabel>
              <FormControl>
                <Controller
                  name="representanteTelefone"
                  control={control}
                  rules={{ required: "Telefone é obrigatório" }}
                  render={({ field }) => (
                    <Input 
                      {...field} 
                      onChange={(e) => field.onChange(formatPhone(e.target.value))}
                    />
                  )}
                />
              </FormControl>
              <FormMessage>
                {errors.telefone && errors.telefone.message}
              </FormMessage>
            </FormItem>

            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Email*</FormLabel>
              <FormControl>
                <Controller
                  name="emailRepresentante"
                  control={control}
                  rules={{
                    required: "Email é obrigatório",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email inválido"
                    }
                  }}
                  render={({ field }) => <Input type="emailRepresentante" {...field} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
        )}
        {/* NAVEGAÇÃO */}

        <div className="flex justify-between pt-6 border-t">
          {step === 0 ? (
            <Button
              type="button"
              variant="destructive"
              onClick={closeForm}
              className="text-white bg-black"

            >
              Cancelar
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
            >
              Voltar
            </Button>
          )}

          {step < steps.length - 1 ? (
            <Button
              type="button"
              onClick={handleNext}
              disabled={!isValid}
              className="bg-cyan-500 hover:bg-cyan-700"
            >
              Próximo
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-cyan-500 hover:bg-cyan-700"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Salvando...
                </>
              ) : 'Salvar'}
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default FormEmpresa;