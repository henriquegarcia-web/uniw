// src/types/auth.ts

import * as yup from 'yup'

import { isCpfInUse, isEmailInUse } from '@/services/auth'
import { ICardBrand, IPurchaseOrder, OrderStatus } from '@uniw/shared-types'
import {
  isValidCpf,
  isValidPhone,
  isValidCep,
  isValidCreditCard,
  isValidExpiryDate,
} from '@uniw/shared-utils'

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

// ─── MOCKS ──────────────────────────────────────────────────────────────────

export const mockPurchaseHistory: IPurchaseOrder[] = [
  {
    id: 'order-001',
    userId: 'user-123',
    orderNumber: '#1001-2025',
    createdAt: new Date('2025-06-10T10:30:00').getTime(),
    status: OrderStatus.DELIVERED,
    items: [
      {
        productId: 'prod-16',
        productName: 'Vestido Midi Floral',
        imageUrl: 'https://picsum.photos/seed/dress1/800/800',
        skuId: 'sku-16-red-m',
        attributes: { Cor: 'vermelho', Tamanho: 'm' },
        quantity: 1,
        priceAtPurchase: 299.9,
      },
      {
        productId: 'prod-2',
        productName: 'Batom Hidratante Cremoso',
        imageUrl: 'https://picsum.photos/seed/lipstick1/800/800',
        skuId: 'sku-2-nude',
        attributes: { Cor: 'nude-classico' },
        quantity: 2,
        priceAtPurchase: 39.9,
      },
    ],
    payment: {
      method: 'credit_card',
      cardBrand: ICardBrand.MASTERCARD,
      cardLast4: '1234',
      installments: 3,
    },
    shipping: {
      address: {
        cep: '59000-000',
        rua: 'Avenida da Praia',
        numero: '100',
        bairro: 'Ponta Negra',
        cidade: 'Natal',
        estado: 'RN',
      },
      shippingMethod: 'SEDEX',
      shippingCost: 25.5,
      trackingCode: 'BR123456789BR',
    },
    summary: {
      subtotal: 379.7,
      shippingCost: 25.5,
      discountAmount: 10.0,
      totalAmount: 405.2,
    },
  },
  {
    id: 'order-002',
    userId: 'user-123',
    orderNumber: '#1002-2025',
    createdAt: new Date('2025-06-15T18:00:00').getTime(),
    status: OrderStatus.PROCESSING,
    items: [
      {
        productId: 'prod-10',
        productName: 'Eau de Parfum "La Nuit"',
        imageUrl: 'https://picsum.photos/seed/perfume1/800/800',
        skuId: 'sku-10-50',
        attributes: { Tamanho: '50ml' },
        quantity: 1,
        priceAtPurchase: 380.0,
      },
    ],
    payment: {
      method: 'pix',
    },
    shipping: {
      address: {
        cep: '59000-000',
        rua: 'Avenida da Praia',
        numero: '100',
        bairro: 'Ponta Negra',
        cidade: 'Natal',
        estado: 'RN',
      },
      shippingMethod: 'Retirada no Local',
      shippingCost: 0,
    },
    summary: {
      subtotal: 380.0,
      shippingCost: 0,
      discountAmount: 0,
      totalAmount: 380.0,
    },
  },
  {
    id: 'order-0302',
    userId: 'user-123',
    orderNumber: '#1002-2025',
    createdAt: new Date('2025-06-15T18:00:00').getTime(),
    status: OrderStatus.PROCESSING,
    items: [
      {
        productId: 'prod-10',
        productName: 'Eau de Parfum "La Nuit"',
        imageUrl: 'https://picsum.photos/seed/perfume1/800/800',
        skuId: 'sku-10-50',
        attributes: { Tamanho: '50ml' },
        quantity: 1,
        priceAtPurchase: 380.0,
      },
    ],
    payment: {
      method: 'pix',
    },
    shipping: {
      address: {
        cep: '59000-000',
        rua: 'Avenida da Praia',
        numero: '100',
        bairro: 'Ponta Negra',
        cidade: 'Natal',
        estado: 'RN',
      },
      shippingMethod: 'Retirada no Local',
      shippingCost: 0,
    },
    summary: {
      subtotal: 380.0,
      shippingCost: 0,
      discountAmount: 0,
      totalAmount: 380.0,
    },
  },
  {
    id: 'order-0202',
    userId: 'user-123',
    orderNumber: '#1002-2025',
    createdAt: new Date('2025-06-15T18:00:00').getTime(),
    status: OrderStatus.PROCESSING,
    items: [
      {
        productId: 'prod-10',
        productName: 'Eau de Parfum "La Nuit"',
        imageUrl: 'https://picsum.photos/seed/perfume1/800/800',
        skuId: 'sku-10-50',
        attributes: { Tamanho: '50ml' },
        quantity: 1,
        priceAtPurchase: 380.0,
      },
    ],
    payment: {
      method: 'pix',
    },
    shipping: {
      address: {
        cep: '59000-000',
        rua: 'Avenida da Praia',
        numero: '100',
        bairro: 'Ponta Negra',
        cidade: 'Natal',
        estado: 'RN',
      },
      shippingMethod: 'Retirada no Local',
      shippingCost: 0,
    },
    summary: {
      subtotal: 380.0,
      shippingCost: 0,
      discountAmount: 0,
      totalAmount: 380.0,
    },
  },
  {
    id: 'order-02402',
    userId: 'user-123',
    orderNumber: '#1002-2025',
    createdAt: new Date('2025-06-15T18:00:00').getTime(),
    status: OrderStatus.PROCESSING,
    items: [
      {
        productId: 'prod-10',
        productName: 'Eau de Parfum "La Nuit"',
        imageUrl: 'https://picsum.photos/seed/perfume1/800/800',
        skuId: 'sku-10-50',
        attributes: { Tamanho: '50ml' },
        quantity: 1,
        priceAtPurchase: 380.0,
      },
    ],
    payment: {
      method: 'pix',
    },
    shipping: {
      address: {
        cep: '59000-000',
        rua: 'Avenida da Praia',
        numero: '100',
        bairro: 'Ponta Negra',
        cidade: 'Natal',
        estado: 'RN',
      },
      shippingMethod: 'Retirada no Local',
      shippingCost: 0,
    },
    summary: {
      subtotal: 380.0,
      shippingCost: 0,
      discountAmount: 0,
      totalAmount: 380.0,
    },
  },
  {
    id: 'order-02023',
    userId: 'user-123',
    orderNumber: '#1002-2025',
    createdAt: new Date('2025-06-15T18:00:00').getTime(),
    status: OrderStatus.PROCESSING,
    items: [
      {
        productId: 'prod-10',
        productName: 'Eau de Parfum "La Nuit"',
        imageUrl: 'https://picsum.photos/seed/perfume1/800/800',
        skuId: 'sku-10-50',
        attributes: { Tamanho: '50ml' },
        quantity: 1,
        priceAtPurchase: 380.0,
      },
    ],
    payment: {
      method: 'pix',
    },
    shipping: {
      address: {
        cep: '59000-000',
        rua: 'Avenida da Praia',
        numero: '100',
        bairro: 'Ponta Negra',
        cidade: 'Natal',
        estado: 'RN',
      },
      shippingMethod: 'Retirada no Local',
      shippingCost: 0,
    },
    summary: {
      subtotal: 380.0,
      shippingCost: 0,
      discountAmount: 0,
      totalAmount: 380.0,
    },
  },
]
