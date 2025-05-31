"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import FormHeader from "./FormHeader";

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
        {/* Campo de Nome */}
        <div className="text-gray-700 focus-within:text-cyan-500">
          <label htmlFor="nome" className="text-xs">
            Nome
          </label>
          <div className="pt-1">
            <input
              id="nome"
              type="text"
              className="text-black w-full border border-gray-300 rounded-lg h-10 text-sm pl-3 focus:border-cyan-500 focus:border-2 focus:outline-none"
              {...register("nome", { required: "Nome é obrigatório" })}
              aria-invalid={errors.nome ? "true" : "false"}
              placeholder="Digite o seu nome..."
              aria-describedby="nome-error"
            />
          </div>
          {errors.nome && (
            <div id="nome-error" className="text-xs text-red-600 pt-1">
              {errors.nome.message as string}{" "}
              {/* Certifique-se de que isso é uma string */}
            </div>
          )}
        </div>

        {/* Campo de data de nascimento */}
        <div className="text-gray-700 focus-within:text-cyan-500">
          <label htmlFor="dataDeNascimento" className="text-xs">
            Data de nascimento
          </label>
          <div className="pt-1">
            <input
              id="dataDeNascimento"
              type="date"
              className="text-black w-full border border-gray-300 rounded-lg h-10 text-sm pl-3 focus:border-cyan-500 focus:border-2 focus:outline-none"
              {...register("dataDeNascimento", {
                required: "Data de nascimento é obrigatório",
              })}
              aria-invalid={errors.dataDeNascimento ? "true" : "false"}
              aria-describedby="dataDeNascimento-error"
            />
          </div>
          {errors.dataDeNascimento && (
            <div id="nome-error" className="text-xs text-red-600 pt-1">
              {errors.dataDeNascimento.message as string}{" "}
              {/* Certifique-se de que isso é uma string */}
            </div>
          )}
        </div>

        {/* Campo de Telefone */}
        <div className="text-gray-700 focus-within:text-cyan-500">
          <label htmlFor="telefone" className="text-xs">
            Telefone
          </label>
          <div className="pt-1">
            <input
              id="telefone"
              type="tel"
              className="text-black w-full border border-gray-300 rounded-lg h-10 text-sm pl-3 focus:border-cyan-500 focus:border-2 focus:outline-none"
              {...register("telefone", { required: "Telefone é obrigatório" })}
              aria-invalid={errors.telefone ? "true" : "false"}
              placeholder="(xx) xxxxx-xxxx"
              aria-describedby="telefone-error"
            />
          </div>
          {errors.telefone && (
            <div id="telefone-error" className="text-xs text-red-600 pt-1">
              {errors.telefone.message as string}{" "}
              {/* Certifique-se de que isso é uma string */}
            </div>
          )}
        </div>

        {/* Campo de Email */}
        <div className="text-gray-700 focus-within:text-cyan-500">
          <label htmlFor="email" className="text-xs">
            Email
          </label>
          <div className="pt-1">
            <input
              id="email"
              type="email"
              className="text-black w-full border border-gray-300 rounded-lg h-10 text-sm pl-3 focus:border-cyan-500 focus:border-2 focus:outline-none"
              {...register("email", { required: "Usuário é obrigatório" })}
              aria-invalid={errors.email ? "true" : "false"}
              placeholder="Digite o seu email..."
              aria-describedby="email-error"
            />
          </div>
          {errors.email && (
            <div id="email-error" className="text-xs text-red-600 pt-1">
              {errors.email.message as string}{" "}
              {/* Certifique-se de que isso é uma string */}
            </div>
          )}
        </div>

        {/* Campo de Função */}
        <div className="text-gray-700 focus-within:text-cyan-500">
          <label htmlFor="funcao" className="text-xs">
            Função
          </label>
          <div className="pt-1">
            <input
              id="funcao"
              type="text"
              className="text-black w-full border border-gray-300 rounded-lg h-10 text-sm pl-3 focus:border-cyan-500 focus:border-2 focus:outline-none"
              {...register("funcao", { required: "Função é obrigatório" })}
              aria-invalid={errors.funcao ? "true" : "false"}
              placeholder="Digite o sua função..."
              aria-describedby="funcao-error"
            />
          </div>

          {errors.funcao && (
            <div id="funcao-error" className="text-xs text-red-600 pt-1">
              {errors.funcao.message as string}{" "}
              {/* Certifique-se de que isso é uma string */}
            </div>
          )}
        </div>

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
              {errors.senha.message as string}{" "}
              {/* Certifique-se de que isso é uma string */}
            </div>
          )}
        </div>

        {/* Botão de Submissão */}
        <div>
          <button
            type="submit"
            className="w-full mt-4 py-2 bg-stone-700 opacity-100 text-white rounded-xl shadow-lg hover:bg-cyan-500 hover:text-stone-700 duration-500"
          >
            Entrar
          </button>

          <Link href="/pageLogin/login">
            <div className="w-full mt-4 py-2 opacity-100 rounded-xl  hover:text-stone-700 text-stone-600 duration-500 justify-items-center hover:underline">
              <h1>Login</h1>
            </div>
          </Link>
        </div>
      </form>
    </div>
  );
}
