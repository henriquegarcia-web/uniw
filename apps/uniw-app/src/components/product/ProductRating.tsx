// src/components/product/ProductRating.tsx

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import { themeApp, colors } from '@uniw/shared-constants'
import { IProductRating } from '@uniw/shared-types'

interface ProductRatingProps {
  rating?: IProductRating
  large?: boolean
}

const formatReviewCount = (count: number): string => {
  return new Intl.NumberFormat('pt-BR').format(count)
}

export const ProductRating = ({ rating, large = false }: ProductRatingProps) => {
  if (!rating || !rating.average) {
    return null
  }

  const fullStars = Math.floor(rating.average)
  const decimalPart = rating.average - fullStars
  const starArray = Array.from({ length: 5 })

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {starArray.map((_, index) => {
          const starNumber = index + 1
          let iconName: 'star' | 'star-half-o' | 'star-o' = 'star-o'
          let iconColor: 'active' | 'inactive' = 'inactive'

          if (starNumber <= fullStars) {
            iconName = 'star'
            iconColor = 'active'
          } else if (starNumber === fullStars + 1) {
            if (decimalPart > 0.49) {
              iconName = 'star-half-o'
              iconColor = 'inactive'
            } else {
              iconName = 'star-o'
              iconColor = 'inactive'
            }
          }

          return (
            <FontAwesome
              key={index}
              name={iconName}
              size={large ? 18 : 12}
              color={
                iconColor === 'active' ? colors.semantic.warning : colors.ui.disabled
              }
              style={styles.star}
            />
          )
        })}
      </View>
      <Text style={styles.reviewsText}>{formatReviewCount(rating.reviewsCount)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: themeApp.spacing.xs,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    marginRight: 2,
  },
  reviewsText: {
    fontFamily: themeApp.fonts.family.regular,
    fontSize: themeApp.fonts.size.sm,
    lineHeight: themeApp.fonts.size.sm,
    color: colors.text.tertiary,
  },
})
