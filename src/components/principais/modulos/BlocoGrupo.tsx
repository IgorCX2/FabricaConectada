import Link from "next/link";

type Modulo = {
  id: number;
  nomeMenu: string;
  cor: string;
  descricao: string
};

export default function BlocoGrupo({ grupo, modulos }: { grupo: string; modulos: Modulo[] }) {
  return (
    <section className="mt-17 flex flex-col gap-10">
      <h1 className="text-2xl font-bold"> {grupo.charAt(0).toUpperCase() + grupo.slice(1)}</h1>
      <div className="flex flex-wrap gap-4">
        {modulos.map(modulo => (
          <div key={modulo.id} className="bg-white flex flex-col shadow-lg rounded-xl py-5 px-5 h-55 w-100 justify-between">
            <div className="flex flex-col gap-5">
              <h2 className="text-2xl font-bold">{modulo.nomeMenu}</h2>
              <p>{modulo.descricao}</p>
            </div>
            <div className="text-right">
              <Link href={'/modulos/'+grupo+'/'+grupo[0].toUpperCase()+modulo.id}  className="py-2 px-5 text-white font-bold rounded-lg"style={{ backgroundColor: modulo.cor }}>Acessar</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
