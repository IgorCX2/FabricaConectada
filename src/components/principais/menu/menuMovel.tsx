"use client";
import { buscarMenuId } from "@/src/utils/apis/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
const apiBaseURL = process.env.API_INTERNAL_URL!

type Modulo = {
  id: number;
  nome: string;
  caminho: string[];
};

export default function MenuMovel() {
  const [modulos, setModulos] = useState<Modulo[]>([]);

  useEffect(() => {
    const recentes: { id: number }[] = JSON.parse(
      localStorage.getItem("modulosRecentes") || "[]"
    );
    Promise.all(
      recentes.map(async ({ id }) => {
        const dados = await buscarMenuId(id)
        console.log(id)
        console.log(dados)
        return {
          id,
          nome: dados.nomeMenu,
          caminho: ['modulos',dados.departamentos, dados.departamentos[0].toUpperCase() + id],
        };
      })
    ).then((resolvidos) => {
      const limpos = resolvidos.filter(Boolean) as Modulo[];
      setModulos(limpos);
    });
  }, []);

  return (
    <div className="group/task">
      <Link href={"/modulos"} className="flex items-center gap-3 px-2 py-2 hover:bg-gray-200 rounded-md cursor-pointer">
        <div className="w-7 h-7 relative shrink-0">
          <Image src="/icones/tarefas.png" alt="Módulos" fill className="object-contain"/>
        </div>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Módulos</span>
      </Link>
      <div className="ml-7 mt-3 hidden group-hover/task:flex flex-col border-gray-300 gap-2 border-l-2">
        {modulos.length === 0 && (
          <span className="ml-3 text-sm text-gray-400">Nenhum acesso recente</span>
        )}
        {modulos.map((modulo) => (
          <Link key={modulo.id} href={`/${modulo.caminho.join("/")}`} className="ml-3 hover:bg-gray-200 rounded-md py-2 px-2 transition">{modulo.nome}</Link>
        ))}
      </div>
    </div>
  );
}
