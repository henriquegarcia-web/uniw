// src/utils/mockGetters.ts

import { IPurchaseOrder, mockPurchaseHistory } from '@/types/auth'
import { INotification, mockNotifications } from '@/types/notifications'
import {
  IProduct,
  IProductCategory,
  mockCategories,
  mockProducts,
} from '@/types/products'
import { ICoupon, IRedeemedCoupon, mockCoupons } from '@/types/rewards'

export function getCategoryById(categoryId: string): IProductCategory | undefined {
  if (!categoryId) {
    return undefined
  }

  const category = mockCategories.find((category) => category.id === categoryId)
  return category
}

export function getProductsByCategoryId(categoryId: string): IProduct[] {
  if (!categoryId) {
    return []
  }
  return mockProducts.filter((product) => product.categoryId === categoryId)
}

export function getProductById(productId: string): IProduct | undefined {
  if (!productId) {
    return undefined
  }
  return mockProducts.find((product) => product.id === productId)
}

export function getProductsByIds(productIds?: string[]): IProduct[] {
  if (!productIds || productIds.length === 0) {
    return []
  }

  return mockProducts.filter((product) => productIds.includes(product.id))
}

export function getOrderById(orderId: string): IPurchaseOrder | undefined {
  if (!orderId) {
    return undefined
  }
  return mockPurchaseHistory.find((order) => order.id === orderId)
}

export function getCouponsByIds(userCoupons?: IRedeemedCoupon[]): ICoupon[] {
  if (!userCoupons || userCoupons.length === 0) {
    return []
  }
  const couponIds = userCoupons.map((uc) => uc.couponId)
  return mockCoupons.filter((coupon) => couponIds.includes(coupon.id))
}

export function getNotificationById(notificationId: string): INotification | undefined {
  if (!notificationId) {
    return undefined
  }
  return mockNotifications.find((notification) => notification.id === notificationId)
}
