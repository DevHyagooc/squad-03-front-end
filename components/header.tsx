"use client";

import { Bell, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import React from "react";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter();

  // Função que será chamada ao clicar em “Sair”
  const handleLogout = () => {
    // 1) Remove o token (JWT) do localStorage
    localStorage.removeItem("token");
    // 2) Redireciona para a rota de login (substitua se sua rota for diferente)
    router.replace("/pageLogin/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 w-full">
      <div className="flex items-center gap-4">
        {/* Botão hamburger - visível apenas no mobile */}
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo - sempre visível */}
        <img src="/images/logoGetInfo.png" className="w-28" alt="Logo GetInfo" />
      </div>

      {/* Espaçador */}
      <div className="flex-1" />

      {/* Ações do usuário */}
      <div className="flex items-center gap-4">
        {/* Dropdown de Notificações */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-[10px] text-white">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notificações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
              <span className="font-medium">Novo contrato adicionado</span>
              <span className="text-sm text-muted-foreground">Contrato de Manutenção</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
              <span className="font-medium">Entregável próximo do prazo</span>
              <span className="text-sm text-muted-foreground">Relatório Mensal</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
              <span className="font-medium">Ordem de serviço atualizada</span>
              <span className="text-sm text-muted-foreground">#OS-2023-001</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Dropdown de Perfil do Usuário */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar>
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* Aqui substituímos o Link por um DropdownMenuItem com onClick */}
            <DropdownMenuItem 
              className="text-red-600"
              onSelect={handleLogout} // ou onClick, dependendo da versão do seu componente
            >
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
