import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { Suspense } from "react"
import TabelaInspecoes from "./components/cards"
import Main from "@/src/components/principais/main"
import { buscarFichas } from "@/src/utils/apis/api"
import Link from "next/link";
import AtualizarPagina from "@/src/components/btns/btnAtualizar";
export default async function InspecaoProgramada() {
  const token = (await cookies()).get("token").value;
  const { planta_principal, codigo_usuario } = jwt.decode(token);
  const dados = await buscarFichas(planta_principal)

  return (
    <Main titulo="Inspeções" descricao="Veja o local e situação das inspeções de rotina da planta">
      <section className="w-full flex justify-between items-center gap-5 mt-15">
        <div className="h-35 w-1/2 bg-[#D5236A] rounded-xl p-6">
          <h3 className="font-semibold mb-2">Liberações não realizadas</h3>
          <p className="text-4xl font-bold">{dados.indicadores?.nao_finalizados}</p>
        </div>
        <div className="h-35 w-1/2 bg-[#227FD6] p-6 rounded-xl">
          <h3 className="font-semibold mb-2">Liberações de outro turno</h3>
          <p className="text-4xl font-bold">{dados.indicadores?.turno_diferente}</p>
        </div>
        <div className="h-35 w-full bg-[#22D67C] p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Inspeções abertas</h3>
          <p className="text-4xl font-bold">{dados.indicadores?.quantidade}</p>
        </div>
        <div className="h-35 w-full bg-[#D69922] p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Inspeções fechadas</h3>
          <p className="text-4xl font-bold">{dados.indicadores?.quantidade_fechado}</p>
        </div>
        <div className="h-35 w-full rounded-xl p-6 border-2 border-[#d1d5db]">
          <h3 className="text-lg font-semibold mb-2">Em aberta</h3>
          <p className="text-4xl font-bold">{dados.indicadores?.precisam_fazer}</p>
        </div>
      </section>
      <section className="mt-17 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Lista de Inspeções Ativas</h1>
        <div className="flex items-center gap-2">
          <AtualizarPagina/>
          <Link href={`http://localhost:3001/api/qualidade/imprimir-ficha/${planta_principal}`} className="ml-3 py-2 px-5 text-white bg-[#2a2a31] font-bold rounded-lg">Imprimir</Link>
        </div>
      </section>
      <Suspense fallback={<p className="mt-5">Carregando tabela...</p>}>
        <TabelaInspecoes dados={dados.fichas} alertas={dados.alertas} usuarioRegistro={codigo_usuario}/>
      </Suspense>
    </Main>
  )
}