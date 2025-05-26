import FormularioCadastro from "../../../components/actions/formularioCadastro";

export default function Cadastrar(){
    return(
        <div className="-mt-25 w-full max-w-lg">
            <h1 className="text-[80px] font-black mb-3">CADASTRAR</h1>
            <p>Informe seus dados para realizar o cadastro(a)</p>
            <FormularioCadastro/>
        </div>
    )
}