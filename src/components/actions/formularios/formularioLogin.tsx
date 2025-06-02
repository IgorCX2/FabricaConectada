'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { loginUsuario } from '@/src/utils/apis/auth'
import { gerarSchemaLogin } from '@/src/utils/schemaUsuario/gerarSchemaUsuario'

const schema = gerarSchemaLogin()
type FormData = z.infer<typeof schema>

export default function FormularioLogin() {
    const router = useRouter()
    const [response, setResponse] = useState('')
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema), mode: 'onChange' })

    const onSubmit = async (data: FormData) => {
        const dataResponse = await loginUsuario(data)
        if (dataResponse.status == 200) {
            return router.push('/');
        }
        setResponse(dataResponse.msg);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-14">
            <input type="text" placeholder="Código do usuário" {...register('codigo')} className="w-full border border-[#D1D5DB] py-2.5 px-5 rounded-lg" />
            {errors.codigo && <span className="text-sm text-red-500">{errors.codigo.message}</span>}

            <input type="password" placeholder="Senha do usuário" {...register('senha')} className="w-full border border-[#D1D5DB] py-2.5 px-5 rounded-lg" />
            {errors.senha && <span className="text-sm text-red-500">{errors.senha.message}</span>}
            <Link href="#" className="text-sm text-right  hover:underline">Esqueceu a senha?</Link>

            <button type="submit" disabled={isSubmitting} className="w-full py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold mt-9 disabled:opacity-50">
                {isSubmitting ? 'Entrando...' : 'Entrar'}
            </button>
            {response && <span className="text-center text-red-500">{response}</span>}
        </form>
    )
}