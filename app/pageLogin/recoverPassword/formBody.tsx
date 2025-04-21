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
    router.push("");
  };

  return (
    <div>
      <div className="justify-items-center pb-8">
        <FormHeader />
      </div>

      <div className="pb-5">
        <label>Digite o codigo de recuperação</label>

        <div className=" shadow-lg border-2 border-stone-500 rounded-md">
          <input
            className="w-full"
            type="password"
            {...register("codigo", { required: true, minLength: 7 })}
          />
        </div>

        <div className="text-sm text-red-600/75 dark:text-sky-400/75 pt-1">
          {errors?.codigo?.type === "required" && (
            <p className="error-message">Obrirgatório</p>
          )}
        </div>
      </div>

      <div className="pb-5">
        <label>Digite a nova senha</label>

        <div className=" shadow-lg border-2 border-stone-500 rounded-md">
          <input
            className="w-full"
            type="password"
            {...register("novaSenha", { required: true, minLength: 7 })}
          />
        </div>

        <div className="text-sm text-red-600/75 dark:text-sky-400/75 pt-1">
          {errors?.novaSenha?.type === "required" && (
            <p className="error-message">Obrirgatório</p>
          )}
        </div>
      </div>

      <div className="pb-5">
        <label>Confirme a senha</label>

        <div className=" shadow-lg border-2 border-stone-500 rounded-md">
          <input
            className="w-full"
            type="password"
            {...register("confirmeSenha", { required: true, minLength: 7 })}
          />
        </div>

        <div className="text-sm text-red-600/75 dark:text-sky-400/75 pt-1">
          {errors?.confirmeSenha?.type === "required" && (
            <p className="error-message">Obrirgatório</p>
          )}
        </div>
      </div>

      <div>
        <button
          className=" justify-self-center shadow-lg bg-stone-700 opacity-100 rounded-xl w-full mt-4 mb-2 pt-2 pb-2 pl-4 pr-4 text-sm text-white"
          onClick={() => {
            handleSubmit(onSubmit)();
          }}
        >
          Salvar
        </button>
      </div>

      <div className="text-shadow-lg justify-self-center text-sm font-serif text-stone-600">
        <Link href="/pageLogin/login">Voltar</Link>
      </div>
    </div>
  );
}
