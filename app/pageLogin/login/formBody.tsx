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
    <div>
      <div className="justify-items-center pb-8">
        <FormHeader />
      </div>

      <div className="pb-4 w-full">
        <label>Email</label>

        <div className="shadow-lg border-2 border-stone-500 rounded-md">
          <input
            type="email"
            className="w-full"
            {...register("email", { required: true })}
            aria-invalid={errors.email ? "true" : "false"}
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
          className="w-full"
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

      <div className="justify-self-center text-shadow-lg justify-self-center text-sm font-serif text-stone-800 ">
        <table>
          <tbody>
            <tr>
              <td>
                <label>
                  <input type="checkbox" /> Lembrar senha
                </label>
              </td>

              <td className="text-shadow-lg justify-self-center text-sm font-serif text-stone-600 pl-4">
                <Link href="">Esqueceu a senha?</Link>
              </td>
            </tr>
          </tbody>
        </table>
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

      <div className="text-shadow-lg justify-self-center text-sm font-serif text-stone-600">
        <Link href="/pageLogin/registerLogin">Criar conta</Link>
      </div>
    </div>
  );
}
