import { IClub } from './club'
import { ILoyalty } from './loyalty'
import { INotification, INotificationSettings } from './notification'
import {
  IAcceptablePaymentMethods,
  ICreditCard,
  IPayoutConfig,
  ISubscription,
} from './payment'
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
      return { label: 'Cliente', color: '#E67E22' };
    case UserRole.PARCEIRO:
      return { label: 'Parceiro', color: '#C0392B' };
    case UserRole.FORNECEDOR:
      return { label: 'Fornecedor', color: '#27AE60' }; 
    case UserRole.ADMINISTRADOR:
      return { label: 'Admin', color: '#F1C40F' }; 

    default:
      return { label: 'Desconhecido', color: '#5D6D7E' };
  }
};

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

// ─── SOCIAL MEDIA TYPES ─────────────────────────────────────────────────────

export interface ISocialMedias {
  instagram: string | null
  facebook: string | null
  x: string | null
  youtube: string | null
  tiktok: string | null
  kwai: string | null
  pinterest: string | null
  threads: string | null
  website: string | null
  whatsapp: string | null
}

// ─── PARTNER TYPES ──────────────────────────────────────────────────────────

export interface IBusinessHours {
  [day: string]: {
    // Ex: 'segunda', 'terca', 'sabado'
    aberto: boolean
    horarios: { inicio: string; fim: string }[] // Permite múltiplos turnos, ex: 08:00-12:00 e 14:00-18:00
  }
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

export interface IClientProfile {
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

export interface IPartnerProfile {
  info: {
    idLoja: string
    nomeLoja: string
    slug: string // URL amigável, ex: /loja/nome-da-loja
    cnpjCpf: string
    descricao: string
    endereco: IAddress
    redesSociais: ISocialMedias
    horarioFuncionamento: IBusinessHours
  }
  config: {
    meiosPagamento: IAcceptablePaymentMethods[]
  }
  financeiro: {
    assinatura: ISubscription
    configRepasse: IPayoutConfig
    faturamentoMensal: number | null
  }
  equipe: {
    colaboradores: {
      userId: string
      cargo: string
      comissao: {
        tipo: 'percentual' | 'fixo'
        valor: number
      }
    }[]
  } | null
  status: {
    aprovado: boolean // Se foi aprovado pelo ADM
    online: boolean // Se a loja está visível para os clientes
  }
}

export interface ISupplierProfile {
  info: {
    idEmpresa: string
    nomeEmpresa: string
    cnpj: string
    endereco: IAddress
  }
  config: {
    contaPublica: boolean // Se o catálogo é visível para todos ou só para parceiros conectados
  }
  financeiro: {
    assinatura: ISubscription
    configRepasse: IPayoutConfig
  }
  relacionamento: {
    clientes: string[] | null // Array de partner IDs que compram deste fornecedor
  }
}

export interface IAdminProfile {
  permissoes: {
    gerenciarUsuarios: boolean
    gerenciarProdutos: boolean
    gerenciarFinancas: boolean
    verRelatorios: boolean
    moderarConteudo: boolean
  }
}

export interface IUser {
  id: string
  role: UserRole
  status: UserStatus

  baseProfile: IBaseProfile
  clientProfile: IClientProfile | null
  partnerProfile: IPartnerProfile | null
  providerProfile: ISupplierProfile | null
  adminProfile: IAdminProfile | null

  createdAt: number
  updatedAt: number
}
