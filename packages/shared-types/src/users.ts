import { IClub } from './club'
import { ILoyalty } from './loyalty'
import { INotification, INotificationSettings } from './notification'
import { ICreditCard } from './payment'
import { FormattedOption } from './shared'

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

// ─── ADDRESS TYPES ──────────────────────────────────────────────────────────

export interface IAddress {
  id: string
  nome: string // Ex: "Casa", "Trabalho"
  cep: string
  rua: string
  numero: string
  bairro: string
  cidade: string
  estado: string
  complemento?: string
  isDefault: boolean
}

// ─── USER TYPES ─────────────────────────────────────────────────────────────

export interface IBaseProfile {
  nome: string
  email: string
  cpf: string

  foto: string | null
  telefone: string | null
  dataNascimento: number | null

  verificacoes: {
    identidade: boolean
    telefone: boolean
  }

  authProviders: IAuthProviderData[]
}

export interface IClienteProfile {
  favoritos: string[] | null
  historicoCompras: string[] | null
  historicoAgendamentos: string[] | null

  clube: IClub | null
  fidelidade: ILoyalty

  notifications: INotification[] | null
  notificationsSettings: INotificationSettings

  cartoesSalvos: ICreditCard[] | null
  enderecosSalvos: IAddress[] | null
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
