"use client"
import { useState } from "react"

type Atualizando = {
  [idCampo: string]: boolean 
}

export default function TabelaInspecoes({ dados }: { dados: any[] }) {
  const [inspecoes, setInspecoes] = useState(dados)
  const [atualizando, setAtualizando] = useState<Atualizando>({})

  const atualizarCampo = async (id: number, campo: string, valor: any) => {
    const chave = `${id}-${campo}`
    setAtualizando(prev => ({ ...prev, [chave]: true }))
    try {
      await fetch(`http://192.168.15.14:3242/api/inspecoes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [campo]: valor })
      })
      setInspecoes(prev =>
        prev.map(item =>
          item.Código === id ? { ...item, [campo]: valor } : item
        )
      )
    } catch (error) {
      console.error("Erro ao atualizar campo:", error)
    } finally {
      setAtualizando(prev => {
        const copia = { ...prev }
        delete copia[chave]
        return copia
      })
    }
  }
  const estaAtualizando = (id: number, campo: string) =>
    atualizando[`${id}-${campo}`]

  return (
    <section className="mt-5 overflow-x-auto">
      <table className="min-w-full table-fixed border-separate border-spacing-y-2">
        <thead className="bg-[#F3F2F4] text-gray-800">
          <tr>
            <th className="text-left px-4 py-5 w-[200px]">Máquina</th>
            <th className="px-2">Ordem P.</th>
            <th className="px-2">Peça</th>
            <th className="px-2 w-[50px]">T01</th>
            <th className="px-2 w-[50px]">F01</th>
            <th className="px-2 w-[50px]">Lib</th>
            <th className="px-2">Qtd</th>
            <th className="px-2">Operador</th>
            <th className="px-2">Status</th>
            <th className="px-2">Comentário</th>
          </tr>
        </thead>
        <tbody>
          {inspecoes.map((item) => (
            <tr key={item.Código} className="bg-white rounded shadow-xs">
              <td className="flex items-center gap-2 px-4 py-3">
                <div className="w-10 h-10 rounded-full bg-cyan-800"></div>
                <div>
                  <div className="font-bold">{item.maquina}</div>
                  <div className="text-xs text-gray-600 -mt-2">{item.Local}</div>
                </div>
              </td>
              <td>
                  <div className="bg-[#F3F2F4] px-2 py-1 mx-4 rounded-xl text-center">{item.ordem}</div>
                </td>
                <td>
                  <div className="bg-[#F3F2F4] px-2 py-1 mx-4 rounded-xl text-center ">{item.peca}</div>
                </td>
              <td className="text-center">
                <div className={estaAtualizando(item.Código, "t01") ? "opacity-50" : ""}>
                  <input
                    type="checkbox"
                    checked={item.t01}
                    onChange={() => atualizarCampo(item.Código, "t01", !item.t01)}
                    className="accent-cyan-800 w-5 h-5"
                    disabled={estaAtualizando(item.Código, "t01")}
                  />
                </div>
              </td>
              <td className="text-center">
                <div className={estaAtualizando(item.Código, "f01") ? "opacity-50" : ""}>
                  <input
                    type="checkbox"
                    checked={item.f01}
                    onChange={() => atualizarCampo(item.Código, "f01", !item.f01)}
                    className="accent-cyan-800 w-5 h-5"
                    disabled={estaAtualizando(item.Código, "f01")}
                  />
                </div>
              </td>
              <td className="text-center">
                <div className={estaAtualizando(item.Código, "liberacao") ? "opacity-50" : ""}>
                  <input
                    type="checkbox"
                    checked={item.liberacao}
                    onChange={() => atualizarCampo(item.Código, "liberacao", !item.liberacao)}
                    className="accent-cyan-800 w-5 h-5"
                    disabled={estaAtualizando(item.Código, "liberacao")}
                  />
                </div>
              </td>
              <td className="text-center">
                <div className="font-bold">{item.qtd}</div>
                <div className="text-xs">peças</div>
              </td>
              <td className="text-center">{item.operador}</td>
              <td className="text-center">
                <span className="bg-green-600 text-white px-3 py-1 rounded-xl">
                  {item.status}
                </span>
              </td>
              <td className="text-center">
                <div className="relative">
                  <select
                    className={`w-full px-2 py-1 border rounded-xl ${estaAtualizando(item.Código, "comentario") ? "opacity-50" : ""}`} value={item.comentario ?? ""} onChange={(e) => atualizarCampo(item.Código, "comentario", e.target.value)} disabled={estaAtualizando(item.Código, "comentario")}>
                    <option value="">Selecione</option>
                    <option value="nao_produziu">Máquina não produziu</option>
                    <option value="nao_finalizou_setup">Não finalizou o setup</option>
                  </select>
                  {estaAtualizando(item.Código, "comentario") && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs animate-pulse">⏳</div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
