// Função para formatar CPF
export const formatCPF = (value: string) => {
   const cleaned = value.replace(/\D/g, '');
   const limited = cleaned.substring(0, 11); // CPF tem 11 dígitos

   if (limited.length <= 3) {
      return limited;
   } else if (limited.length <= 6) {
      return limited.replace(/(\d{3})(\d{1,3})/, '$1.$2');
   } else if (limited.length <= 9) {
      return limited.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
   } else {
      return limited.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
   }
};

// Função para formatar telefone
export const formatPhone = (value: string) => {
   const cleaned = value.replace(/\D/g, '');
   const limited = cleaned.substring(0, 13); // Número tem 13 dígitos (Com o DDI)

   if (limited.length <= 0) {
      return limited;
   } else if (limited.length <= 2) {
      return limited.replace(/(\d{0})(\d{1,2})/, '$1($2');
   } else if (limited.length <= 4) {
      return limited.replace(/(\d{0})(\d{2})(\d{1,2})/, '$1($2) $3');
   } else if (limited.length <= 9) {
      return limited.replace(/(\d{0})(\d{2})(\d{2})(\d{1,5})/, '$1($2) $3 $4');
   } else {
      return limited.replace(/(\d{0})(\d{2})(\d{2})(\d{5})(\d{1,4})/, '$1($2) $3 $4-$5');
   }
};

// Função para formatar data
export const formatDate = (value: string) => {
   const cleaned = value.replace(/\D/g, '');
   const limited = cleaned.substring(0, 8); // Data tem 8 dígitos

   if (limited.length <= 2) {
      return limited;
   } else if (limited.length <= 4) {
      return limited.replace(/(\d{2})(\d{1,2})/, '$1/$2');
   } else {
      return limited.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3');
   }
};

export function formatDate2(value: string): string {
  if (!value) return "";
  // pega só a parte "YYYY-MM-DD"
  const isoDate = value.substring(0, 10);
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}

// Função para formatar data BR
export function formatDateBR(dateString: string): string {
  const d = new Date(dateString);
  // Garante que sempre use o formato dd/mm/aaaa
  return d.toLocaleDateString("pt-BR");
}

// Função para formatar CNPJ
export const formatCNPJ = (value: string) => {
   const cleaned = value.replace(/\D/g, '');
   const limited = cleaned.substring(0, 14);  // CNPJ tem 14 dígitos

   if (limited.length <= 2) {
     return limited;
   } else if (limited.length <= 5) {
     return limited.replace(/(\d{2})(\d{1,3})/, '$1.$2');
   } else if (limited.length <= 8) {
     return limited.replace(/(\d{2})(\d{3})(\d{1,3})/, '$1.$2.$3');
   } else if (limited.length <= 12) {
     return limited.replace(/(\d{2})(\d{3})(\d{3})(\d{1,4})/, '$1.$2.$3/$4');
   } else {
     return limited.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})/, '$1.$2.$3/$4-$5');
   }
};

// Função para formatar CEP
export const formatCEP = (value: string) => {
   const cleaned = value.replace(/\D/g, '');
   const limited = cleaned.substring(0, 8);  // CEP tem 8 dígitos

   if (limited.length <= 5) {
     return limited;
   } else {
     return limited.replace(/(\d{5})(\d{1,3})/, '$1-$2');
   }
};