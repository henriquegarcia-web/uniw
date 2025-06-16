// src/hooks/useProductVariations.ts

import { useState, useEffect, useMemo } from 'react'
import type { IProduct, IProductSKU, IVariationType } from '@/types/products'

interface UseProductVariationsReturn {
  selectedSku: IProductSKU | undefined
  selectedVariations: { [key: string]: string }
  handleSelectVariation: (variationName: string, optionValue: string) => void
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

  return {
    selectedSku,
    selectedVariations,
    handleSelectVariation,
  }
}
