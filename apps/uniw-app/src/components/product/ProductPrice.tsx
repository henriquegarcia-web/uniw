// src/components/product/ProductPrice.tsx

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { themeApp, colors } from '@uniw/shared-constants'
import { applyMask } from '@uniw/shared-utils'

interface ProductPriceProps {
  price: number
  promotionalPrice?: number
  large?: boolean
}

export const ProductPrice = ({ price, promotionalPrice, large }: ProductPriceProps) => {
  const isOnSale = promotionalPrice && promotionalPrice < price

  const mainPriceSize = large ? themeApp.fonts.size.xxl : 20
  const originalPriceSize = large ? themeApp.fonts.size.xl : themeApp.fonts.size.md
  const discountSize = large ? themeApp.fonts.size.lg : themeApp.fonts.size.sm

  const calculateDiscount = () => {
    if (!isOnSale) return 0
    const discount = ((price - promotionalPrice) / price) * 100
    return Math.round(discount)
  }

  const discountPercentage = calculateDiscount()

  if (isOnSale) {
    return (
      <View style={[styles.container, { rowGap: large ? themeApp.spacing.xs : 0 }]}>
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
    gap: themeApp.spacing.xs,
  },
  promotionalPrice: {
    fontFamily: themeApp.fonts.family.bold,
    color: colors.text.primary,
  },
  originalPrice: {
    fontFamily: themeApp.fonts.family.regular,
    fontSize: themeApp.fonts.size.md,
    color: colors.text.tertiary,
    textDecorationLine: 'line-through',
  },
  discountText: {
    fontFamily: themeApp.fonts.family.regular,
    fontSize: themeApp.fonts.size.sm,
    color: colors.brand.secondary,
  },
  regularPrice: {
    fontFamily: themeApp.fonts.family.bold,
    color: colors.text.primary,
  },
})
