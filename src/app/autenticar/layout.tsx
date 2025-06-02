import Image from "next/image";
import Link from "next/link";

export default function LayoutConta({children}: {children: React.ReactNode}){
    return(
        <body className="h-dvh p-3 box-border">
            <main className="flex w-full h-full">
                <section className="w-full xl:w-3/5 flex flex-col justify-between items-center-safe bg-red- py-5">
                    <div className="w-60 h-12 relative"><Image src="/empresa/logoCompleta.png" alt="LogoEmpresa" fill className="object-contain"/></div>
                    {children}
                    <Link href={"cadastrar"}>Não tem acesso? <u className="font-bold">peça seu login =)</u></Link>
                </section>
                <section className="rounded-3xl bg-black w-full hidden xl:flex relative"><Image src="/empresa/banner.jpg" alt="BannerPrincipal" fill className="object-contain"/></section>
            </main>
        </body>
    )
}