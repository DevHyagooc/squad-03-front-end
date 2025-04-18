import FormBody from "./formBody";
import FormHeader from "./formHeader";

export default function RegisterLogin(){
  return (
      <div className="text-shadow-lg justify-items-center font-serif">
  
        <div className=" border-2 border-stone-500 shadow-md rounded-xl w-lg m-14    p-8 ">
        
          <div className="justify-items-center pb-8 ">
            <FormHeader />
          </div>
  
          <div>
            <FormBody/>
          </div>
  
        </div>
        
      </div>
    );
}
