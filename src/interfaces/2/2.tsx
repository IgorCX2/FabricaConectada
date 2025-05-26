import Main from "../../components/principais/main"

export default function InspecaoProgramada() {
  const maquinas = [
    {
      id: 1,
      nome: "maquina",
      local: "local",
      ordem: "15154",
      peca: "15154",
      t01: true,
      t02: false,
      lib: false,
      qtd: 100,
      operador: "Igor C.",
      status: "produzindo"
    },
    {
      id: 2,
      nome: "maquina",
      local: "local",
      ordem: "15154",
      peca: "15154",
      t01: true,
      t02: false,
      lib: false,
      qtd: 100,
      operador: "Igor C.",
      status: "produzindo"
    }
  ]
  return (
    <Main titulo="Inspeções" descricao="Veja o local e situação das inpeções de rotina da planta">
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
          <input className="py-1.5 px-4 rounded-lg border-1 border-[#d1d5db]" type="text" placeholder="pesquisar inspeção" />
          <button className="py-1.5 px-4 font-bold rounded-lg border-2 border-[#2a2a31]">Pesquisar</button>
          <button className="ml-3 py-2 px-5 text-white bg-[#2a2a31] font-bold rounded-lg">Imprimir</button>
        </div>
      </section>
      <section className="mt-5 overflow-x-auto">
        <table className="min-w-full table-fixed border-separate border-spacing-y-2">
          <thead className="bg-[#F3F2F4] text-gray-800">
            <tr>
              <th className="text-left px-4 py-5 w-[200px]">maquina</th>
              <th className="px-2 ">Ordem P.</th>
              <th className="px-2">Peça</th>
              <th className="px-2 w-[50px]">T01</th>
              <th className="px-2 w-[50px]">T02</th>
              <th className="px-2 w-[50px]">Lib</th>
              <th className="px-2">Qtd</th>
              <th className="px-2">Operador</th>
              <th className="px-2">Status</th>
              <th className="px-2">Comentário</th>
            </tr>
          </thead>
          <tbody>
            {maquinas.map((item) => (
              <tr key={item.id} className="bg-white rounded shadow-xs">
                <td className="flex items-center gap-2 px-4 py-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-800"></div>
                  <div>
                    <div className="font-bold">{item.nome}</div>
                    <div className="text-xs text-gray-600 -mt-2">{item.local}</div>
                  </div>
                </td>
                <td>
                  <div className="bg-[#F3F2F4] px-2 py-1 mx-4 rounded-xl text-center">{item.ordem}</div>
                </td>
                <td>
                  <div className="bg-[#F3F2F4] px-2 py-1 mx-4 rounded-xl text-center ">{item.peca}</div>
                </td>
                <td className="text-center">
                  <input type="checkbox" checked={item.t01} readOnly className="accent-cyan-800 w-5 h-5 " />
                </td>
                <td className="text-center">
                  <input type="checkbox" checked={item.t02} readOnly className="accent-cyan-800 w-5 h-5" />
                </td>
                <td className="text-center">
                  <input type="checkbox" checked={item.lib} readOnly className="accent-cyan-800 w-5 h-5" />
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
                  <select className="w-full px-2 py-1 border rounded-xl">
                    <option value="">Selecione</option>
                    <option value="nao_produziu">Máquina não produziu</option>
                    <option value="nao_finalizou_setup">Não finalizou o setup</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Main>
  )
}