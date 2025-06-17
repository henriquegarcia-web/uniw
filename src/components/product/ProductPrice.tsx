// src/components/product/ProductPrice.tsx

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { theme } from '@/styles/theme'
import { applyMask } from '@/utils/masks'

interface ProductPriceProps {
  price: number
  promotionalPrice?: number
  large?: boolean
}

export const ProductPrice = ({ price, promotionalPrice, large }: ProductPriceProps) => {
  const isOnSale = promotionalPrice && promotionalPrice < price

  const mainPriceSize = large ? theme.fonts.size['2xl'] : 20
  const originalPriceSize = large ? theme.fonts.size.xl : theme.fonts.size.md
  const discountSize = large ? theme.fonts.size.lg : theme.fonts.size.sm

  const calculateDiscount = () => {
    if (!isOnSale) return 0
    const discount = ((price - promotionalPrice) / price) * 100
    return Math.round(discount)
  }

  const discountPercentage = calculateDiscount()

  if (isOnSale) {
    return (
      <View style={[styles.container, { rowGap: large ? theme.spacing.xs : 0 }]}>
        <Text
          style={[
            styles.promotionalPrice,
            { fontSize: mainPriceSize, lineHeight: mainPriceSize },
          ]}
        >
          {applyMask(promotionalPrice, 'currency')}
        </Text>
        <View style={styles.salePriceRow}>
          <Text style={[styles.originalPrice, { fontSize: originalPriceSize }]}>
            {applyMask(price, 'currency')}
          </Text>
          <Text style={[styles.discountText, { fontSize: discountSize }]}>
            {discountPercentage}% OFF
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.regularPrice,
          { fontSize: mainPriceSize, lineHeight: mainPriceSize },
        ]}
      >
        {applyMask(price, 'currency')}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  salePriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: theme.spacing.xs,
  },
  promotionalPrice: {
    fontFamily: theme.fonts.family.bold,
    color: theme.colors.text,
  },
  originalPrice: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    color: theme.colors.text_tertiary,
    textDecorationLine: 'line-through',
  },
  discountText: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.sm,
    color: theme.colors.secondary,
  },
  regularPrice: {
    fontFamily: theme.fonts.family.bold,
    color: theme.colors.text,
  },
})
