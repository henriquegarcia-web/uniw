import { ICardBrand, IPurchaseOrder, OrderStatus } from '@uniw/shared-types'
// src/types/auth.ts

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
