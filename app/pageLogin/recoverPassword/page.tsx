import FormBody from "./formBody";

export default function Login() {
  return (
    <div className="h-full w-full flex">
      <div className="w-[67%] bg-stone-100 shadow-stone-500 flex items-center justify-center">
        <img
          src="/images/logoGetInfo.png"
          className="w-80"
          alt="Logo GetInfo"
        />
      </div>
      <div className="w-[33%] flex items-center">
        <FormBody />
      </div>
    </div>
  );
}
