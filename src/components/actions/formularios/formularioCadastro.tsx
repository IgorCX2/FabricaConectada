'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { cadastroUsuario } from '@/src/utils/apis/auth'
import { carregarTodosDepartamento } from '@/src/utils/apis/api'
import { gerarSchemaCadastro } from '@/src/utils/schemaUsuario/gerarSchemaUsuario'

const schema = gerarSchemaCadastro()
type FormData = z.infer<typeof schema>

export default function FormularioCadastro() {
  const router = useRouter()
  const [response, setResponse] = useState('')
  const [locais, setLocais] = useState<string[]>([])
  const [setores, setSetores] = useState<string[]>([])
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })
  const senha = watch('senha') || ''
  useEffect(() => {
    async function fetchLocaisSetores() {
      try {
        const data = await carregarTodosDepartamento()
        setLocais(data.locais)
        setSetores(data.setores)
      } catch (error) {
        console.error('Erro ao carregar locais e setores:', error)
      }
    }
    fetchLocaisSetores()
  }, [])

  const requisitos = {
    min: senha.length >= 6,
    upper: /[A-Z]/.test(senha),
    lower: /[a-z]/.test(senha),
    number: /[0-9]/.test(senha),
    special: /[^a-zA-Z0-9]/.test(senha),
  }

  const onSubmit = async (data: FormData, e: React.FormEvent) => {
    const dataResponse = await cadastroUsuario(data)
    if(dataResponse.status == 200){
      return router.push('/autenticar/entrar')
    }
    setResponse(dataResponse.msg);
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
            {locais.map((local) => (
              <option key={local} value={local}>{local}</option>
            ))}
          </select>
          {errors.local && <span className="text-sm text-red-500">{errors.local.message}</span>}
        </div>

        <div className="w-full">
          <select {...register('setor')} className="w-full border border-[#D1D5DB] py-2.5 px-5 rounded-lg">
            <option value="">Selecione o setor</option>
            {setores.map((setor) => (
              <option key={setor} value={setor}>{setor}</option>
            ))}
          </select>
          {errors.setor && <span className="text-sm text-red-500">{errors.setor.message}</span>}
        </div>
      </div>

      <div>
        <input type="password" placeholder="Senha do usuário" {...register('senha')} className="w-full border border-[#D1D5DB] py-2.5 px-5 rounded-lg" />
        {errors.senha && <span className="text-sm text-red-500">{errors.senha.message}</span>}
        {senha && (
          <div className="text-sm mt-2 text-gray-600">
            {!requisitos.min && <p>• Mínimo 6 caracteres</p>}
            {!requisitos.upper && <p>• Letra maiúscula</p>}
            {!requisitos.lower && <p>• Letra minúscula</p>}
            {!requisitos.number && <p>• Número</p>}
            {!requisitos.special && <p>• Caractere especial</p>}
          </div>
        )}
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
