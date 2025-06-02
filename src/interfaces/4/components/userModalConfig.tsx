'use client';

import { atualizarUser } from "@/src/utils/apis/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function UserModalConfig({ usuario, departamentoPerm, cargos }) {
  const router = useRouter()
  const [modal, setModal] = useState(false);

  const [permissoesSelecionadas, setPermissoesSelecionadas] = useState<string[]>([]);
  const [cargoSelecionado, setCargoSelecionado] = useState<string>('');
  const [statusSelecionado, setStatusSelecionado] = useState<string>('ativo');
  const [turnoSelecionado, setTurnoSelecionado] = useState<string | null>(null);

  useEffect(() => {
    setPermissoesSelecionadas(usuario.perm ? usuario.perm.split(',') : []);
    setCargoSelecionado(usuario?.cargo?.id || '');
    setStatusSelecionado(usuario.status || 'ativo');
  }, [usuario]);

  const alternarPermissao = (id: string) => {
    setPermissoesSelecionadas(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const salvarConfiguracoes = async (refresh: () => void) => {
    const body = {
      id: usuario.id,
      perm: permissoesSelecionadas.join(','),
      cargo_id: cargoSelecionado || null,
      status: statusSelecionado,
      // turno: turnoSelecionado
    };
    const atualizarUsuario = await atualizarUser(body)
    if (atualizarUsuario.status != 200) {
      alert(atualizarUsuario.msg);
    } else {
      refresh();
      setModal(false)
    }
  };

  return (
    <td className="px-6 py-4 text-right">
      <button onClick={() => setModal(true)} className="text-xl px-2">⋮</button>
      {modal && createPortal(
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white px-6 py-10 rounded shadow-lg w-2/5 max-w-[650px]">
            <div className="w-full flex justify-between font-semibold text-xl pb-3">
              <h1>Configurações do usuário</h1>
              <button className="px-2" onClick={() => setModal(false)}>X</button>
            </div>

            <div className="w-full h-px bg-gray-300 my-3" />

            <div className="w-full flex justify-between font-semibold text-xl items-center">
              <div className="flex gap-2 my-5 items-center">
                <div className="w-17 h-17 rounded-full bg-cyan-800"></div>
                <div className="flex flex-col">
                  <div className="font-medium text-gray-900">{usuario.nome}</div>
                  <select
                    className="text-gray-500 text-xs"
                    value={cargoSelecionado}
                    onChange={(e) => setCargoSelecionado(e.target.value)}
                  >
                    <option value={usuario?.cargo?.id || null}>{usuario?.cargo?.cargo || "Selecione um cargo"}</option>
                    {cargos
                      .filter(cargo => cargo.id !== usuario?.cargo?.id)
                      .map((cargo) => (
                        <option key={cargo.id} value={cargo.id}>{cargo.cargo}</option>
                      ))}
                  </select>
                </div>
              </div>
              <div>
                <select
                  className="text-blue-500 text-sm"
                  value={statusSelecionado}
                  onChange={(e) => setStatusSelecionado(e.target.value)}
                >
                  {usuario.status?.split('.')[0] == "aprovar" && <option value={usuario.status}>aprovacao</option>}
                  <option value="ativo">Ativo</option>
                  <option value="desativo">Desativo</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-5">
              <h2>Turno</h2>
              <div className="w-full flex gap-3 my-2 flex-wrap">
                {['1º Turno', '2º Turno', '3º Turno', 'Comercial'].map(turno => (
                  <button
                    key={turno}
                    className={`w-[48%] py-2 rounded ${turnoSelecionado === turno ? 'bg-blue-200 font-semibold' : 'bg-gray-200'}`}
                    onClick={() => setTurnoSelecionado(turnoSelecionado === turno ? null : turno)}
                  >
                    {turno}
                  </button>
                ))}
              </div>
              <span className="text-center text-sm">Não selecione nada caso necessite ficar logado o dia todo</span>
            </div>

            <div className="w-full flex justify-between font-semibold text-xl pb-3 mt-10">
              <h1>Permissões do usuário</h1>
            </div>
            <div className="w-full h-px bg-gray-300 my-3" />

            <div className="flex gap-2 mt-5 flex-wrap">
              {departamentoPerm.map((btn, index) => (
                <span
                  key={index}
                  onClick={() => alternarPermissao(btn.id.toString())}
                  style={{
                    backgroundColor: permissoesSelecionadas.includes(btn.id.toString()) ? btn.cor : '#eee',
                    color: '#333',
                  }}
                  className="cursor-pointer inline-block px-3 py-2 text-xs font-medium rounded-full hover:brightness-95 transition-all"
                >
                  {btn.nomeMenu}
                </span>
              ))}
            </div>

            <div className="mt-10 text-right">
              <button
                onClick={() => salvarConfiguracoes(() => router.refresh())}
                className="bg-blue-500 text-white py-2 px-6 rounded-2xl"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </td>
  );
}
