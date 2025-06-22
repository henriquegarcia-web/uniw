import * as yup from 'yup'
import { isCpfInUse, isEmailInUse } from '@uniw/shared-services'
import { isValidCep, isValidCpf, isValidPhone } from '@uniw/shared-utils'

export const signInSchema = yup.object({
  email: yup
    .string()
    .email('Por favor, insira um e-mail válido.')
    .required('O campo de e-mail é obrigatório.'),
  password: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres.')
    .required('O campo de senha é obrigatório.'),
})

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email('Por favor, insira um e-mail válido.')
    .required('O campo de e-mail é obrigatório.')
    .test('is-email-exists', 'Este e-mail não está em uso.', async (value) => {
      if (!value) return true
      const isExists = await isEmailInUse(value)
      return !!isExists
    }),
})

export const changePasswordSchema = yup.object({
  currentPassword: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres.')
    .required('A senha atual é obrigatória.'),
  newPassword: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres.')
    .required('A nova senha é obrigatória.'),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'As senhas devem ser iguais.')
    .required('Confirme sua nova senha.'),
})

export const changeEmailSchema = yup.object({
  newEmail: yup
    .string()
    .email('Por favor, insira um e-mail válido.')
    .required('O campo de novo e-mail é obrigatório.')
    .test(
      'is-email-unique',
      'Este e-mail já está em uso por outra conta.',
      async (value) => {
        if (!value) return true
        const isTaken = await isEmailInUse(value)
        return !isTaken
      },
    ),
  currentPassword: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres.')
    .required('Sua senha atual é obrigatória para alterar o e-mail.'),
})

export const changePhoneSchema = yup.object({
  newPhone: yup
    .string()
    .required('O novo número de telefone é obrigatório.')
    .test(
      'is-valid-phone',
      'Por favor, insira um número de telefone válido com DDD.',
      (value) => !value || isValidPhone(value),
    ),
  currentPassword: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres.')
    .required('Sua senha atual é obrigatória para alterar o telefone.'),
})

export const addAddressSchema = yup.object({
  nome: yup.string().required('O nome de identificação é obrigatório.'),
  cep: yup
    .string()
    .required('O CEP é obrigatório.')
    .test('is-valid-cep', 'CEP inválido', (value) => !value || isValidCep(value)),
  rua: yup.string().required('A rua é obrigatória.'),
  numero: yup.string().required('O número é obrigatório.'),
  bairro: yup.string().required('O bairro é obrigatório.'),
  estado: yup.string().required('O estado é obrigatório.'),
  cidade: yup.string().required('A cidade é obrigatória.'),
  complemento: yup.string(),
  isDefault: yup.boolean(),
})

// =================================================== APP CLIENTE

export const clientSignUpSchema = yup.object({
  nome: yup.string().required('O campo de nome é obrigatório.'),

  email: yup
    .string()
    .email('Por favor, insira um e-mail válido.')
    .required('O campo de e-mail é obrigatório.')
    .test('is-email-unique', 'Este e-mail já está em uso.', async (value) => {
      if (!value) return true
      const isTaken = await isEmailInUse(value)
      return !isTaken
    }),

  cpf: yup
    .string()
    .required('O campo de CPF é obrigatório.')
    .test('is-cpf-valid', 'Digite um CPF válido.', (value) => {
      if (!value) return true
      return isValidCpf(value)
    })
    .test('is-cpf-unique', 'Este CPF já está em uso.', async (value) => {
      if (!value || !isValidCpf(value)) return true
      const isTaken = await isCpfInUse(value)
      return !isTaken
    }),

  password: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres.')
    .required('O campo de senha é obrigatório.'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas devem ser iguais.')
    .required('Confirme sua senha.'),
})

export const clientUpdateProfileSchema = yup.object({
  email: yup.string().nullable(),
  cpf: yup.string().nullable(),
  telefone: yup
    .string()
    .nullable()
    .test(
      'is-valid-phone',
      'Número de telefone inválido',
      (value) => !value || isValidPhone(value),
    ),
  endereco: yup
    .object()
    .shape({
      cep: yup
        .string()
        .nullable()
        .test('is-valid-cep', 'CEP inválido', (value) => !value || isValidCep(value)),
      rua: yup.string().nullable(),
      numero: yup.string().nullable(),
      bairro: yup.string().nullable(),
      cidade: yup.string().nullable(),
      estado: yup.string().nullable(),
    })
    .nullable(),
})
