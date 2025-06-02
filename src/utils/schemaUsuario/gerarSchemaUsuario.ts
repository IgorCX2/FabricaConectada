import { z } from 'zod'
import config from '@/src/utils/schemaUsuario/validacao-config.json'

export function gerarSchemaCadastro() {
  const senhaConfig = config.senha
  let senhaSchema = z.string().min(senhaConfig.minLength, { message: senhaConfig.message.minLength })

  if (senhaConfig.requireUpperCase)
    senhaSchema = senhaSchema.regex(/[A-Z]/, senhaConfig.message.upper)

  if (senhaConfig.requireLowerCase)
    senhaSchema = senhaSchema.regex(/[a-z]/, senhaConfig.message.lower)

  if (senhaConfig.requireNumber)
    senhaSchema = senhaSchema.regex(/[0-9]/, senhaConfig.message.number)

  if (senhaConfig.requireSpecialChar)
    senhaSchema = senhaSchema.regex(/[^a-zA-Z0-9]/, senhaConfig.message.special)

  return z
    .object({
      codigo: z.string().min(config.codigo.minLength, { message: config.codigo.message }),
      nome: z.string().min(1, 'Informe o nome completo'),
      local: z.string().min(1, 'Selecione o local'),
      setor: z.string().min(1, 'Selecione o setor'),
      senha: senhaSchema,
      confirmarSenha: z.string(),
    })
    .refine((data) => data.senha === data.confirmarSenha, {
      message: 'As senhas não coincidem',
      path: ['confirmarSenha'],
    })
}

export function gerarSchemaLogin() {
  const senhaConfig = config.senha
  let senhaSchema = z.string().min(senhaConfig.minLength, { message: senhaConfig.message.minLength })

  if (senhaConfig.requireUpperCase)
    senhaSchema = senhaSchema.regex(/[A-Z]/, senhaConfig.message.upper)

  if (senhaConfig.requireLowerCase)
    senhaSchema = senhaSchema.regex(/[a-z]/, senhaConfig.message.lower)

  if (senhaConfig.requireNumber)
    senhaSchema = senhaSchema.regex(/[0-9]/, senhaConfig.message.number)

  if (senhaConfig.requireSpecialChar)
    senhaSchema = senhaSchema.regex(/[^a-zA-Z0-9]/, senhaConfig.message.special)

  return z.object({
    codigo: z.string().min(config.codigo.minLength, { message: config.codigo.message }),
    senha: senhaSchema,
  })
}
