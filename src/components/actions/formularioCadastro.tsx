'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const schema = z
    .object({
        codigo: z.string().min(1, 'Informe o código do usuário'),
        nome: z.string().min(1, 'Informe o nome completo'),
        local: z.string().min(1, 'Selecione o local'),
        setor: z.string().min(1, 'Selecione o setor'),
        senha: z.string().min(6, { message: 'Mínimo 6 caracteres' })
            .regex(/[A-Z]/, 'Letra maiúscula')
            .regex(/[a-z]/, 'Letra minúscula')
            .regex(/[0-9]/, 'Número')
            .regex(/[^a-zA-Z0-9]/, 'Caractere especial'),
        confirmarSenha: z.string(),
    })
    .refine(data => data.senha == data.confirmarSenha, {
        message: 'As senhas não coincidem',
        path: ['confirmarSenha'],
    })

type FormData = z.infer<typeof schema>

export default function FormularioCadastro() {
    const router = useRouter()
    const [senha, setSenha] = useState('')
    const [response, setResponse] = useState('')
    const { register, handleSubmit, formState: { errors, isSubmitting }, watch, } = useForm<FormData>({ resolver: zodResolver(schema), mode: 'onChange', })

    const requisitos = {
        min: senha.length >= 6,
        upper: /[A-Z]/.test(senha),
        lower: /[a-z]/.test(senha),
        number: /[0-9]/.test(senha),
        special: /[^a-zA-Z0-9]/.test(senha),
    }

    const onSubmit = async (data: FormData,e: React.FormEvent) => {
        console.log('Dados de cadastro:', data)
        const res = await fetch("http://localhost:3001/api/auth/cadastro", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const dataResponse = await res.json();
        console.log(dataResponse)
        if (!res.ok) {
            setResponse(dataResponse.msg || 'Erro no Cadastro')
            return
        }
        return router.push('/autenticar/entrar')
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-14">
            <div className="flex gap-5">
                <div className="w-full">
                    <input type="text" placeholder="Código do usuário" {...register('codigo')} className="w-full border border-[#D1D5DB] py-2.5 px-5 rounded-lg" />
                    {errors.codigo && <span className="text-sm text-red-500">{errors.codigo.message}</span>}
                </div>

                <div className="w-full">
                    <input type="text" placeholder="Nome completo" {...register('nome')} className="w-full border border-[#D1D5DB] py-2.5 px-5 rounded-lg" />
                    {errors.nome && <span className="text-sm text-red-500">{errors.nome.message}</span>}
                </div>
            </div>

            <div className="flex gap-5">
                <div className="w-full">
                    <select {...register('local')} className="w-full border border-[#D1D5DB] py-2.5 px-5 rounded-lg">
                        <option value="">Selecione o local</option>
                        <option value="administrativo"></option>
                        <option value="operacional">Operacional</option>
                    </select>
                    {errors.local && <span className="text-sm text-red-500">{errors.local.message}</span>}
                </div>

                <div className="w-full">
                    <select {...register('setor')} className="w-full border border-[#D1D5DB] py-2.5 px-5 rounded-lg">
                        <option value="">Selecione o setor</option>
                        <option value="supervisor">Supervisor</option>
                        <option value="funcionario">Funcionário</option>
                    </select>
                    {errors.setor && <span className="text-sm text-red-500">{errors.setor.message}</span>}
                </div>
            </div>

            <div>
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
            </div>
            <div>
                <input type="password" placeholder="Confirmar senha" {...register('confirmarSenha')} className="w-full border border-[#D1D5DB] py-2.5 px-5 rounded-lg" />
                {errors.confirmarSenha && <span className="text-sm text-red-500">{errors.confirmarSenha.message}</span>}
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full py-2.5 rounded-lg bg-red-500 text-white font-bold mt-9 disabled:opacity-50">
                {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
            </button>
            {response && <span className="text-center text-red-500">{response}</span>}
        </form>
    )
}
