// ─── PAYMENT TYPES ──────────────────────────────────────────────────────────

export enum IAcceptablePaymentMethods {
  CARTAO = 'cartao',
  PIX = 'pix',
  BOLETO = 'boleto',
}

export enum ICardBrand {
  VISA = 'visa',
  MASTERCARD = 'mastercard',
  AMEX = 'amex',
  ELO = 'elo',
  HIPERCARD = 'hipercard',
  UNKNOWN = 'unknown',
}

export interface ICreditCard {
  id: string
  token: string
  last4: string
  brand: ICardBrand
  expiryMonth: number
  expiryYear: number
  isDefault: boolean
}

// ─── SUBSCRIPTION TYPES PARTNER/SUPPLIER ────────────────────────────────────

/**
 * Detalhes da assinatura de um parceiro ou fornecedor.
 */
export interface ISubscription {
  id: string
  status: 'active' | 'canceled' | 'pending_payment'
  planoId: 'monthly_30'
  proximaCobranca: number // Timestamp
  dataInicio: number // Timestamp
}

/**
 * Configuração para repasses financeiros.
 */
export interface IPayoutConfig {
  metodo: 'pix' | 'transferencia_bancaria'
  chavePix?: string
  dadosBancarios?: {
    banco: string
    agencia: string
    conta: string
    tipo: 'corrente' | 'poupanca'
  }
}
