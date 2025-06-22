import { FormattedOption } from './global'

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

// ─── USER TYPES ─────────────────────────────────────────────────────────────

export interface IBaseUser {
  id: string

  nome: string
  email: string
  telefone: string
  cpf: string
  dataNascimento: number

  role: UserRole
  status: UserStatus

  createdAt: number
  updatedAt: number
  isActive: boolean
}

export interface IClienteUser {
  id: string

  favoritos?: string[]
  fidelidade?: {
    lojaId: string
    vinculoDesde: number
  }

  pontosFidelidade?: number
  historicoCompras?: string[]
  historicoAgendamentos?: string[]
  recebeuPremio?: boolean
}

export interface IParceiroUser {
  id: string

  lojaId: string
  nomeLoja: string
  cnpjOuCpf: string
  endereco: string
  redesSociais?: string[]
  colaboradores?: string[]
  clientesCadastrados?: string[]
  meiosPagamento?: string[]
  aprovado: boolean
  faturamentoUltimos30Dias?: number
}

export interface IFornecedorUser {
  id: string

  nomeEmpresa: string
  produtosCadastrados: string[]
  visibilidadePublica: boolean
  lojistasRelacionados: string[]
  sorteiosAtivos: string[]
}

export interface IAdminUser {
  id: string

  permissoes: {
    gerenciarUsuarios: boolean
    moderarConteudo: boolean
  }
}
