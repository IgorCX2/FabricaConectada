'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import Link from "next/link"
import { useRouter } from 'next/navigation'

const schema = z.object({
    codigo: z.string().min(5, { message: 'Mínimo 5 caracteres' }),
    senha: z.string().min(6, { message: 'Mínimo 6 caracteres' })
        .regex(/[A-Z]/, 'Uma letra maiúscula')
        .regex(/[a-z]/, 'Uma letra minúscula')
        .regex(/[0-9]/, 'Um número')
        .regex(/[^a-zA-Z0-9]/, 'Um caractere especial'),
})

type FormData = z.infer<typeof schema>

export default function FormularioLogin() {
    const router = useRouter()
    const [senha, setSenha] = useState('')
    const [response, setResponse] = useState('')
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema), mode: 'onChange' })
    const requisitos = {
        min: senha.length >= 6,
        upper: /[A-Z]/.test(senha),
        lower: /[a-z]/.test(senha),
        number: /[0-9]/.test(senha),
        special: /[^a-zA-Z0-9]/.test(senha),
    }
    const onSubmit = async (data: FormData) => {
        const res = await fetch("http://localhost:3001/api/auth/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(data)
        });
        const dataResponse = await res.json();

        if (!res.ok) {
            setResponse(dataResponse.msg || 'Erro no login');
            return;
        }

        return router.push('/');
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-14">
            <input type="text" placeholder="Código do usuário" {...register('codigo')} className="w-full border border-[#D1D5DB] py-2.5 px-5 rounded-lg" />
            {errors.codigo && <span className="text-sm text-red-500">{errors.codigo.message}</span>}

            <input type="password" placeholder="Senha do usuário" {...register('senha')} onChange={(e) => setSenha(e.target.value)} className="w-full border border-[#D1D5DB] py-2.5 px-5 rounded-lg" />
            {errors.senha && <span className="text-sm text-red-500">{errors.senha.message}</span>}
            {senha &&
                <div className="text-sm mt-2 text-gray-600">
                    {!requisitos.min && <p>• Mínimo 6 caracteres</p>}
                    {!requisitos.upper && <p>• Letra maiúscula</p>}
                    {!requisitos.lower && <p>• Letra minúscula</p>}
                    {!requisitos.number && <p>• Número</p>}
                    {!requisitos.special && <p>• Caractere especial</p>}
                </div>
            }
            <Link href="#" className="text-sm text-right  hover:underline">Esqueceu a senha?</Link>

            <button type="submit" disabled={isSubmitting} className="w-full py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold mt-9 disabled:opacity-50">
                {isSubmitting ? 'Entrando...' : 'Entrar'}
            </button>
            {response && <span className="text-center text-red-500">{response}</span>}
        </form>
    )
}
