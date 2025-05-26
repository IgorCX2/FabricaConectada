import Link from "next/link";
import FormularioLogin from "../../../components/actions/formularioLogin";

export default function Entrar(){
    return(
        <div className="-mt-25 w-full max-w-lg">
            <h1 className="text-[90px] font-black mb-3">LOGAR</h1>
            <p>Realize o seu login com seu usuario e senha que foi cadastrado(a)</p>
            <FormularioLogin/>
        </div>
    )
}