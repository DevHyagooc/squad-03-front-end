import FormBody from "./formBody";

export default function RecoverLogin() {
  return (
    <div className="h-full w-full flex flex-col sm:flex-row">
      <div className="hidden md:flex w-[65%] bg-stone-100 shadow-stone-500 items-center justify-center">
        <img
          src="/images/logoGetInfo.png"
          className="w-[30vw] h-auto"
          alt="Logo GetInfo"
        />
      </div>
      <div className="w-full md:w-[35%] flex items-center justify-center">
        <FormBody />
      </div>
    </div>
  );
}
