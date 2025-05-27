import Main from "../../components/principais/main"
import { Suspense } from "react"
import TabelaInspecoes from "./components/cards"
export default async function InspecaoProgramada() {
  const res = await fetch("http://192.168.15.14:3242/api/inspecoes?planta=moldados", {
    cache: "no-store", // se necessário manter sempre atualizado
  })
  const dados = await res.json()

  return (
    <Main titulo="Inspeções" descricao="Veja o local e situação das inspeções de rotina da planta">
      <section className="w-full flex justify-between items-center gap-5 mt-15">
        <div className="h-35 w-1/2 bg-[#D5236A] rounded-xl p-6">
          <h3 className="font-semibold mb-2">Liberações não realizadas</h3>
          <p className="text-4xl font-bold">2</p>
        </div>
        <div className="h-35 w-1/2 bg-[#227FD6] p-6 rounded-xl">
          <h3 className="font-semibold mb-2">Liberações de outro turno</h3>
          <p className="text-4xl font-bold">2</p>
        </div>
        <div className="h-35 w-full bg-[#22D67C] p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Inspeções abertas</h3>
          <p className="text-4xl font-bold">2</p>
        </div>
        <div className="h-35 w-full bg-[#D69922] p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Inspeções fechadas</h3>
          <p className="text-4xl font-bold">2</p>
        </div>
        <div className="h-35 w-full rounded-xl p-6 border-2 border-[#d1d5db]">
          <h3 className="text-lg font-semibold mb-2">Registro de atualizações</h3>
          <p className="text-4xl font-bold">20/52/2025</p>
        </div>
      </section>
      <section className="mt-17 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Lista de Inspeções Ativas</h1>
        <div className="flex items-center gap-2">
          <input className="py-1.5 px-4 rounded-lg border border-[#d1d5db]" type="text" placeholder="pesquisar inspeção" />
          <button className="py-1.5 px-4 font-bold rounded-lg border-2 border-[#2a2a31]">Pesquisar</button>
          <button className="ml-3 py-2 px-5 text-white bg-[#2a2a31] font-bold rounded-lg">Imprimir</button>
        </div>
      </section>

      <Suspense fallback={<p className="mt-5">Carregando tabela...</p>}>
        <TabelaInspecoes dados={dados} />
      </Suspense>
    </Main>
  )
}