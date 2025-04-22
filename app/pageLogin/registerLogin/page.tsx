import FormBody from "./formBody";

export default function RegisterLogin(){
  return (
      <table className="font-serif h-full w-full">
            <tbody>
              <tr>
                <td className="bg-stone-200 justify-items-center shadow-md shadow-stone-500 w-80 ">
                  <h1>Logo</h1>
                </td>
      
                <td className="justify-items-center w-20">
                  <FormBody />
                </td>
              </tr>
            </tbody>
          </table>
    );
}
