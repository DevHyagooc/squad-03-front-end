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
    router.push("/novaSenha");
  };

  return (
    <div className="w-full px-12">
      <div className="pb-4">
        <FormHeader />
      </div>

      <div className="pb-6">
        <h4>Digite sua senha atual</h4>
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
       {/* Campo de Senha */}
        <div className="text-gray-700 focus-within:text-cyan-500">
          <label htmlFor="senha" className="text-xs">
            Senha
          </label>
          <div className="pt-1">
            <input
              id="senha"
              className="text-black w-full border border-gray-300 rounded-lg h-10 text-sm pl-3 focus:border-cyan-500 focus:border-2 focus:outline-none"
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

          {/* Botão de Submissão */}
        <div>
          <button
            type="submit"
            className="w-full mt-4 py-2 bg-stone-700 opacity-100 text-white rounded-xl shadow-lg hover:bg-cyan-500 hover:text-stone-700 duration-500"

          >
            Confirmar
          </button>

        </div>
      </form>

       <Link href="/pageInterna/pagePerfil">
                <div className="w-full mt-4 py-2 opacity-100 rounded-xl  hover:text-stone-700 text-stone-600 duration-500 justify-items-center hover:underline">
                  
                  <h1>voltar</h1>
                </div>
                </Link>
    </div>
  );
}
