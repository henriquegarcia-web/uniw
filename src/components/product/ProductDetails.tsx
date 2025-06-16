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
      <Text style={styles.sectionTitle}>Detalhes do Produto</Text>
      <Text style={styles.sectionText}>{description}</Text>
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
  container: {},
  sectionTitle: {},
  sectionText: {},
  badgesWrapper: {},
})
