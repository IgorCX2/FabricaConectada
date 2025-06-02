import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import BlocoGrupo from "./BlocoGrupo";
import Main from "../main";
import { Suspense } from "react";
import { buscarMenuId } from "@/src/utils/apis/api";

type Modulo = {
  id: number;
  nomeMenu: string;
  cor: string;
  departamentos: string;
  descricao: string
};

export default async function PaginaModulos() {
  const token = (await cookies()).get('token').value

  if (!token) return <div>Token não encontrado.</div>;

  const { perm } = jwt.decode(token) as { perm: string };
  const ids = perm.split(',').map(id => parseInt(id));

  const modulos: Modulo[] = [];

  for (const id of ids) {
    const response = await buscarMenuId(id)
    modulos.push(response);
  }

  const agrupados: Record<string, Modulo[]> = {};
  for (const modulo of modulos) {
    if (!agrupados[modulo.departamentos]) {
      agrupados[modulo.departamentos] = [];
    }
    agrupados[modulo.departamentos].push(modulo);
  }

  return (
    <Main titulo="Módulos" descricao="Descubra a quais módulos você tem acesso">
      {Object.entries(agrupados).map(([grupo, modulos]) => (
        <Suspense key={grupo} fallback={<div>Carregando {grupo}...</div>}>
          <BlocoGrupo grupo={grupo} modulos={modulos} />
        </Suspense>
      ))}
    </Main>
  );
}