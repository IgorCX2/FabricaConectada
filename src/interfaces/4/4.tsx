import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Main from "@/src/components/principais/main";
import UserButtons from "./components/userButtons";
import UserModalConfig from "./components/userModalConfig";
import { cargosDepartamento, carregarPermissoesDepartamento, usuariosDepartamento } from "@/src/utils/apis/api";

export default async function GerencialUsuarios() {
  const token = (await cookies()).get("token").value;
  const { departamento, fabrica, id } = jwt.decode(token);

  const dadosUsuarios = await usuariosDepartamento(departamento, fabrica)
  const buscarcargosDepartamento = await cargosDepartamento(departamento)
  const permissoesDepartamento = await carregarPermissoesDepartamento(departamento);

  return (
    <Main titulo="Solicitação de login" descricao="Gerencie os acessos ao seu time">
      <section className="mt-17 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Lista de Usuários Ativos</h1>
        <div className="flex items-center gap-2">
          <input className="py-1.5 px-4 rounded-lg border border-[#d1d5db]" type="text" placeholder="pesquisar usuários" />
          <button className="py-1.5 px-4 font-bold rounded-lg border-2 border-[#2a2a31]">Pesquisar</button>
          <button className="ml-3 py-2 px-5 text-white bg-[#2a2a31] font-bold rounded-lg">+ Cargo</button>
        </div>
      </section>
      <section className="mt-5 overflow-x-auto">
        <table className="min-w-full table-fixed border-separate border-spacing-y-2">
          <thead className="bg-[#F3F2F4] text-gray-800">
            <tr>
              <th className="text-left px-4 py-5">Nome</th>
              <th className="text-left px-4 py-5 w-4/7">Acessos</th>
              <th className="text-left px-4 py-5">Status</th>
              <th className="text-left px-4 py-5">Data Cadastro</th>
              <th className="text-left px-4 py-5">Data Atualização</th>
              <th className="px-6 py-3 text-right">⋮</th>
            </tr>
          </thead>
          <tbody>
            {dadosUsuarios.map((usuario, index) => {
              if (usuario.id != id) {
                return (
                  <tr key={index} className="bg-white rounded shadow-xs">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-cyan-800"></div>
                      <div>
                        <div className="font-medium text-gray-900">{usuario.nome}</div>
                        <div className="text-gray-500 -mt-1 text-xs">{usuario?.cargo?.cargo}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      {usuario.perm?.split(',').map((perm, index) => (
                        <UserButtons btnID={perm} key={index} />
                      ))}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{usuario.status?.split('.')[0]}</td>
                    <td className="px-6 py-4 text-gray-700">Mar 4, 2024</td>
                    <td className="px-6 py-4 text-gray-700">July 4, 2022</td>
                    <UserModalConfig usuario={usuario} departamentoPerm={permissoesDepartamento} cargos={buscarcargosDepartamento} />
                  </tr>
                )
              }

            }
            )}
          </tbody>
        </table>
      </section>
    </Main>
  );
}
