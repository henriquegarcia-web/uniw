// src/utils/mockGetters.ts

import { IProductCategory, mockCategories } from '@/types/products'

export function getCategoryById(categoryId: string): IProductCategory | undefined {
  if (!categoryId) {
    return undefined
  }

  const category = mockCategories.find((category) => category.id === categoryId)
  return category
}
