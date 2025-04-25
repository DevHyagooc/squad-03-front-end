// FormFunc.tsx (ou FormFunc.js, se estiver usando JavaScript)

// Tipando as props do componente FormFunc
interface FormFuncProps {
   closeForm: () => void;  // closeForm é uma função que não retorna nada
}

const FormFunc: React.FC<FormFuncProps> = ({ closeForm }) => {
   return (
      <form className="space-y-4">
         <div>
            <label htmlFor="nome" className="block">Nome:</label>
            <input id="nome" type="text" className="mt-2 p-2 border" placeholder="Digite o nome do funcionário" />
         </div>
         <div>
            <label htmlFor="cargo" className="block">Cargo:</label>
            <input id="cargo" type="text" className="mt-2 p-2 border" placeholder="Digite o cargo" />
         </div>
         <div className="flex justify-end gap-4">
            {/* Botão "Cancelar" chama o closeForm */}
            <button type="button" onClick={closeForm} className="px-4 py-2 bg-gray-500 text-white">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white">Salvar</button>
         </div>
      </form>
   );
};

export default FormFunc;
