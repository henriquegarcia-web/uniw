// src/components/product/ProductPrice.tsx

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { theme } from '@/styles/theme'
import { applyMask } from '@/utils/masks'

interface ProductPriceProps {
  price: number
  promotionalPrice?: number
  containerStyle?: object
}

export const ProductPrice = ({
  price,
  promotionalPrice,
  containerStyle,
}: ProductPriceProps) => {
  const isOnSale = promotionalPrice && promotionalPrice < price

  const calculateDiscount = () => {
    if (!isOnSale) return 0
    const discount = ((price - promotionalPrice) / price) * 100
    return Math.round(discount)
  }

  const discountPercentage = calculateDiscount()

  if (isOnSale) {
    return (
      <View style={[styles.container, containerStyle]}>
        <Text style={styles.promotionalPrice}>
          {applyMask(promotionalPrice, 'currency')}
        </Text>
        <View style={styles.salePriceRow}>
          <Text style={styles.originalPrice}>{applyMask(price, 'currency')}</Text>
          <Text style={styles.discountText}>{discountPercentage}% OFF</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.regularPrice}>{applyMask(price, 'currency')}</Text>
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
    fontSize: 20,
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
    fontSize: 20,
    color: theme.colors.text,
  },
})
