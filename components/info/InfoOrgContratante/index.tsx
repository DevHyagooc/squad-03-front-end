import { Button } from "../../ui/button";

interface OrgContratante {
  idOrgao: number;
    nome: string;
    nomeFantasia: string;
    razaoSocial: string;
    numeroEmpresa: string;
    estado: string;
    cidade: string;
}

interface FormOrgContratantePorps {
    closeForm: () => void;
    orgContratante: OrgContratante
}

const InfoOrgContratante: React.FC<FormOrgContratantePorps> = ({ closeForm, orgContratante }) => {
    
    return (
        <div>
         <h2>Informações do Colaborador</h2>
         <div>Nome: {orgContratante.nome}</div>
         <div>NomeFantasia: {orgContratante.nomeFantasia}</div>
         <div>RazaoSocial: {orgContratante.nomeFantasia}</div>
         <div>NumeroEmpresa: {orgContratante.numeroEmpresa}</div>
         <div>Estado: {orgContratante.estado}</div>
         <div>Cidade: {orgContratante.cidade}</div>
         <Button onClick={closeForm}>Fechar</Button>
      </div>
    );
}

export default InfoOrgContratante;