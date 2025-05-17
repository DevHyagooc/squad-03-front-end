import { Button } from "../ui/button";

interface Colaborador {
   idFuncionario: string;
   nome: string;
   cargo: string;
   telefone: string;
   email: string;
   nascimento: string;
}
interface FormColabProps {
   closeForm: () => void;
   colaborador: Colaborador
}

const InfoColab: React.FC<FormColabProps> = ({ closeForm, colaborador }) => {

   return (
      <div>
         <h2>Informações do Colaborador</h2>
         <div>Nome: {colaborador.nome}</div>
         <div>Cargo: {colaborador.cargo}</div>
         <div>Telefone: {colaborador.telefone}</div>
         <div>Email: {colaborador.email}</div>
         <div>Data de Nascimento: {colaborador.nascimento}</div>
         <Button onClick={closeForm}>Fechar</Button>
      </div>
   );
};

export default InfoColab;
