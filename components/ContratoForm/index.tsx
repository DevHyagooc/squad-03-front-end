"use client";

import { useState, useEffect } from "react";
import { FormProvider, useForm, Controller, SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { getColaboradorList } from "@/services/colaboradores"; // ajuste os paths conforme seu projeto
import { getEmpresaList } from "@/services/empresas";
import { Empresa } from "@/app/pageInterna/empresas/page";
import { Colaborador } from "@/app/pageInterna/colaboradores/page";
import { createContrato } from "@/services/contrato";

interface FormContratoProps {
  closeForm: () => void;
  onSubmit?: (contrato: any) => Promise<void>;
  onContratoCreated?: () => void;
}

const steps = ["Informações Básicas", "Datas e Valores", "Termos", "Associações"];

type FormData = {
  numeroContrato: string;
  descricao: string;
  tipoContrato: string;
  statusContrato: string;
  tags: string;
  dataInicio: string;
  dataFim: string;
  valorContrato: number;
  valorTotalPago: number;
  termosDePagamento: string;
  autoRenovacao: boolean;
  diasParaCancelamento: number;
  motivoCancelamento: string;
  empresaId: number;
  responsavelId: string;
};

const FormContrato: React.FC<FormContratoProps> = ({
  closeForm,
  onSubmit,
  onContratoCreated,
}) => {
  const methods = useForm<FormData>({
    defaultValues: {
      numeroContrato: "",
      descricao: "",
      tipoContrato: "",
      statusContrato: "",
      tags: "",
      dataInicio: "",
      dataFim: "",
      valorContrato: 0,
      valorTotalPago: 0,
      termosDePagamento: "",
      autoRenovacao: false,
      diasParaCancelamento: 0,
      motivoCancelamento: "",
      empresaId: 0,
      responsavelId: "",
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

  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);

  // Carrega empresas e colaboradores ao montar
  useEffect(() => {
    (async () => {
      try {
        const empresasList = await getEmpresaList();
        setEmpresas(empresasList);
      } catch (err) {
        console.error("Erro ao buscar empresas:", err);
      }
    })();
    (async () => {
      try {
        const colaboradoresList = await getColaboradorList();
        setColaboradores(colaboradoresList);
      } catch (err) {
        console.error("Erro ao buscar colaboradores:", err);
      }
    })();
  }, []);

  const stepsFields = [
    ["numeroContrato", "descricao", "tipoContrato", "statusContrato", "tags"], // Informações Básicas
    ["dataInicio", "dataFim", "valorContrato", "valorTotalPago"], // Datas e Valores
    ["termosDePagamento", "autoRenovacao", "diasParaCancelamento", "motivoCancelamento"], // Termos
    ["empresaId", "responsavelId"], // Associações
  ];

  const handleNext = async () => {
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

  const handleFormSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);

    // Monta payload conforme solicitado
    const payload = {
      numeroContrato: data.numeroContrato,
      descricao: data.descricao,
      dataInicio: data.dataInicio,
      dataFim: data.dataFim,
      termosDePagamento: data.termosDePagamento,
      valorTotalPago: data.valorTotalPago,
      valorContrato: data.valorContrato,
      autoRenovacao: data.autoRenovacao,
      diasParaCancelamento: data.diasParaCancelamento,
      motivoCancelamento: data.motivoCancelamento,
      statusContrato: "ATIVO",
      tipoContrato: data.tipoContrato,
      tags: data.tags,
      empresaId: data.empresaId,
      responsavelId: data.responsavelId,
    };

    try {
      // Aqui você chama diretamente sua função de API
      const contratoCriado = await createContrato(payload);

      // Se tiver callbacks para notificar quem chamou:
      if (onSubmit) {
        onSubmit(contratoCriado);
      }
      if (onContratoCreated) {
        onContratoCreated(contratoCriado);
      }

      closeForm();
    } catch (error) {
      console.error("Erro ao criar contrato:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{steps[step]}</h2>
          <span className="text-sm text-gray-500">
            Passo {step + 1} de {steps.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-cyan-500 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* STEP 3: Associações */}
        {step === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Empresa*</FormLabel>
              <FormControl>
                <Controller
                  name="empresaId"
                  control={control}
                  rules={{ required: "Empresa é obrigatória" }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full mt-1 text-black h-9 rounded-md border border-input bg-background px-2 text-sm"
                    >
                      <option value={0} disabled>
                        Selecione a empresa...
                      </option>
                      {empresas.map((emp) => (
                        <option key={emp.idOrgao} value={emp.idOrgao}>
                          {emp.nomeFantasia}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Colaborador Responsável*</FormLabel>
              <FormControl>
                <Controller
                  name="responsavelId"
                  control={control}
                  rules={{ required: "Responsável é obrigatório" }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full mt-1 text-black h-9 rounded-md border border-input bg-background px-2 text-sm"
                    >
                      <option value="" disabled>
                        Selecione o colaborador responsável...
                      </option>
                      {colaboradores.map((col) => (
                        <option key={col.idFuncionario} value={col.idFuncionario}>
                          {col.nome} – {col.cargo}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
        )}


        {/* STEP 0: Informações Básicas */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Número do Contrato</FormLabel>
              <FormControl>
                <Controller
                  name="numeroContrato"
                  control={control}
                  // rules={{ required: "Número do contrato é obrigatório" }}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Descrição*</FormLabel>
              <FormControl>
                <Controller
                  name="descricao"
                  control={control}
                  rules={{ required: "Descrição é obrigatória" }}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Tipo de Contrato*</FormLabel>
              <FormControl>
                <Controller
                  name="tipoContrato"
                  control={control}
                  rules={{ required: "Tipo de contrato é obrigatório" }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full mt-1 text-black h-9 rounded-md border border-input bg-background px-2 text-sm"
                    >
                      <option value="">Selecione...</option>
                      <option value="Prestação de Serviços">Prestação de Serviços</option>
                      <option value="Fornecimento">Fornecimento</option>
                      <option value="Manutenção">Locação</option>
                      <option value="Consultoria">Consultoria</option>
                      {/* adicione outros tipos conforme necessário */}
                    </select>
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            {/* <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Status do Contrato*</FormLabel>
              <FormControl>
                <Controller
                  name="statusContrato"
                  control={control}
                  rules={{ required: "Status do contrato é obrigatório" }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full mt-1 text-black h-9 rounded-md border border-input bg-background px-2 text-sm"
                    >
                      <option value="">Selecione...</option>
                      <option value="ATIVO">ATIVO</option>
                      <option value="INATIVO">INATIVO</option>
                      <option value="CANCELADO">CANCELADO</option>
                    </select>
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem> */}

            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Tags (separadas por vírgula)*</FormLabel>
              <FormControl>
                <Controller
                  name="tags"
                  control={control}
                  rules={{ required: "Tags são obrigatórias" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="ex: TI, Terceirização, Suporte"
                    />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
        )}

        {/* STEP 1: Datas e Valores */}
        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Data Início*</FormLabel>
              <FormControl>
                <Controller
                  name="dataInicio"
                  control={control}
                  rules={{ required: "Data de início é obrigatória" }}
                  render={({ field }) => (
                    <Input type="date" {...field} />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Data Fim*</FormLabel>
              <FormControl>
                <Controller
                  name="dataFim"
                  control={control}
                  rules={{ required: "Data de fim é obrigatória" }}
                  render={({ field }) => <Input type="date" {...field} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Valor do Contrato*</FormLabel>
              <FormControl>
                <Controller
                  name="valorContrato"
                  control={control}
                  rules={{
                    required: "Valor do contrato é obrigatório",
                    min: { value: 0, message: "Valor deve ser ≥ 0" },
                  }}
                  render={({ field }) => (
                    <Input
                      type="number"
                      {...field}
                      step="0.01"
                      placeholder="0.00"
                    />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            {/* <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Valor Total Pago*</FormLabel>
              <FormControl>
                <Controller
                  name="valorTotalPago"
                  control={control}
                  rules={{
                    required: "Valor total pago é obrigatório",
                    min: { value: 0, message: "Valor deve ser ≥ 0" },
                  }}
                  render={({ field }) => (
                    <Input
                      type="number"
                      {...field}
                      step="0.01"
                      placeholder="0.00"
                    />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem> */}
          </div>
        )}

        {/* STEP 2: Termos */}
        {step === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Termos de Pagamento*</FormLabel>
              <FormControl>
                <Controller
                  name="termosDePagamento"
                  control={control}
                  rules={{ required: "Termos de pagamento são obrigatórios" }}
                  render={({ field }) => <Input {...field} placeholder="O pagamento foi acordado..."/>}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem className="px-2 flex items-center space-x-2">
              <Controller
                name="autoRenovacao"
                control={control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="w-4 h-4"
                    id="autoRenovacao"
                  />
                )}
              />
              <FormLabel htmlFor="autoRenovacao">
                Auto Renovação
              </FormLabel>
            </FormItem>

            <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Dias para Cancelamento*</FormLabel>
              <FormControl>
                <Controller
                  name="diasParaCancelamento"
                  control={control}
                  rules={{
                    required: "Dias para cancelamento é obrigatório",
                    min: { value: 0, message: "Deve ser ≥ 0" },
                  }}
                  render={({ field }) => (
                    <Input
                      type="number"
                      {...field}
                      placeholder="0"
                    />
                  )}
                />
              </FormControl>
              <p className="text-xs text-gray-500 mt-1">
                Informe quantos dias de antecedência o cliente precisa solicitar o cancelamento.
              </p>
              <FormMessage />
            </FormItem>

            {/* <FormItem className="px-2 focus-within:text-cyan-500">
              <FormLabel>Motivo Cancelamento*</FormLabel>
              <FormControl>
                <Controller
                  name="motivoCancelamento"
                  control={control}
                  rules={{ required: "Motivo do cancelamento é obrigatório" }}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem> */}
          </div>
        )}

        {/* Navegação dos Steps */}
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
              disabled={isSubmitting || !isValid}
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
