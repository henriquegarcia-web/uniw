// src/utils/masks.ts

// ─── Tipagens ───────────────────────────────────────────────────────────────

export type SupportedMask =
  | 'currency'
  | 'cep'
  | 'cpf'
  | 'phone'
  | 'expiryDate'
  | 'cardNumber'

type MaskInput = {
  currency: number | string
  cep: string
  cpf: string
  phone: string
  expiryDate: string
  cardNumber: string
}

type MaskReturn = {
  currency: string
  cep: string
  cpf: string
  phone: string
  expiryDate: string
  cardNumber: string
}

type MaskHandlers = {
  [K in SupportedMask]: (_value: MaskInput[K]) => MaskReturn[K]
}

// ─── Handlers de Máscara ────────────────────────────────────────────────────

const maskHandlers: MaskHandlers = {
  // Formata valor em real: R$ 0,00
  currency: (value) => {
    if (value === null || value === undefined) return 'R$ 0,00'

    const numericValue =
      typeof value === 'string'
        ? parseFloat(value.replace(/[^\d,.-]/g, '').replace(',', '.'))
        : value

    if (isNaN(numericValue)) return 'R$ 0,00'

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numericValue)
  },

  // Formata string como CEP: 00000-000
  cep: (value) => {
    if (!value) return ''
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1')
  },

  // Formata string como CPF: 000.000.000-00
  cpf: (value) => {
    if (!value) return ''
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  },

  // Formata string como Telefone: (00) 00000-0000
  phone: (value) => {
    if (!value) return ''
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1')
  },

  // Formata string como MM/AA
  expiryDate: (value) => {
    if (!value) return ''
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .slice(0, 5)
  },

  // Formata string como 0000 0000 0000 0000
  cardNumber: (value) => {
    if (!value) return ''
    return value
      .replace(/\D/g, '')
      .slice(0, 16)
      .replace(/(\d{4})(?=\d)/g, '$1 ')
  },
}

// ─── Função Principal ───────────────────────────────────────────────────────

export function applyMask<K extends SupportedMask>(
  value: MaskInput[K],
  maskType: K,
): MaskReturn[K] {
  const formatter = maskHandlers[maskType]
  if (!formatter) {
    throw new Error(`Máscara não implementada: "${maskType}"`)
  }
  return formatter(value)
}
