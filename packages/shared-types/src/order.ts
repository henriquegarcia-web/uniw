import { ICardBrand } from './payment'
import { FormattedOption } from './shared'

// ─── ORDER TYPES ────────────────────────────────────────────────────────────

export enum OrderStatus {
  PENDING = 'pending', // Pagamento pendente
  PROCESSING = 'processing', // Em separação
  SHIPPED = 'shipped', // Enviado
  DELIVERED = 'delivered', // Entregue
  CANCELED = 'canceled', // Cancelado
  REFUNDED = 'refunded', // Reembolsado
}

export const getOrderStatusData = (status?: OrderStatus): FormattedOption => {
  switch (status) {
    case OrderStatus.PENDING:
      return { label: 'Pendente', color: '#2E8B57' }
    case OrderStatus.PROCESSING:
      return { label: 'Em separação', color: '#808080' }
    case OrderStatus.SHIPPED:
      return { label: 'Enviado', color: '#FF4500' }
    case OrderStatus.DELIVERED:
      return { label: 'Entregue', color: '#FFA500' }
    case OrderStatus.CANCELED:
      return { label: 'Cancelado', color: '#FFA500' }
    case OrderStatus.REFUNDED:
      return { label: 'Reembolsado', color: '#FFA500' }
    default:
      return { label: 'Desconhecido', color: '#808080' }
  }
}

export interface IOrderItem {
  productId: string
  productName: string
  imageUrl?: string

  skuId: string
  attributes: { [key: string]: string }

  quantity: number
  priceAtPurchase: number
}

export interface IPaymentDetails {
  method: 'credit_card' | 'pix' | 'boleto' | 'store_credit'
  cardBrand?: ICardBrand
  cardLast4?: string
  installments?: number
}

export interface IShippingInfo {
  address: {
    cep: string
    rua: string
    numero: string
    bairro: string
    cidade: string
    estado: string
  }
  shippingMethod: string
  shippingCost: number
  trackingCode?: string
}

export interface IPurchaseOrder {
  id: string
  userId: string
  orderNumber: string
  createdAt: number
  status: OrderStatus
  items: IOrderItem[]
  payment: IPaymentDetails
  shipping: IShippingInfo
  summary: {
    subtotal: number
    shippingCost: number
    discountAmount: number
    totalAmount: number
  }
}
