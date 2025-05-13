import { FormProvider, useForm, Controller } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";  // Certifique-se de que o caminho esteja correto

interface FormColabProps {
   closeForm: () => void;
}

const FormColab: React.FC<FormColabProps> = ({ closeForm }) => {
   const methods = useForm({
      defaultValues: {
         nome: "",
         cpf: "",
         funcao: "",
         email: "",
         telefone: "",
         nascimento: "",
      },
   });

   const { control, handleSubmit, formState: { errors } } = methods;

   // Expressão regular para validar um email
   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

   const onSubmit = (data: any) => {
      console.log(data);
      closeForm();
   };

   const formatCPF = (value: string) => {
      // Remover tudo que não for número
      const cleaned = value.replace(/\D/g, '');

      // Limitar o CPF a 10 caracteres
      const limited = cleaned.substring(0, 11);  // CPF tem 11 dígitos

      // Adicionar formatação conforme a máscara
      if (limited.length <= 3) {
         return limited;
      } else if (limited.length <= 6) {
         return limited.replace(/(\d{3})(\d{1,3})/, '$1.$2');
      } else if (limited.length <= 9) {
         return limited.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
      } else {
         return limited.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
      }
   };
   const formatPhone = (value: string) => {
      // Remover tudo que não for número
      const cleaned = value.replace(/\D/g, '');

      // Limitar o telefone a 13 caracteres
      const limited = cleaned.substring(0, 13);  // Número tem 13 dígitos (Com o DDI)

      // Adicionar formatação conforme a máscara
      if (limited.length <= 0) {
         return limited;
      } else if (limited.length <= 2) {
         return limited.replace(/(\d{0})(\d{1,2})/, '$1($2');
      } else if (limited.length <= 4) {
         return limited.replace(/(\d{0})(\d{2})(\d{1,2})/, '$1($2) $3');
      } else if (limited.length <= 9) {
         return limited.replace(/(\d{0})(\d{2})(\d{2})(\d{1,5})/, '$1($2) $3 $4');
      } else {
         return limited.replace(/(\d{0})(\d{2})(\d{2})(\d{5})(\d{1,4})/, '$1($2) $3 $4-$5');
      }
   };
   const formatDate = (value: string) => {
      // Remover tudo que não for número
      const cleaned = value.replace(/\D/g, '');

      // Limitar a data a 8 caracteres
      const limited = cleaned.substring(0, 8);  // Data tem 8 dígitos

      // Adicionar formatação conforme a máscara
      if (limited.length <= 2) {
         return limited;
      } else if (limited.length <= 4) {
         return limited.replace(/(\d{2})(\d{1,2})/, '$1/$2');
      } else {
         return limited.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3');
      }
   };

   return (
      <FormProvider {...methods}>
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-wrap w-full gap-4 py-4 px-1 pl-2">
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
                  <FormLabel htmlFor="funcao">Função do colaborador:</FormLabel>
                  <FormControl>
                     <Controller
                        name="funcao"
                        control={control}
                        render={({ field }) => (
                           <select
                              id="funcao"
                              className="text-black mt-1 flex h-9 w-52 rounded-md border border-input bg-background px-2 py-2 text-sm"
                              {...field}
                           >
                              <option value="" disabled>Escolha uma função...</option>
                              <option value="Desenvolvedor Back-end">Desenvolvedor Back-end</option>
                           </select>
                        )}
                     />
                  </FormControl>
                  <FormMessage>{errors.funcao && errors.funcao.message}</FormMessage>
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
                              placeholder="Digite aqui o número"
                              className="w-52 mt-1 text-black"
                              value={field.value}
                              onChange={(e) => field.onChange(formatPhone(e.target.value))}
                           />
                        )}
                     />
                  </FormControl>
                  <FormMessage>{errors.telefone && errors.telefone.message}</FormMessage>
               </FormItem>

               <FormItem className="focus-within:text-cyan-500">
                  <FormLabel htmlFor="nascimento">Data de Nascimento:</FormLabel>
                  <FormControl>
                     <Controller
                        name="nascimento"
                        control={control}
                        render={({ field }) => (
                           <Input
                              id="nascimento"
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
               <Button type="button" onClick={closeForm} variant="destructive" className="w-20">
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

export default FormColab;
