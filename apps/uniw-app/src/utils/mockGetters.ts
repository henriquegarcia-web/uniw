// src/utils/mockGetters.ts

import {
  ICoupon,
  IHelpArticle,
  IHelpCategory,
  INotification,
  IProduct,
  IProductCategory,
  IPurchaseOrder,
  IRedeemedCoupon,
  ISupportTicket,
} from '@uniw/shared-types'

import { mockHelpArticles, mockHelpCategories, mockSupportTickets } from '@/types/support'
import { mockPurchaseHistory } from '@/types/auth'
import { mockNotifications } from '@/types/notifications'
import { mockCategories, mockProducts } from '@/types/products'
import { mockCoupons } from '@/types/rewards'

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

export function getHelpCategories(): IHelpCategory[] {
  return mockHelpCategories
}

export function getHelpCategoryById(categoryId: string): IHelpCategory | undefined {
  return mockHelpCategories.find((category) => category.id === categoryId)
}

export function getHelpArticles(limit?: number): IHelpArticle[] {
  const sortedByPopularity = [...mockHelpArticles].sort(
    (a, b) => b.popularity - a.popularity,
  )
  return limit ? sortedByPopularity.slice(0, limit) : sortedByPopularity
}

export function getHelpArticlesByCategoryId(categoryId: string): IHelpArticle[] {
  return mockHelpArticles.filter((article) => article.categoryId === categoryId)
}

export function getHelpArticleById(articleId: string): IHelpArticle | undefined {
  return mockHelpArticles.find((article) => article.id === articleId)
}

export function searchHelpArticles(query: string): IHelpArticle[] {
  if (!query) return []
  const lowercasedQuery = query.toLowerCase()
  return mockHelpArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(lowercasedQuery) ||
      article.content.toLowerCase().includes(lowercasedQuery) ||
      article.tags.some((tag) => tag.includes(lowercasedQuery)),
  )
}

export function getTicketsByUserId(userId: string): ISupportTicket[] {
  return mockSupportTickets.filter((ticket) => ticket.userId === userId)
}

export function getTicketById(ticketId: string): ISupportTicket | undefined {
  return mockSupportTickets.find((ticket) => ticket.id === ticketId)
}
