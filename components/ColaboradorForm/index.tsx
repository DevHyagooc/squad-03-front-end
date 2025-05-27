import { FormProvider, useForm, Controller, SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";  // Certifique-se de que o caminho esteja correto
import { formatCPF, formatPhone, formatDate } from "@/lib/formatData";
import { postColaborador } from "@/services/colaboradores";
import { formatPhoneBr } from "@/lib/formatePhoneBr";

interface FormColabProps {
   closeForm: () => void;
   onSubmit: (colaborador: any) => void;
}

const FormColab: React.FC<FormColabProps> = ({ closeForm, onSubmit }) => {
   const methods = useForm({
      defaultValues: {
         nome: "",
         cpf: "",
         cargo: "",
         email: "",
         telefone: "",
         dataNascimento: "",
      },
   });

   const { control, handleSubmit, formState: { errors } } = methods;

   // Expressão regular para validar um email
   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

   const handleFormSubmit: SubmitHandler<any> = (colaborador) => {
      postColaborador(colaborador)
      onSubmit(colaborador);
      closeForm();
   };

   return (
      <FormProvider {...methods}>
         <form onSubmit={methods.handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="flex flex-wrap w-full gap-4 pb-3 pt-1 px-1 pl-2">
               <FormItem className="focus-within:text-cyan-500"> {/* Garantindo que focus-within esteja aqui */}
                  <FormLabel htmlFor="nome">Nome do Colaborador:</FormLabel>
                  <FormControl>
                     <Controller
                        name="nome"
                        control={control}
                        rules={{ required: "Nome é obrigatório" }}
                        render={({ field }) => (
                           <Input
                              id="nome"
                              type="text"
                              placeholder="Nome Completo..."
                              className="w-52 mt-1 text-black"
                              {...field}
                           />
                        )}
                     />
                  </FormControl>
                  <FormMessage>{errors.nome && errors.nome.message}</FormMessage>
               </FormItem>

               <FormItem className="focus-within:text-cyan-500">
                  <FormLabel htmlFor="cpf">CPF:</FormLabel>
                  <FormControl>
                     <Controller
                        name="cpf"
                        control={control}
                        rules={{ required: "CPF é obrigatório" }}
                        render={({ field }) => (
                           <Input
                              id="cpf"
                              type="text"
                              placeholder="xxx.xxx.xxx-xx"
                              className="w-52 mt-1 text-black"
                              value={field.value}
                              onChange={(e) => field.onChange(formatCPF(e.target.value))}
                           />
                        )}
                     />
                  </FormControl>
                  <FormMessage>{errors.cpf && errors.cpf.message}</FormMessage>
               </FormItem>

               <FormItem className="focus-within:text-cyan-500">
                  <FormLabel htmlFor="cargo">Cargo do colaborador:</FormLabel>
                  <FormControl>
                     <Controller
                        name="cargo"
                        control={control}
                        render={({ field }) => (
                           <select
                              id="cargo"
                              className="text-black mt-1 flex h-9 w-52 rounded-md border border-input bg-background px-2 py-2 text-sm"
                              {...field}
                           >
                              <option value="" disabled>Escolha um cargo...</option>
                              <option value="Desenvolvedor Back-end">Desenvolvedor Back-end</option>
                           </select>
                        )}
                     />
                  </FormControl>
                  <FormMessage>{errors.cargo && errors.cargo.message}</FormMessage>
               </FormItem>

               <FormItem className="focus-within:text-cyan-500">
                  <FormLabel htmlFor="email">Email:</FormLabel>
                  <FormControl>
                     <Controller
                        name="email"
                        control={control}
                        rules={{
                           required: "Email é obrigatório",
                           pattern: {
                              value: emailRegex,
                              message: "Formato de email inválido"
                           }
                        }}
                        render={({ field }) => (
                           <Input
                              id="email"
                              type="text"
                              placeholder="Digite aqui o email"
                              className="w-52 mt-1 text-black"
                              {...field}
                           />
                        )}
                     />
                  </FormControl>
                  <FormMessage>{errors.email && errors.email.message}</FormMessage>
               </FormItem>

               <FormItem className="focus-within:text-cyan-500">
                  <FormLabel htmlFor="telefone">Telefone:</FormLabel>
                  <FormControl>
                     <Controller
                        name="telefone"
                        control={control}
                        rules={{ required: "Telefone é obrigatório" }}
                        render={({ field }) => (
                           <Input
                              id="telefone"
                              type="text"
                              // passa o valor formatado ou string vazia
                              value={field.value || ""}
                              // no onChange: formata e dispara o hook
                              onChange={e => field.onChange(formatPhoneBr(e.target.value))}
                              // propaga o blur para o touched state
                              onBlur={field.onBlur}
                              placeholder="(xx) x xxxx-xxxx"
                              className="w-52 mt-1 text-black"
                           />
                        )}
                     />
                  </FormControl>
                  <FormMessage>{errors.telefone && errors.telefone.message}</FormMessage>
               </FormItem>

               <FormItem className="focus-within:text-cyan-500">
                  <FormLabel htmlFor="dataNascimento">Data de Nascimento:</FormLabel>
                  <FormControl>
                     <Controller
                        name="dataNascimento"
                        control={control}
                        render={({ field }) => (
                           <Input
                              id="dataNascimento"
                              type="text"
                              placeholder="dd/mm/aaaa"
                              className="w-52 mt-1 text-black"
                              value={field.value}
                              onChange={(e) => field.onChange(formatDate(e.target.value))}
                           />
                        )}
                     />
                  </FormControl>
               </FormItem>
            </div>

            <div className="flex justify-end gap-4">
               <Button type="button" onClick={closeForm} variant="destructive" className="text-white bg-black">
                  Cancelar
               </Button>
               <Button type="submit" className="bg-cyan-500 hover:bg-cyan-700">
                  Salvar
               </Button>
            </div>
         </form>
      </FormProvider>
   );
};

export default FormColab;