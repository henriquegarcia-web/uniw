// src/hooks/useProductVariations.ts

import { useState, useEffect, useMemo } from 'react'
import type { IProduct, IProductSKU, IVariationType } from '@/types/products'

// O que o nosso hook irá retornar para o componente
interface UseProductVariationsReturn {
  selectedSku: IProductSKU | undefined
  selectedVariations: { [key: string]: string }
  handleSelectVariation: (variationName: string, optionValue: string) => void
}

export const useProductVariations = (
  product: IProduct | undefined,
): UseProductVariationsReturn => {
  // 1. Estado para guardar as seleções atuais do usuário (ex: { Cor: 'azul', Tamanho: 'M' })
  const [selectedVariations, setSelectedVariations] = useState<{ [key: string]: string }>(
    {},
  )

  // 2. Efeito para definir as seleções iniciais (a primeira opção de cada variação)
  useEffect(() => {
    if (product?.variationTypes) {
      const initialSelections: { [key: string]: string } = {}
      product.variationTypes.forEach((variationType: IVariationType) => {
        // Pega a primeira opção como padrão
        if (variationType.options.length > 0) {
          initialSelections[variationType.name] = variationType.options[0].value
        }
      })
      setSelectedVariations(initialSelections)
    }
  }, [product])

  // 3. Função para ser chamada quando o usuário clica em um botão de variação
  const handleSelectVariation = (variationName: string, optionValue: string) => {
    setSelectedVariations((prev) => ({
      ...prev,
      [variationName]: optionValue,
    }))
  }

  // 4. useMemo para encontrar o SKU correspondente sempre que as seleções mudarem
  const selectedSku = useMemo(() => {
    if (!product || Object.keys(selectedVariations).length === 0) {
      return undefined
    }

    // Procura no array de SKUs...
    return product.skus.find((sku) => {
      // ...um SKU cujos atributos correspondam EXATAMENTE às seleções atuais
      return Object.entries(selectedVariations).every(
        ([key, value]) => sku.attributes[key] === value,
      )
    })
  }, [product, selectedVariations])

  // 5. Retorna tudo que a tela precisa para renderizar
  return {
    selectedSku,
    selectedVariations,
    handleSelectVariation,
  }
}
