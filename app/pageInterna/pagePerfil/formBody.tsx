"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from 'next/link'

export default function FormBody() {
    const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    router.push("/pageInterna/pagePerfil");
    
  };

  return (
    <div className="w-full h-full">
      <div className="h-64 bg-stone-500/10  hidden md:flex items-center justify-center ">
        <p className="text-white text-xl content-center text-center h-32 w-32 bg-stone-600 rounded-full m-4">
          foto
        </p>

        <div className="ml-4 mt-10">
          <h1 className="text-xl font-sans text-stone-900">
            José Alves Dantas Júnior
          </h1>
          <p className="mt-1 text-lg font-sans text-stone-600">
            Getinfo+Jose@gmail.com.br
          </p>
          <p className="mt-1 text-lg font-sans text-stone-600">Desenvolvedor</p>
          <p className=" mt-1 text-base font-sans text-stone-500">
            (79) 9999-9999
          </p>

          <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-4" variant="default">Editar perfil</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editando Perfil</DialogTitle>
          <DialogDescription>
            Click no que deseja editar
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(onSubmit)();
          }
        }} className="grid gap-4 py-4">
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
              defaultValue="José Alves Dantas Júnior"
              aria-describedby="nome-error"
            />
          </div>
          {errors.nome && (
            <div id="nome-error" className="text-xs text-red-600 pt-1">
              {errors.nome.message as string} {/* Certifique-se de que isso é uma string */}
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
              {...register("dataDeNascimento", { required: "Data de nascimento é obrigatório" })}
              aria-invalid={errors.dataDeNascimento ? "true" : "false"}
              aria-describedby="dataDeNascimento-error"
            />
          </div>
          {errors.dataDeNascimento && (
            <div id="nome-error" className="text-xs text-red-600 pt-1">
              {errors.dataDeNascimento.message as string} {/* Certifique-se de que isso é uma string */}
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
              defaultValue="(79) 9999-9999"
              aria-describedby="telefone-error"
            />
          </div>
          {errors.telefone && (
            <div id="telefone-error" className="text-xs text-red-600 pt-1">
              {errors.telefone.message as string} {/* Certifique-se de que isso é uma string */}
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
              defaultValue="jose@gmail.com.br"
              aria-describedby="email-error"
            />
          </div>
          {errors.email && (
            <div id="email-error" className="text-xs text-red-600 pt-1">
              {errors.email.message as string} {/* Certifique-se de que isso é uma string */}
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
              defaultValue="Desenvolvedor"
              aria-describedby="funcao-error"
            />
          </div>

          {errors.funcao && (
            <div id="funcao-error" className="text-xs text-red-600 pt-1">
              {errors.funcao.message as string} {/* Certifique-se de que isso é uma string */}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button className="mt-4" type="submit">Savar mudanças</Button>
        </DialogFooter>
        </form>
      </DialogContent>
      
    </Dialog>
        </div>
      </div>

      <p className="m-3">Meus dados:</p>

      <div className="m-6">

        <div className="mt-4">
          <label>Data de nascimento</label>
          <h1>17/08/2005</h1>
        </div>

        <div className="mt-4">
          <label>segurança</label>
          <div className="hidden md:flex">
            <h1>*********</h1>

<Link href="/alterarSenha">
            <button className="ml-8 p-1 text-sm rounded-sm bg-stone-600 text-white">Alterar senha</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
