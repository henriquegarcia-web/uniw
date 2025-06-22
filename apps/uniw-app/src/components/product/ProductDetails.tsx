// src/components/ProductDetails.tsx

import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { theme } from '@/styles/theme'
import { getProductBadge, ProductBadge } from '@/types/products'
import { ProductTag } from './ProductTag'

interface ProductDetailsProps {
  description?: string
  badges?: ProductBadge[]
}

export const ProductDetails = ({ description, badges }: ProductDetailsProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>Detalhes do Produto</Text>
        <Text style={styles.detailsText}>{description}</Text>
      </View>
      <View style={styles.badgesWrapper}>
        {badges?.map((badge) => {
          const badgeData = getProductBadge(badge)
          return (
            <ProductTag key={badge} label={badgeData.label} leftIcon={badgeData.icon} />
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    rowGap: theme.spacing.sm,
  },
  detailsContainer: {},
  detailsTitle: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.lg,
    color: theme.colors.text,
  },
  detailsText: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    color: theme.colors.text,
  },
  badgesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
})
