"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useAuth } from "@/context/auth-context"
import Link from "next/link"

type LoginFormData = {
  email: string
  senha: string
}

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [authError, setAuthError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>()

  const onSubmit = async (data: LoginFormData) => {
    setAuthError(null)

    try {
      await login(data.email, data.senha)
      router.push("/pageAdmin/dashboard")
    } catch (err: any) {
      setAuthError(err.message || "Falha na autenticação")
    }
  }

  return (
    <div className="h-screen w-full flex flex-col sm:flex-row">
      {/* Logo Section - Hidden on mobile */}
      <div className="hidden md:flex w-[65%] bg-stone-100 shadow-stone-500 items-center justify-center">
        <img src="/images/logoGetInfo.png" className="w-[30vw] h-auto" alt="Logo GetInfo" />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-[35%] flex items-center justify-center">
        <div className="w-full max-w-md px-6 py-8 mx-auto">
          {/* Form Header */}
          <div className="pb-8">
            <div className="justify-items-start">
              <div>
                <div className="getinfo-logo text-[2rem] pb-4">
                  get<span>info</span>
                </div>
              </div>

              <div className="font-medium text-[24px]">
                <h1>Acesso Administrativo</h1>
              </div>
            </div>
          </div>

          {/* Form Body */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(onSubmit)()
              }
            }}
            className="space-y-6"
          >
            {/* Campo de Usuário */}
            <div className="text-gray-700 focus-within:text-cyan-500">
              <label htmlFor="email" className="text-xs">
                Usuário
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
                  {errors.email.message as string}
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
                  {errors.senha.message as string}
                </div>
              )}
            </div>

            {/* Exibe erro de autenticação, se houver */}
            {authError && <div className="text-sm text-red-600 pt-1">{authError}</div>}

            {/* Lembrar Senha e Link para Recuperação */}
            <div className="flex items-center justify-between text-sm text-gray-700">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 w-4 h-4" />
                Lembrar senha
              </label>
              <Link href="#" className="text-cyan-500 hover:underline">
                Esqueceu a senha?
              </Link>
            </div>

            {/* Botão de Submissão */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  w-full mt-4 py-2 
                  ${isSubmitting ? "bg-gray-400" : "bg-stone-700 hover:bg-cyan-500 hover:text-stone-700"} 
                  opacity-100 text-white rounded-xl shadow-lg duration-500
                `}
              >
                {isSubmitting ? "Entrando..." : "Entrar"}
              </button>
            </div>
          </form>

          <div className="text-center mt-6 text-sm text-gray-600">
            <p>Acesso restrito a administradores do sistema</p>
          </div>
        </div>
      </div>
    </div>
  )
}
