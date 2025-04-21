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
    router.push("/pageLogin/recoverPassword");
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

      <div >
          <button
          className=" justify-self-center shadow-lg bg-stone-700 opacity-100 rounded-xl w-full mt-4 mb-2 pt-2 pb-2 pl-4 pr-4 text-sm text-white"
            onClick={() => {
              handleSubmit(onSubmit)();
            }}
          >
            Enviar
          </button>
        </div>

      <div className="text-shadow-lg justify-self-center text-sm font-serif text-stone-600">
        <Link href="/pageLogin/login">Voltar</Link>
      </div>
    </div>
  );
}
