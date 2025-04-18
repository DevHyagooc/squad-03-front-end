"use client";

import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form";

export default function FormBody() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    router.push('/pageInterna')
  };

  return (
    <div>

      <div className="pb-4">
        <label>Email</label>

        <div className="shadow-lg border-2 border-stone-500 rounded-md">
          <input
            type="email"
            className={errors?.email && "input-error"}
            {...register("email", { required: true })}
          />
        </div>

        <div className="text-sm text-red-600/75 dark:text-sky-400/75 pt-1">
          {errors?.email?.type === "required" && (
            <p className="error-message">Email é obrigatório</p>
          )}
        </div>

      </div>

      <div className="pb-5">
        <label>Senha</label>

        <div className="shadow-lg border-2 border-stone-500 rounded-md">
          <input
            type="password"
            {...register("senha", { required: true, minLength: 7 })}
          />
        </div>

        <div className="text-sm text-red-600/75 dark:text-sky-400/75 pt-1">
          {errors?.senha?.type === "minLength" && (
            <p className="error-message">No mínimo 7 caracteres</p>
          )}
        </div>

        <div className="text-sm text-red-600/75 dark:text-sky-400/75 pt-1">
          {errors?.senha?.type === "required" && (
            <p className="error-message">Senha é obrigatoria</p>
          )}
        </div>

      </div>

      <div className="justify-self-center pb-2">
        <button
        className=" shadow-lg bg-stone-700 opacity-100 rounded-md  pt-2 pb-2 pl-4 pr-4 text-sm text-white"
          onClick={() => {
            handleSubmit(onSubmit)();
          }}
        >
          Logar
        </button>
      </div>

<<<<<<< HEAD:app/login/formBody.tsx
      <div className="text-shadow-lg justify-self-center text-sm font-serif text-stone-600">
        <Link href="/registerLogin">Criar Conta</Link>
=======
      <div className="justify-self-center text-sm text-blue-600/100 dark:text-sky-400/100">
        <Link href="/pageLogin/registerLogin">Criar Conta</Link>
>>>>>>> 84c75c1cbc7ae1849e180badb66226758544f42a:app/pageLogin/login/formBody.tsx
      </div>

    </div>
  );
}
