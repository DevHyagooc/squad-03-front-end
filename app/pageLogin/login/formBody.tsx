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
    <div className="w-full max-w-md px-6 py-8 mx-auto">
      <div className="pb-8">
        <FormHeader />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(onSubmit)();
          }
        }}
        className="space-y-6"
      >
        {/* Campo de Usuário */}
        <div>
          <label htmlFor="email" className="text-xs text-gray-700">
            Usuário
          </label>
          <div className="pt-1">
            <input
              id="email"
              type="email"
              className="w-full border border-gray-300 rounded-lg h-10 text-sm pl-3 focus:border-cyan-500 focus:border-2 focus:outline-none"
              {...register("email", { required: "Usuário é obrigatório" })}
              aria-invalid={errors.email ? "true" : "false"}
              placeholder="Digite o seu email..."
              aria-describedby="email-error"
            />
          </div>
          {errors.email && (
            <div id="email-error" className="text-xs text-red-600 pt-1">
              {errors.email.message as string} {/* Certifique-se de que isso é uma string */}
            </div>
          )}
        </div>

        {/* Campo de Senha */}
        <div>
          <label htmlFor="senha" className="text-xs text-gray-700">
            Senha
          </label>
          <div className="pt-1">
            <input
              id="senha"
              className="w-full border border-gray-300 rounded-lg h-10 text-sm pl-3 focus:border-cyan-500 focus:border-2 focus:outline-none"
              type="password"
              {...register("senha", {
                required: "Senha é obrigatória",
                minLength: { value: 7, message: "No mínimo 7 caracteres" },
              })}
              placeholder="*******"
              aria-describedby="senha-error"
            />
          </div>
          {errors.senha && (
            <div id="senha-error" className="text-xs text-red-600 pt-1">
              {errors.senha.message as string} {/* Certifique-se de que isso é uma string */}
            </div>
          )}
        </div>

        {/* Lembrar Senha e Link para Recuperação */}
        <div className="flex items-center justify-between text-sm text-gray-700">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2 w-4 h-4" />
            Lembrar senha
          </label>
          <Link
            href="/pageLogin/recoverLogin"
            className="text-cyan-500 hover:underline"
          >
            Esqueceu a senha?
          </Link>
        </div>

        {/* Botão de Submissão */}
        <div>
          <button
            type="submit"
            className="w-full mt-4 py-2 bg-stone-700 opacity-100 text-white rounded-xl shadow-lg hover:bg-cyan-500 hover:text-stone-700 duration-500"

          >
            Entrar
          </button>
        </div>
      </form>

      <div className="text-center mt-4 text-sm text-gray-600"></div>
    </div>
  );
}
