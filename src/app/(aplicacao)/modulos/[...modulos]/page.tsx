import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import RegistrarAcesso from "@/src/components/principais/modulos/registroAcesso";

export async function generateStaticParams() {
    const res = await fetch("http://localhost:3001/api/sistema/modulos", {
        cache: "force-cache",
    });
    const dados: { modulos: string[] }[] = await res.json();
    return dados.map((item) => ({
        modulos: item.modulos,
    }));
}

export default async function Page({ params, }: { params: Promise<{ modulos: string }> }) {
    const { modulos } = await params
    const id = Number(modulos?.[1]?.slice(1))
    if (!id) return <div>Módulo inválido</div>;

    const token = (await cookies()).get('token').value
    if (!token) return <div>Token não encontrado.</div>;

    const { perm } = jwt.decode(token) as { perm: string };
    const ids = perm?.split(',');

    if (!ids.includes(modulos?.[1]?.slice(1))) {
        return <div>Acesso negado ao módulo {id}</div>;
    }
    
    let Modulo: React.ComponentType;

    try {
        Modulo = (await import(`@/src/interfaces/${id}/${id}`)).default;
    } catch (error) {
        return <div>Módulo não encontrado</div>;
    }
    return (
        <>
            <RegistrarAcesso id={id}/>
            <Modulo/>
        </>
    );
}