'use client'

import { atualizarFichaSic } from '@/src/utils/apis/api'
import Link from 'next/link'
import { useState } from 'react'

export default function TabelaInspecoes({ dados, alertas,usuarioRegistro }: { dados: any[], alertas: any[], usuarioRegistro: string}) {
  const [status, setStatus] = useState<Record<string, 'idle' | 'saving' | 'saved' | 'error'>>({})
  const [valoresLocais, setValoresLocais] = useState<Record<string, boolean>>({})
  const [alertasClicados, setAlertasClicados] = useState(new Set());

  const handleClick = (id) => {
    setAlertasClicados(prev => new Set(prev).add(id));
  };

  async function atualizarInspecao(id: number, campo: string, valor: any) {
    const key = `${id}-${campo}`
    setStatus(prev => ({ ...prev, [key]: 'saving' }))

    try {
      const res = await atualizarFichaSic(id, campo, valor)
      if (res.ok) {
        setStatus(prev => ({ ...prev, [key]: 'saved' }))
        setValoresLocais((prev) => ({ ...prev, [key]: true }))
      } else {
        setStatus(prev => ({ ...prev, [key]: 'error' }))
      }
      setTimeout(() => {
        setStatus(prev => ({ ...prev, [key]: 'idle' }))
      }, 1000)
    } catch (err) {
      console.error(err)
      setStatus(prev => ({ ...prev, [key]: 'error' }))
    }

  }

  return (
    <section className="mt-5 overflow-x-auto">
      <table className="min-w-full table-fixed border-separate border-spacing-y-2">
        <thead className="bg-[#F3F2F4] text-gray-800">
          <tr>
            <th className="text-left px-4 py-5 w-[200px]">Máquina</th>
            <th className="px-2">Ordem P.</th>
            <th className="px-2">Peça</th>
            <th className="px-2 w-[60px]">T01</th>
            <th className="px-2 w-[60px]">F01</th>
            <th className="px-2 w-[60px]">Lib</th>
            <th className="px-2 w-[80px]">Qtd</th>
            <th className="px-2">Operador</th>
            <th className="px-2">Status</th>
            <th className="px-2">Comentário</th>
          </tr>
        </thead>
        <tbody>
          {dados?.map((item) => (
            <tr key={item.id} className="bg-white rounded shadow-xs relative">
              <td className="flex items-center gap-2 px-4 py-3">
                {!alertasClicados.has(item.id) && alertas.find(alerta => alerta.itemFabrica === item.prodcode) && <Link onClick={() => handleClick(item.id)} target='_blank' href={'/'} className='absolute w-full h-full bg-red-500/20'></Link>}
                <div
                  className={`${item.tipo === "Revalidacao" ? "bg-green-600" : "bg-yellow-500"} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold`}
                  title={
                    item.tipo === "Revalidacao"
                      ? "O sistema detectou que a máquina produziu, com isso precisa fazer a verificação do início e fim de turno"
                      : item.tipo === "Setup"
                        ? "A máquina está em setup, com isso precisa fazer a liberação"
                        : item.tipo === "Produto"
                          ? "A peça que a máquina está produzindo mudou, com isso precisa fazer a liberação"
                          : item.tipo === "Ordem"
                            ? "A ordem da máquina mudou, porém continua produzindo o mesmo item, com isso precisa fazer a liberação"
                            : item.tipo === "Historico"
                              ? "Isso é um status que o sistema errou em alguma coisa"
                              : "Tipo desconhecido"
                  }
                >
                  {item.turno}
                </div>
                <div>
                  <div className="font-bold">{item.resourcecode}</div>
                  <div className="text-xs text-gray-600 -mt-2">{item.supLevel2Code}</div>
                </div>
              </td>
              <td>
                <div className="bg-[#F3F2F4] px-2 py-1 mx-4 rounded-xl text-center">{item.wohdcode}</div>
              </td>
              <td>
                <div className="bg-[#F3F2F4] px-2 py-1 mx-4 rounded-xl text-center ">{item.prodcode}</div>
              </td>

              {['t01', 'f01', 'liberacao'].map((campo) => {
                const key = `${item.id}-${campo}`
                const statusAtual = status[key]
                const checked = valoresLocais[key] ?? (item[campo] != null)
                if (item.tipo == "Revalidacao" && campo == "liberacao") {
                  return <td key={key}></td>
                }
                return (
                  <td className="text-center" key={key}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        const novoValor = e.target.checked ? usuarioRegistro+"|"+new Date().toISOString() : null
                        atualizarInspecao(item.id, campo, novoValor)
                      }}
                      className={`accent-cyan-800 w-5 h-5 transition-all duration-200
                        ${statusAtual === 'saving' ? 'ring-2 ring-orange-400' : ''}
                        ${statusAtual === 'error' ? 'ring-2 ring-red-400' : ''}
                        ${statusAtual === 'saved' ? 'ring-2 ring-green-400' : ''}
                      `}
                    />
                  </td>
                )
              })}
              <td className="text-center">
                <div className="font-bold">{item.qtd}</div>
                <div className="text-xs">peças</div>
              </td>
              <td className="text-center">{item.userstartedstatus}</td>
              <td className="text-center">
                <span className={`${item.statusPCF == "Produção" ? "bg-green-600 text-white" : item.statusPCF == "Troca Setup" ? "bg-blue-500 text-white" : ""}  px-3 py-1 rounded-xl`}>
                  {item.statusPCF}
                </span>
              </td>

              <td className="text-center">
                <div className="relative">
                  <select
                    defaultValue={item.comprovante || ''}
                    onChange={(e) => atualizarInspecao(item.id, 'comprovante', e.target.value)}
                    className={`w-full px-2 py-1 border rounded-xl transition-all duration-200
                      ${status[`${item.id}-comprovante`] === 'saving' ? 'opacity-50' : ''}
                      ${status[`${item.id}-comprovante`] === 'error' ? 'border-red-500' : ''}
                      ${status[`${item.id}-comprovante`] === 'saved' ? 'border-green-500' : ''}
                    `}
                  >
                    <option value="">Selecione um comentário</option>
                    <option value="nao_produziu">Máquina não produziu</option>
                    <option value="nao_finalizou_setup">Não finalizou o setup</option>
                  </select>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
