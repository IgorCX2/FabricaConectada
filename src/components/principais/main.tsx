import React from "react";
import Cabecalho from "./cabecalho";

interface MainPropos{
  children: React.ReactNode,
  titulo?: string,
  descricao?: string,
}

export default async function Main({ children, titulo, descricao }: MainPropos) {
  let descricaoModulo: string[] = [titulo, descricao];

  return (
    <main className="ml-10 py-5 pl-15 pr-30">
      <Cabecalho descricaoModulo={descricaoModulo} />
      {children}
    </main>
  );
}
