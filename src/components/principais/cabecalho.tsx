'use client'
import { usePathname } from 'next/navigation'

interface CabecalhoPropos{
  descricaoModulo?: string[]
}

export default function Cabecalho({descricaoModulo}: CabecalhoPropos){
    const pathname = usePathname().split('/')
    return(
        <section className="mt-2">
            <div>
                <a className="text-[#AAAAAA]">Tarefas</a>
                <span className="font-extrabold text-[#AAAAAA]"> &gt; </span>
                <strong>{pathname[1].charAt(0)?.toUpperCase() + pathname[1].slice(1)}</strong>
            </div>
            <h1 className="text-5xl font-black mt-7">{descricaoModulo[0]?.toUpperCase()}</h1>
            <p className="mt-5">{descricaoModulo[1]}</p>
        </section>
    )
}