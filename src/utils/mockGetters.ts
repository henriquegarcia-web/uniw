// src/utils/mockGetters.ts

import {
  IProduct,
  IProductCategory,
  mockCategories,
  mockProducts,
} from '@/types/products'

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
