// FormContrato.tsx
import { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input";
import { formatCPF, formatDate } from "@/lib/formatData";
import { Switch } from "@/components/ui/switch"

const steps = ["Contrato", "Valores"];

type ContratoFormData = {
  empresaId: string;
  descricao: string
  dataInicio: string;
  dataFim: string;
  termosDePagamento: string;
  tipoContrato: string;
  valorContrato: number;
  responsavelId: string;
  cpfRepresentante: string;
  telefoneEmpresa: string;
  responsavel: string;
  autoRenovacao: boolean;
  valorTotalPago: number;
  diasParaCancelamento: number;
  motivoCancelamento: string;
};

const FormContrato = ({ closeForm }: { closeForm: () => void }) => {
  const methods = useForm<ContratoFormData>({
    defaultValues: {
      empresaId: "",
      descricao: "",
      dataInicio: "",
      dataFim: "",
      termosDePagamento:"",
      tipoContrato: "",
      valorContrato: "",
      responsavelId: "",
      autoRenovacao: "",
      valorTotalPago:"",
      diasParaCancelamento:"",
      motivoCancelamento:"",
      responsavelId:"",

    }
  });

  const { control, handleSubmit, watch, trigger, formState: { errors } } = methods;

  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stepsFields = [
    ["empresaId","descricao","dataInicio", "dataFim", "tipoContrato", "responsavelId"], // Step 0
    ["termosDePagamento", "valorTotalPago","diasParaCancelamento","motivoCancelamento"," valorContrato","autoRenovacao"], // Step 1
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
            <FormItem className="px-2 focus-within:text-cyan-500" >
              <FormLabel>Empresa:*</FormLabel>
              <FormControl>
                <Controller
                  name="empresaId"
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
          <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Descrição*:</FormLabel>
              <FormControl>
                <Controller
                  name="descricao"
                  control={control}
                  rules={{ required: "Descrição é obrigatória" }}
                  render={({ field }) => (
                    <Input
                      {...field}/>
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>     
            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Data de Início*:</FormLabel>
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

            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Data Final*:</FormLabel>
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

            <FormItem className="px-2 focus-within:text-cyan-500" >
              <FormLabel>Tipo de Contrato*:</FormLabel>
              <FormControl>
                <Controller
                  name="tipoContrato"
                  control={control}
                  rules={{ required: "Tipo de contrato é obrigatório" }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full text-black border rounded-md h-9 px-2"
                    >
                      <option value="">Selecione...</option>
                      <option value="Desenvolvimento de Software">Desenvolvimento de Software</option>
                      <option value="Manutenção de Software">Manutenção de Software</option>
                      <option value= "fornecimento de software">Fornecimento de Software</option>
                    </select>
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Responsável pelo Contrato:*</FormLabel>
              <FormControl>
                <Controller
                  name="respresentantes"
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
            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Termos de Pagamento:</FormLabel>
              <FormControl>
                <Controller
                  name="termosDePagamento"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Total Pago*:</FormLabel>
              <FormControl>
                <Controller
                  name="valorTotalPago"
                  control={control}
                  rules={{ required: "Valor total pago é obrigatório" }}
                  render={({ field }) => (
                    <Input {...field}  />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Dias para o Cancelamento*:</FormLabel>
              <FormControl>
                <Controller
                  name="diasParaCancelamento"
                  control={control}
                  rules={{ required: "Valor total pago é obrigatório" }}
                  render={({ field }) => (
                    <Input {...field}  />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

                        <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Motivo para o Cancelamento:</FormLabel>
              <FormControl>
                <Controller
                  name="motivoCancelamento"
                  control={control}
                  render={({ field }) => (
                    <Input {...field}  />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

             <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Valor Contrato*:</FormLabel>
              <FormControl>
                <Controller
                  name="valorContrato"
                  control={control}
                  rules={{ required: "Valor total pago é obrigatório" }}
                  render={({ field }) => (
                    <Input {...field}  />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem className="px-2 focus-within:text-cyan-500" label="Auto Renovação">
              <FormLabel >Auto Renovação</FormLabel>
              <FormControl>
              <Controller
              name="autoRenovacao"
              control={control}
              defaultValue={false}
              render={({ field }) => (
              <Switch className="flex bg-cyan-500 items-right gap-4"
              checked={field.value}
              onCheckedChange={field.onChange} 
              /> )}
               
        />
            </FormControl>
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
