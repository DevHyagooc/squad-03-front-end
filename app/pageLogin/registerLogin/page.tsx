import FormBody from "./formBody";
import FormHeader from "./formHeader";

export default function RegisterLogin(){
  return (
      <div className="justify-items-center font-sans">
  
        <div className=" border-2 border-black-700 shadow-md rounded-xl w-lg m-14    p-8  text-shadow-lg/20">
        
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
