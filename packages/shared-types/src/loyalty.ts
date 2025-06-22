// ─── COUPON TYPES ─────────────────────────────────────────────────────────────

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

// ─── LOYALTY TYPES ────────────────────────────────────────────────────────────

export interface IPointTransaction {
  id: string
  type: 'earned' | 'spent'
  amount: number
  description: string
  date: number
}

export interface ILoyalty {
  pointsBalance: number
  pointsHistory: IPointTransaction[] | null
  coupons: IRedeemedCoupon[] | null
}
