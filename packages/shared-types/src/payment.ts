// ─── PAYMENT TYPES ──────────────────────────────────────────────────────────

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
