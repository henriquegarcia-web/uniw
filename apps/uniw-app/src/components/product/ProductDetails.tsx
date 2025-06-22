// src/components/ProductDetails.tsx

import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { themeApp, colors } from '@uniw/shared-constants'
import { getProductBadge, ProductBadge } from '@uniw/shared-types'
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
    rowGap: themeApp.spacing.sm,
  },
  detailsContainer: {},
  detailsTitle: {
    fontFamily: themeApp.fonts.family.semiBold,
    fontSize: themeApp.fonts.size.lg,
    color: colors.text.primary,
  },
  detailsText: {
    fontFamily: themeApp.fonts.family.regular,
    fontSize: themeApp.fonts.size.md,
    color: colors.text.primary,
  },
  badgesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: themeApp.spacing.sm,
  },
})
