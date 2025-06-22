import { FormattedOption } from './shared'

// ─── CLUBE TYPES ────────────────────────────────────────────────────────────

export enum ClubStatus {
  ATIVO = 'ativo',
  CANCELADO = 'cancelado',
  BLOQUEADO = 'bloqueado',
  PENDENTE = 'pendente',
}

export const getClubStatusData = (status?: ClubStatus): FormattedOption => {
  switch (status) {
    case ClubStatus.ATIVO:
      return { label: 'Ativo', color: '#2E8B57' }
    case ClubStatus.CANCELADO:
      return { label: 'Cancelado', color: '#808080' }
    case ClubStatus.BLOQUEADO:
      return { label: 'Bloqueado', color: '#FF4500' }
    case ClubStatus.PENDENTE:
      return { label: 'Pendente', color: '#FFA500' }
    default:
      return { label: 'Desconhecido', color: '#808080' }
  }
}

export interface ISubscriptionDetails {
  planType: 'monthly' | 'annual'
  nextBillingDate: number
  paymentHistory: {
    invoiceId: string
    date: number
    amount: number
    status: 'succeeded' | 'failed'
  }[]
}

export interface IClub {
  status: ClubStatus
  memberSince: number
  subscription: ISubscriptionDetails
}
