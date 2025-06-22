import * as yup from 'yup'
import { isValidCreditCard, isValidExpiryDate } from '@uniw/shared-utils'

export const addCardSchema = yup.object({
  cardNumber: yup
    .string()
    .required('O número do cartão é obrigatório.')
    .test(
      'is-valid-credit-card',
      'O número do cartão é inválido',
      (value) => !value || isValidCreditCard(value),
    )
    .label('Número do Cartão'),
  cardHolderName: yup
    .string()
    .required('O nome do titular é obrigatório.')
    .label('Nome no Cartão'),
  expiryDate: yup
    .string()
    .required('A data de validade é obrigatória.')
    .test(
      'is-valid-expiry',
      'Data de validade inválida ou expirada',
      (value) => !value || isValidExpiryDate(value),
    )
    .label('Validade'),
  isDefault: yup.boolean(),
})
