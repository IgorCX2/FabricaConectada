// interfaces/2/components/buscar.tsx

export default async function Buscar() {
  const res = await fetch('http://localhost:3001/api/sistema/horario', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Erro ao buscar horário');
  }

  const data = await res.json();

  return (
    <div>
      Horário atual (UTC): {data.horario}
    </div>
  );
}
