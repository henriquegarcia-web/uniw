// src/hooks/useProductVariations.ts

import { useState, useEffect, useMemo, useCallback } from 'react'
import type { IProduct, IProductSKU, IVariationType } from '@/types/products'

interface UseProductVariationsReturn {
  selectedSku: IProductSKU | undefined
  selectedVariations: { [key: string]: string }
  handleSelectVariation: (variationName: string, optionValue: string) => void
  isOptionDisabled: (variationName: string, optionValue: string) => boolean
}

export const useProductVariations = (
  product: IProduct | undefined,
): UseProductVariationsReturn => {
  const [selectedVariations, setSelectedVariations] = useState<{ [key: string]: string }>(
    {},
  )

  useEffect(() => {
    if (product?.variationTypes && product.variationTypes.length > 0) {
      const initialSelections: { [key: string]: string } = {}
      product.variationTypes.forEach((variationType) => {
        if (variationType.options.length > 0) {
          initialSelections[variationType.name] = variationType.options[0].value
        }
      })

      setSelectedVariations(initialSelections)
    } else {
      setSelectedVariations({})
    }
  }, [product])

  const handleSelectVariation = (variationName: string, optionValue: string) => {
    setSelectedVariations((prev) => ({
      ...prev,
      [variationName]: optionValue,
    }))
  }

  const selectedSku = useMemo(() => {
    if (
      !product ||
      Object.keys(selectedVariations).length < product.variationTypes.length
    ) {
      return undefined
    }

    return product.skus.find((sku) => {
      const isMatch = Object.entries(selectedVariations).every(([key, value]) => {
        const skuValue = sku.attributes[key]
        const match = skuValue === value
        return match
      })

      return isMatch
    })
  }, [product, selectedVariations])

  const isOptionDisabled = useCallback(
    (variationName: string, optionValue: string): boolean => {
      if (!product) return true

      const potentialSelection = {
        ...selectedVariations,
        [variationName]: optionValue,
      }

      const hasAnyAvailableSku = product.skus.some((sku) => {
        if (sku.stock === 0) return false

        return Object.entries(potentialSelection).every(([key, value]) => {
          return sku.attributes[key] === value
        })
      })

      return !hasAnyAvailableSku
    },
    [product, selectedVariations],
  )

  return {
    selectedSku,
    selectedVariations,
    handleSelectVariation,
    isOptionDisabled,
  }
}
