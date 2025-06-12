// src/types/auth.ts

import * as yup from 'yup'

import { FormattedOption } from './global'
import { isCpfInUse, isEmailInUse } from '@/services/auth'
import { isValidCep, isValidCpf, isValidPhone } from '@/utils/validators'

// ─── USER ROLES ─────────────────────────────────────────────────────────────

export enum UserRole {
  CLIENTE = 'cliente',
  PARCEIRO = 'parceiro',
  FORNECEDOR = 'fornecedor',
  ADMINISTRADOR = 'admin',
}

export const getRoleData = (role?: UserRole): FormattedOption => {
  switch (role) {
    case UserRole.CLIENTE:
      return { label: 'Cliente', color: '#E67E22' }
    case UserRole.PARCEIRO:
      return { label: 'Parceiro', color: '#C0392B' }
    case UserRole.FORNECEDOR:
      return { label: 'Prefeito', color: '#27AE60' }
    case UserRole.ADMINISTRADOR:
      return { label: 'Vereador', color: '#F1C40F' }

    default:
      return { label: 'Desconhecido', color: '#5D6D7E' }
  }
}

// ─── USER STATUS ────────────────────────────────────────────────────────────

export enum UserStatus {
  ATIVO = 'ativo',
  INATIVO = 'inativo',
  BLOQUEADO = 'bloqueado',
  PENDENTE = 'pendente',
}

export const getStatusData = (status?: UserStatus): FormattedOption => {
  switch (status) {
    case UserStatus.ATIVO:
      return { label: 'Ativo', color: '#2E8B57' }
    case UserStatus.INATIVO:
      return { label: 'Inativo', color: '#808080' }
    case UserStatus.BLOQUEADO:
      return { label: 'Bloqueado', color: '#FF4500' }
    case UserStatus.PENDENTE:
      return { label: 'Pendente', color: '#FFA500' }
    default:
      return { label: 'Desconhecido', color: '#808080' }
  }
}

// ─── PAYMENT TYPES ──────────────────────────────────────────────────────────

export enum CardBrand {
  VISA = 'visa',
  MASTERCARD = 'mastercard',
  AMEX = 'amex',
  ELO = 'elo',
  HIPERCARD = 'hipercard',
  UNKNOWN = 'unknown',
}

export interface ICreditCard {
  id: string
  last4: string
  brand: CardBrand
  expiryMonth: number
  expiryYear: number
  isDefault: boolean
}

// ─── AUTH TYPES ─────────────────────────────────────────────────────────────

export enum AuthProvider {
  EMAIL = 'password',
  GOOGLE = 'google.com',
  FACEBOOK = 'facebook.com',
  APPLE = 'apple.com',
}

export interface IAuthProviderData {
  providerId: AuthProvider
  uid: string
  email: string | null
}

// ─── USER TYPES ─────────────────────────────────────────────────────────────

export interface IBaseProfile {
  nome: string
  email: string
  cpf: string

  foto: string | null
  telefone: string | null
  dataNascimento: number | null
  endereco: {
    cep: string | null
    rua: string | null
    numero: string | null
    bairro: string | null
    cidade: string | null
    estado: string | null
  }

  authProviders: IAuthProviderData[]
}

export interface IClienteProfile {
  favoritos: string[] | null
  historicoCompras: string[] | null
  historicoAgendamentos: string[] | null

  cartoesSalvos: ICreditCard[] | null
}

export interface IUser {
  id: string
  role: UserRole
  status: UserStatus

  baseProfile: IBaseProfile
  clienteProfile: IClienteProfile | null

  createdAt: number
  updatedAt: number
}

// ─── SCHEMAS ────────────────────────────────────────────────────────────────

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

export const signUpSchema = yup.object({
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

export const updateProfileSchema = yup.object({
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
