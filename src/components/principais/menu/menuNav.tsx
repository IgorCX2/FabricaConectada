import Link from "next/link";;
import Image from "next/image";
import MenuMovel from "./menuMovel";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default async function MenuNav() {
    const token = (await cookies()).get('token').value
    const tokenDeco = jwt.decode(token)
    const { nome, cargo, departamento, fabrica } = jwt.decode(token) as { nome, fabrica,departamento, cargo: string };
    return (
        <aside className="group z-20 fixed shadow-xs left-0 top-0 h-dvh px-1 hover:pr-7 hover:pl-3 bg-linear-to-t from-[#F3F2F4] from-80% to-white w-14 hover:w-70 py-3 duration-300 flex flex-col items-center justify-between">
            <div className="flex flex-col w-full">
                <div className="flex w-full flex items-center">
                    <div className="w-14 h-14 relative shrink-0">
                        <Image src="/empresa/logoResumida.png" alt="LogoEmspresa" fill className="object-contain" />
                    </div>
                    <div className="flex w-full justify-between opacity-0 group-hover:flex hidden group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        <div>
                            <h1>Hutchinson</h1>
                            <h2 className="text-xl font-bold -mt-2">{fabrica}</h2>
                        </div>
                        <span className="rotate-90">•••</span>
                    </div>
                </div>
                <div className="w-full h-1 bg-gradient-to-r from-gray-50 from-10% via-white to-gray-50 my-1 from-10%" />
            </div>
            <nav className="flex w-full flex-col py-5 h-full justify-between">
                <div className="flex flex-col gap-3">
                    {[
                        { href: '/', label: 'Home', icon: '/icones/home.png' },
                        { href: '/relatorios', label: 'Relatórios', icon: '/icones/dashboard.png' },
                        { href: '/', label: 'Calendário', icon: '/icones/calendario.png' },
                        
                    ].map((item, idx) => (
                        <Link href={item.href} key={idx} className="flex items-center gap-3 px-2 py-2 hover:bg-gray-200 rounded-md">
                            <div className="w-7 h-7 relative shrink-0">
                                <Image src={item.icon} alt={item.label} fill className="object-contain" />
                            </div>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                {item.label}
                            </span>
                        </Link>
                    ))}
                    <MenuMovel />
                </div>
                <div>
                    <Link href={"/suporte"} className="flex items-center gap-3 px-2 py-2 hover:bg-gray-300 rounded-md">
                        <div className="w-7.5 h-7.5 relative shrink-0">
                            <Image src={"/icones/suporte.png"} alt={"suporte"} fill className="object-contain" />
                        </div>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Suporte</span>
                    </Link>
                </div>
            </nav>
            <div className="flex w-full gap-5 flex items-center">
                <div className="w-10 h-10 relative shrink-0">
                    <Image src="/users/31231.png" alt="LogoEmspresa" fill className="object-contain" />
                </div>
                <div className="flex w-full justify-between opacity-0 group-hover:flex hidden group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    <div>
                        <h1>{departamento}</h1>
                        <h2 className="text-xl font-bold -mt-2">{nome}</h2>
                    </div>
                    <span className="rotate-90">•••</span>
                </div>
            </div>
        </aside>
    )
}