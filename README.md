# Gerenciador de Contratos Frontend

> Frontend em Next.js para consumo da API de gerenciamento de contratos.

## 📖 Descrição

Este projeto é o frontend de um sistema de *Gerenciamento de Contratos*. Ele consome uma API REST em Spring Boot que oferece:

- Registro e login de usuários com JWT  
- Controle de acesso via roles (ROLE_ADMIN e ROLE_USER)  
- CRUD de *Contratos* (criação, edição, listagem, arquivamento)  
- CRUD de *Colaboradores* e *Empresas* (relacionados aos contratos)  
- Perfil do usuário autenticado (visualizar/editar email, nome e senha)  
- Dashboard com estatísticas básicas (número de contratos, contratos ativos/vencidos, etc.)

## 🚀 Tecnologias

- [Next.js](https://nextjs.org/)  
- [React](https://reactjs.org/)  
- [Axios](https://github.com/axios/axios) para chamadas HTTP  
- [Tailwind CSS](https://tailwindcss.com/) para estilização

## 📋 Pré-requisitos

- Node.js ≥ 16  
- npm ou yarn  
- API backend rodando e acessível 

## ⚙️ Instalação

1. Clone este repositório  
   ```bash
   git clone https://github.com/DevHyagooc/squad-03-front-end.git
   cd seu-projeto-frontend

2. Instale as dependências

npm install --force
# ou
yarn install --force

## 📦 Scripts

npm run dev     # dev server em http://localhost:3000
npm run build   # build para produção
npm run start   # inicia build em prod
npm run tests   # roda testes do cypress
