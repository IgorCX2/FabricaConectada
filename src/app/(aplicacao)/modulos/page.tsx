import { Suspense } from "react";
import PaginaModulos from "../../../components/principais/modulos/PaginaModulos";


export default function Modulos() {
    return (
        <Suspense fallback={<div>Carregando módulos...</div>}>
            <PaginaModulos/>
        </Suspense>
    )
}