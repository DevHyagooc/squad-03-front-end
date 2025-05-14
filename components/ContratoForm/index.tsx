import { useForm, Controller, FormProvider } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";  // Certifique-se de que o caminho está correto
import { formatDate } from "@/lib/formatData";

const FormContrato: React.FC<{ closeForm: () => void }> = ({ closeForm }) => {
  const methods = useForm({
    defaultValues: {
      prazo: "",
      valorContrato: "",
      orgaoContratante: "",
      status: "Ativo",
      criado: "",
      representante: "",
      responsavel: ""
    }
  });

  const { control, handleSubmit, formState: { errors } } = methods;

  const onSubmit = (data: any) => {
    console.log(data);
    closeForm();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-wrap w-full gap-4 py-3 px-1 pl-2">

          {/* Prazo do contrato */}
          <FormItem className="px-2 focus-within:text-cyan-500">
            <FormLabel htmlFor="prazo">Prazo do contrato:</FormLabel>
            <FormControl>
              <Controller
                name="prazo"
                control={control}
                render={({ field }) => (
                  <Input
                    id="prazo"
                    type="text"
                    placeholder="DD/MM/AAAA"
                    className="w-52 mt-1 text-black"
                    value={field.value}
                    onChange={(e) => field.onChange(formatDate(e.target.value))}
                  />
                )}
              />
            </FormControl>
            <FormMessage>{errors.prazo && errors.prazo.message}</FormMessage>
          </FormItem>

          {/* Valor do contrato */}
          <FormItem className="px-2 focus-within:text-cyan-500">
            <FormLabel htmlFor="valorContrato">Valor do contrato:</FormLabel>
            <FormControl>
              <Controller
                name="valorContrato"
                control={control}
                render={({ field }) => (
                  <Input
                    id="valorContrato"
                    type="text"
                    className="w-52 mt-1 text-black"
                    {...field}
                  />
                )}
              />
            </FormControl>
            <FormMessage>{errors.valorContrato && errors.valorContrato.message}</FormMessage>
          </FormItem>

          {/* Orgão Contratante */}
          <FormItem className="px-2 focus-within:text-cyan-500">
            <FormLabel htmlFor="orgaoContratante">Orgão Contratante:</FormLabel>
            <FormControl>
              <Controller
                name="orgaoContratante"
                control={control}
                render={({ field }) => (
                  <Input
                    id="orgaoContratante"
                    type="text"
                    className="w-52 mt-1 text-black"
                    {...field}
                  />
                )}
              />
            </FormControl>
            <FormMessage>{errors.orgaoContratante && errors.orgaoContratante.message}</FormMessage>
          </FormItem>

          {/* Status */}
          <FormItem className="px-2 focus-within:text-cyan-500">
            <FormLabel htmlFor="status">Status:</FormLabel>
            <FormControl>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <select
                    id="status"
                    {...field}
                    className="w-52 mt-1 text-black flex h-9 rounded-md border border-input bg-background px-2 py-2 text-sm"
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Cancelado">Cancelado</option>
                    <option value="Encerrado">Encerrado</option>
                  </select>
                )}
              />
            </FormControl>
            <FormMessage>{errors.status && errors.status.message}</FormMessage>
          </FormItem>

          {/* Criado em */}
          <FormItem className="px-2 focus-within:text-cyan-500">
            <FormLabel htmlFor="criado">Criado em:</FormLabel>
            <FormControl>
              <Controller
                name="criado"
                control={control}
                render={({ field }) => (
                  <Input
                    id="criado"
                    type="text"
                    placeholder="DD/MM/AAAA"
                    className="w-52 mt-1 text-black"
                    value={field.value}
                    onChange={(e) => field.onChange(formatDate(e.target.value))}
                  />
                )}
              />
            </FormControl>
            <FormMessage>{errors.criado && errors.criado.message}</FormMessage>
          </FormItem>

          {/* Representante */}
          <FormItem className="px-2 focus-within:text-cyan-500">
            <FormLabel htmlFor="representante">Representante:</FormLabel>
            <FormControl>
              <Controller
                name="representante"
                control={control}
                render={({ field }) => (
                  <Input
                    id="representante"
                    type="text"
                    className="w-52 mt-1 text-black"
                    {...field}
                  />
                )}
              />
            </FormControl>
            <FormMessage>{errors.representante && errors.representante.message}</FormMessage>
          </FormItem>

          {/* Responsável */}
          <FormItem className="px-2 focus-within:text-cyan-500">
            <FormLabel htmlFor="responsavel">Responsável pelo contrato:</FormLabel>
            <FormControl>
              <Controller
                name="responsavel"
                control={control}
                render={({ field }) => (
                  <Input
                    id="responsavel"
                    type="text"
                    className="w-52 mt-1 text-black"
                    {...field}
                  />
                )}
              />
            </FormControl>
            <FormMessage>{errors.responsavel && errors.responsavel.message}</FormMessage>
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

export default FormContrato;
