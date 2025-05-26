"use client";
import { useEffect } from "react";

export default function RegistrarAcesso({ id }: { id: number }) {
  useEffect(() => {
    const chave = "modulosRecentes";
    const recentes: { id: number; acessadoEm: string }[] =
      JSON.parse(localStorage.getItem(chave) || "[]");

    const atualizados = [
      { id, acessadoEm: new Date().toISOString() },
      ...recentes.filter((m) => m.id !== id),
    ];

    localStorage.setItem(chave, JSON.stringify(atualizados.slice(0, 5)));
  }, [id]);

  return null;
}
