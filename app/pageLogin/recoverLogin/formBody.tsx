"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import FormHeader from "./formHeader";

export default function FormBody() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    // Comentando para que não seja redirecionado para nenhuma outra página
    // router.push("/pageLogin/recoverPassword");
  };

  return (
    <div className="w-full px-12">
      <div className="pb-4">
        <FormHeader />
      </div>

      <div className="pb-6">
        <h4>Informe seu email para seguirmos com a redefinição da senha.</h4>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit(onSubmit)();
          }
        }}
      >
        <div className="pb-6 w-full">
          <label htmlFor="email" className="text-[13px]">Email</label>
          <div className="pt-1">
            <input
              id="email"
              type="email"
              className="w-full border border-stone-400 rounded-lg h-10 text-[15px] pl-2"
              {...register("email", { required: true })}
              aria-invalid={errors.email ? "true" : "false"}
              placeholder="Digite aqui o email..."
            />
          </div>

          <div className="text-sm text-red-600/75 dark:text-sky-400/75 pt-1">
            {errors?.email?.type === "required" && (
              <p className="error-message">Email é obrigatório</p>
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="justify-self-center shadow-lg bg-stone-700 opacity-100 rounded-xl w-full mt-4 mb-2 pt-2 pb-2 pl-4 pr-4 text-sm text-white"
          >
            Enviar
          </button>
        </div>
      </form>

      <div className="text-shadow-lg justify-self-center text-sm text-stone-600">
        <Link href="/pageLogin/login">Voltar</Link>
      </div>
    </div>
  );
}
