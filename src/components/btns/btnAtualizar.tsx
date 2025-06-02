'use client'
export default function AtualizarPagina() {
    const handleRefresh = () => {
        window.location.reload();
    }
    return (
        <button onClick={handleRefresh} className="py-1.5 px-4 font-bold rounded-lg border-2 border-[#2a2a31]">Pesquisar</button>
    )
}
