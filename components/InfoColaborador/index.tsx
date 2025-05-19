import { getColaboradorId } from "@/services/colaboradores";
import { useState, useEffect } from "react";
import Loading from "@/components/loading/index";
import { Button } from "../ui/button";

interface FormColabProps {
   closeForm: () => void;
   idColaborador: string;
}

interface Colaborador {
   idFuncionario: string;
   nome: string;
   cargo: string;
   telefone: string;
   email: string;
   nascimento: string;
}

const InfoColab: React.FC<FormColabProps> = ({ closeForm, idColaborador }) => {
   const [colaborador, setColaborador] = useState<Colaborador | null>(null);
   const [loading, setLoading] = useState<boolean>(false);

   useEffect(() => {
      const fetchColaborador = async () => {
         setLoading(true);
         try {
            const colaboradorData = await getColaboradorId(idColaborador);
            setColaborador(colaboradorData);
         } catch (error) {
            console.error("Erro ao buscar colaborador:", error);
         } finally {
            setLoading(false);
         }
      };

      fetchColaborador();
   }, [idColaborador]);
   if (loading) {
      return <Loading />;
   }

   if (!colaborador) {
      return <div>Colaborador não encontrado.</div>;
   }

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
