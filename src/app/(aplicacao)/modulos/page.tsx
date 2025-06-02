import PaginaModulos from "@/src/components/principais/modulos/PaginaModulos";
import { Suspense } from "react";

export default function Modulos() {
    return (
        <Suspense fallback={<div>Carregando módulos...</div>}>
            <PaginaModulos/>
        </Suspense>
    )
}