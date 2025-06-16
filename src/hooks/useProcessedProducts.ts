// src/hooks/useProcessedProducts.ts

import { useState, useMemo } from 'react'
import { IProduct, SortOption, FilterState } from '@/types/products'

export const useProcessedProducts = (baseProducts: IProduct[], searchTerm?: string) => {
  const [filters, setFilters] = useState<FilterState>({})
  const [sortOption, setSortOption] = useState<SortOption>('popularity')

  const processedProducts = useMemo(() => {
    let products = [...baseProducts]

    if (searchTerm && searchTerm.trim() !== '') {
      const lowercasedTerm = searchTerm.toLowerCase()
      products = products.filter(
        (product) =>
          product.name.toLowerCase().includes(lowercasedTerm) ||
          (product.caption && product.caption.toLowerCase().includes(lowercasedTerm)) ||
          product.description.toLowerCase().includes(lowercasedTerm),
      )
    }

    if (filters.minPrice) {
      products = products.filter((p) => (p.skus[0]?.price || 0) >= filters.minPrice!)
    }
    if (filters.maxPrice) {
      products = products.filter((p) => (p.skus[0]?.price || 0) <= filters.maxPrice!)
    }
    if (filters.badges && filters.badges.length > 0) {
      products = products.filter((p) =>
        filters.badges!.every((badge) => p.badges?.includes(badge)),
      )
    }

    switch (sortOption) {
      case 'price-asc':
        products.sort((a, b) => (a.skus[0]?.price || 0) - (b.skus[0]?.price || 0))
        break
      case 'price-desc':
        products.sort((a, b) => (b.skus[0]?.price || 0) - (a.skus[0]?.price || 0))
        break
      case 'name-asc':
        products.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'rating-desc':
        products.sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
        break
      case 'popularity':
      default:
        products.sort(
          (a, b) => (b.rating?.reviewsCount || 0) - (a.rating?.reviewsCount || 0),
        )
        break
    }

    return products
  }, [baseProducts, searchTerm, filters, sortOption])

  return {
    processedProducts,
    filters,
    setFilters,
    sortOption,
    setSortOption,
  }
}
