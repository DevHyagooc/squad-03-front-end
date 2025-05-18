import { useState } from "react";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { getLocal } from "@/services/cep";  // Verifique se o caminho está correto
import { formatCEP, formatCNPJ, formatCPF } from "@/lib/formatData";

const steps = ["Empresa", "Endereço", "Contato", "Representante", "Revisão"];

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
      inscricaoMunicipal: "",
      representanteNome: "",
      representanteCpf: "",
      representanteTelefone: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = methods;

  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleCepChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, '');
    setValue("cep", formatCEP(value));

    if (value.length === 8) {
      try {
        const localData = await getLocal(value);
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
    console.log("Dados enviados:", data);
    closeForm();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-xl font-bold">{steps[step]}</h2>

        {/* Step 0: Empresa */}
        {step === 0 && (
          <div className="flex flex-wrap gap-4">
            <FormItem>
              <FormLabel>CNPJ:</FormLabel>
              <FormControl>
                <Controller
                  name="cnpj"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="xx.xxx.xxx/xxxx-xx"
                      value={field.value}
                      onChange={(e) => field.onChange(formatCNPJ(e.target.value))}
                    />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Razão Social:</FormLabel>
              <FormControl>
                <Controller
                  name="razaoSocial"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Nome Fantasia:</FormLabel>
              <FormControl>
                <Controller
                  name="nomeFantasia"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
        )}

        {/* Step 1: Endereço */}
        {step === 1 && (
          <div className="flex flex-wrap gap-4">
            <FormItem>
              <FormLabel>CEP:</FormLabel>
              <FormControl>
                <Controller
                  name="cep"
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="xxxxx-xxx"
                      value={field.value}
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

            <FormItem>
              <FormLabel>Estado:</FormLabel>
              <FormControl>
                <Controller
                  name="estado"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Município:</FormLabel>
              <FormControl>
                <Controller
                  name="municipio"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormLabel>Bairro:</FormLabel>
              <FormControl>
                <Controller
                  name="bairro"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Logradouro:</FormLabel>
              <FormControl>
                <Controller
                  name="logradouro"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Número:</FormLabel>
              <FormControl>
                <Controller
                  name="numero"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
        )}

        {/* Step 2: Contato */}
        {step === 2 && (
          <div className="flex flex-wrap gap-4">
            <FormItem>
              <FormLabel>Email:</FormLabel>
              <FormControl>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => <Input type="email" {...field} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Inscrição Municipal:</FormLabel>
              <FormControl>
                <Controller
                  name="inscricaoMunicipal"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
        )}

        {/* Step 3: Representante */}
        {step === 3 && (
          <div className="flex flex-wrap gap-4">
            <FormItem>
              <FormLabel>Nome do Representante:</FormLabel>
              <FormControl>
                <Controller
                  name="representanteNome"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>CPF:</FormLabel>
              <FormControl>
                <Controller
                  name="representanteCpf"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Telefone:</FormLabel>
              <FormControl>
                <Controller
                  name="representanteTelefone"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
        )}

        {/* Step 4: Revisão */}
        {step === 4 && (
          <div className="text-sm bg-slate-100 p-4 rounded">
            <pre>{JSON.stringify(getValues(), null, 2)}</pre>
          </div>
        )}

        {/* Navegação */}
        <div className="flex justify-between pt-6">
          <Button type="button" onClick={handleBack} disabled={step === 0}>
            Voltar
          </Button>

          {step < steps.length - 1 ? (
            <Button type="button" onClick={handleNext}>
              Próximo
            </Button>
          ) : (
            <Button type="submit">Enviar</Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default FormEmpresa;
