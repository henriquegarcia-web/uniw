export enum CouponType {
  PERCENTAGE = 'percentage',
  FIXED_AMOUNT = 'fixed_amount',
  FREE_SHIPPING = 'free_shipping',
}

export enum CouponStatus {
  AVALIABLE = 'avaliable',
  UNAVALIABLE = 'unavaliable',
}

export enum RedeemedCouponStatus {
  AVALIABLE = 'avaliable',
  USED = 'used',
}

export interface ICoupon {
  id: string
  code: string
  title: string
  description: string
  costInPoints: number
  type: CouponType
  discountValue: number
  status: CouponStatus
}

export interface IRedeemedCoupon {
  id: string
  couponId: string
  status: RedeemedCouponStatus
}

export const mockCoupons: ICoupon[] = [
  {
    id: 'coupon-001',
    code: 'BEMVINDO10',
    title: '10% de Desconto',
    description: 'Válido para qualquer produto de moda feminina.',
    costInPoints: 500,
    type: CouponType.PERCENTAGE,
    discountValue: 10,
    status: CouponStatus.AVALIABLE,
  },
  {
    id: 'coupon-002',
    code: 'FRETEGRATIS',
    title: 'Frete Grátis',
    description: 'Válido para compras em todo o site.',
    costInPoints: 1000,
    type: CouponType.FREE_SHIPPING,
    discountValue: 0,
    status: CouponStatus.AVALIABLE,
  },
  {
    id: 'coupon-003',
    code: 'SKINCARE50',
    title: 'R$ 50 de Desconto em Skincare',
    description:
      'Use este cupom para ganhar R$50 de desconto em produtos da categoria Skincare.',
    costInPoints: 2500,
    type: CouponType.FIXED_AMOUNT,
    discountValue: 50,
    status: CouponStatus.AVALIABLE,
  },
  {
    id: 'coupon-004',
    code: 'PERFUME25',
    title: '25% OFF em Perfumes',
    description: 'Leve sua fragrância favorita com um super desconto.',
    costInPoints: 7500,
    type: CouponType.PERCENTAGE,
    discountValue: 25,
    status: CouponStatus.UNAVALIABLE,
  },
]

export const mockRedeemedCoupons: IRedeemedCoupon[] = [
  // {
  //   id: 'redeemed-coupon-001',
  //   couponId: 'coupon-001',
  //   status: RedeemedCouponStatus.AVALIABLE,
  // },
  {
    id: 'redeemed-coupon-002',
    couponId: 'coupon-002',
    status: RedeemedCouponStatus.AVALIABLE,
  },
  {
    id: 'redeemed-coupon-003',
    couponId: 'coupon-004',
    status: RedeemedCouponStatus.USED,
  },
]
