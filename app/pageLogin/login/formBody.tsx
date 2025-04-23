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
    router.push("/pageInterna");
  };

  return (
    <div className="w-full px-12">
      <div className="pb-8">
        <FormHeader />
      </div>

      <div className="pb-6 w-full">
        <label className="text-[13px]" >Usuário</label>
        <div className="pt-1">
          <input
            type="email"
            className="w-full border border-stone-400 rounded-lg h-10 text-[15px] pl-2"
            {...register("email", { required: true })}
            aria-invalid={errors.email ? "true" : "false"}
            placeholder="Digite o seu email..."
          />
        </div>

        <div className="text-xs text-red-600/75 dark:text-sky-400/75 pt-1">
          {errors?.email?.type === "required" && (
            <p className="error-message">Usuário é obrigatório</p>
          )}
        </div>
      </div>

      <div className="pb-6">
        <label className="text-[13px]">Senha</label>
        <div className="pt-1">
          <input
            className="w-full border border-stone-400 rounded-lg h-10 text-[15px] pl-2"
            type="password"
            {...register("senha", { required: true, minLength: 7 })}
            placeholder="*******"
          />
        </div>
        <div className="text-xs text-red-600/75 dark:text-sky-400/75 pt-1">
          {errors?.senha?.type === "minLength" && (
            <p className="error-message">No mínimo 7 caracteres</p>
          )}
        </div>

        <div className="text-xs text-red-600/75 dark:text-sky-400/75 pt-1">
          {errors?.senha?.type === "required" && (
            <p className="error-message">Senha é obrigatoria</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between px-4 text-shadow-lg text-sm text-stone-800">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          Lembrar senha
        </label>

        <Link
          href="/pageLogin/recoverLogin"
          className="text-cyan-500 ml-4 hover:underline"
        >
          Esqueceu a senha?
        </Link>
      </div>


      <div >
        <button
          className=" justify-self-center shadow-lg bg-stone-700 opacity-100 rounded-xl w-full mt-4 mb-2 pt-2 pb-2 pl-4 pr-4 text-sm text-white"
          onClick={() => {
            handleSubmit(onSubmit)();
          }}
        >
          Entrar
        </button>
      </div>

      <div className="text-shadow-lg justify-self-center text-sm text-stone-600">
      </div>
    </div>
  );
}
