// FormContrato.tsx
import { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input";
import { formatCPF, formatDate } from "@/lib/formatData";

const steps = ["Contrato", "Representante", "Contato", "Responsável"];

type ContratoFormData = {
  empresa: string;
  descricao: string
  dataInicio: string;
  dataFim: string;
  tipoContrato: string;
  valorContrato: string;
  representante: string;
  cpfRepresentante: string;
  telefoneEmpresa: string;
  responsavel: string;
};

const FormContrato = ({ closeForm }: { closeForm: () => void }) => {
  const methods = useForm<ContratoFormData>({
    defaultValues: {
      empresa: "",
      descricao: "",
      dataInicio: "",
      dataFim: "",
      tipoContrato: "",
      valorContrato: "",
      representante: "",
      cpfRepresentante: "",
      telefoneEmpresa: "",
      responsavel: "",
    }
  });

  const { control, handleSubmit, watch, trigger, formState: { errors } } = methods;

  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stepsFields = [
    ["empresa","Descricao","dataInicio", "dataFim", "tipoContrato", "valorContrato"], // Step 0
    ["representante", "cpfRepresentante"], // Step 1
    ["telefoneEmpresa"], // Step 2
    ["responsavel"], // Step 3
  ];

  const onSubmit = (data: ContratoFormData) => {
    console.log(data);
    closeForm();
  };

  const handleNext = async () => {
    const fields = stepsFields[step];
    const valid = await trigger(fields as any);
    if (valid) setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{steps[step]}</h2>
          <span className="text-sm text-gray-500">Passo {step + 1} de {steps.length}</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-cyan-500 h-2.5 rounded-full"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>

        {step === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Empresa - dropdown mockado */}
            <FormItem>
              <FormLabel>Empresa*</FormLabel>
              <FormControl>
                <Controller
                  name="empresa"
                  control={control}
                  rules={{ required: "Empresa é obrigatória" }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full text-black border rounded-md h-9 px-2"
                    >
                      <option value="">Selecione...</option>
                      <option value="Empresa A">Empresa A</option>
                      <option value="Empresa B">Empresa B</option>
                    </select>
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          <FormItem>
              <FormLabel>Descrição*</FormLabel>
              <FormControl>
                <Controller
                  name="descricao"
                  control={control}
                  rules={{ required: "Descrição é obrigatória" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      onChange={(e) => field.onChange(formatDate(e.target.value))}
                    />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>     
            <FormItem>
              <FormLabel>Data de Início*</FormLabel>
              <FormControl>
                <Controller
                  name="dataInicio"
                  control={control}
                  rules={{ required: "Data de início é obrigatória" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="DD/MM/AAAA"
                      onChange={(e) => field.onChange(formatDate(e.target.value))}
                    />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Data Final*</FormLabel>
              <FormControl>
                <Controller
                  name="dataFim"
                  control={control}
                  rules={{ required: "Data final é obrigatória" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="DD/MM/AAAA"
                      onChange={(e) => field.onChange(formatDate(e.target.value))}
                    />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Tipo de Contrato*</FormLabel>
              <FormControl>
                <Controller
                  name="tipoContrato"
                  control={control}
                  rules={{ required: "Tipo de contrato é obrigatório" }}
                  render={({ field }) => (
                    <Input {...field} />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Valor*</FormLabel>
              <FormControl>
                <Controller
                  name="valorContrato"
                  control={control}
                  rules={{ required: "Valor é obrigatório" }}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
        )}

        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormItem>
              <FormLabel>Representante*</FormLabel>
              <FormControl>
                <Controller
                  name="representante"
                  control={control}
                  rules={{ required: "Nome do representante é obrigatório" }}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>CPF do Representante*</FormLabel>
              <FormControl>
                <Controller
                  name="cpfRepresentante"
                  control={control}
                  rules={{ required: "CPF é obrigatório" }}
                  render={({ field }) => (
                    <Input {...field} onChange={(e) => field.onChange(formatCPF(e.target.value))} />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
        )}

        {step === 2 && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
    <FormItem className="px-2 focus-within:text-cyan-500 w-full">
      <FormLabel>Telefone*</FormLabel>
      <FormControl>
        <Controller
          name="telefoneEmpresa"
          control={control}
          rules={{ required: "Telefone é obrigatório" }}
          render={({ field }) => (
            <div className="w-full mt-1">
              <PhoneInput
                international
                defaultCountry="BR"
                value={field.value || ""}
                onChange={field.onChange}
                className="w-full h-auto border border-input rounded-md px-3 py-1 text-sm text-black"
              />
            </div>
          )}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  </div>
)}


        {step === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormItem>
              <FormLabel>Responsável pelo Contrato*</FormLabel>
              <FormControl>
                <Controller
                  name="responsavel"
                  control={control}
                  rules={{ required: "Responsável é obrigatório" }}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
        )}

        {/* NAVEGAÇÃO */}
        <div className="flex justify-between pt-6 border-t">
          {step === 0 ? (
            <Button type="button" variant="destructive" onClick={closeForm}>
              Cancelar
            </Button>
          ) : (
            <Button type="button" variant="outline" onClick={handleBack}>
              Voltar
            </Button>
          )}

          {step < steps.length - 1 ? (
            <Button type="button" onClick={handleNext}>
              Próximo
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}
            className="bg-cyan-500 hover:bg-cyan-700"
            >
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default FormContrato;
