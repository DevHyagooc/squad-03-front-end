"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import FormHeader from "./formHeader";

export default function FormBody() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>

      <div className="justify-items-center pb-8 ">
              <FormHeader />
            </div>

      <div className="pb-4">
        <label>Nome de usuário</label>

        <div className=" shadow-lg border-2 border-stone-500 rounded-md">
          <input
            type="text"
            className={errors?.name && "input-error"}
            {...register("name", { required: true })}
          />
        </div>

        <div className="text-sm text-red-600/75 dark:text-sky-400/75 pt-1">
          {errors?.name?.type === "required" && (
            <p className="error-message">Nome é obrigatório</p>
          )}
        </div>
      </div>

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

      <div className="pb-4">
        <label>CPF</label>

        <div className="shadow-lg border-2 border-stone-500 rounded-md">
          <input
            type="number"
            className={errors?.cpf && "input-error"}
            {...register("cpf", { required: true })}
          />
        </div>

        <div className="text-sm text-red-600/75 dark:text-sky-400/75 pt-1">
          {errors?.cpf?.type === "required" && (
            <p className="error-message">CPF é obrigatório</p>
          )}
        </div>
      </div>

      <div className="pb-5">
        <label>Senha</label>

        <div className=" shadow-lg border-2 border-stone-500 rounded-md">
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

      <div className="justify-self-center pb-2 ">
        <button
          className=" font-serif bg-stone-700 opacity-100 rounded-md  pt-2 pb-2 pl-4 pr-4 shadow-lg text-sm text-white "
          onClick={() => {
            handleSubmit(onSubmit)();
          }}
        >
          Salvar
        </button>
      </div>

      <div className="justify-self-center text-shadow-lg text-sm text-stone-600">
        <Link href="/pageLogin/login">login</Link>
      </div>
    </div>
  );
}
