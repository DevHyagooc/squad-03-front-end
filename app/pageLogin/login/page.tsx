import FormBody from "./formBody";

export default function Login() {
  return (
    <div className="h-full w-full flex flex-col sm:flex-row">
      {/* Logo */}
      <div className="hidden md:flex w-[65%] bg-stone-100 shadow-stone-500 items-center justify-center">
        <img
          src="/images/logoGetInfo.png"
          className="w-[30vw] h-auto"
          alt="Logo GetInfo"
        />
      </div>
      {/* FormBody */}
      <div className="w-full md:w-[35%] flex items-center justify-center">
        <FormBody />
      </div>
    </div>
  );
}
