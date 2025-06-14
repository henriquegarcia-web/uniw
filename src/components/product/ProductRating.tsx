// src/components/product/ProductRating.tsx

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import { theme } from '@/styles/theme'
import { IProductRating } from '@/types/products'

interface ProductRatingProps {
  rating?: IProductRating
}

const formatReviewCount = (count: number): string => {
  return new Intl.NumberFormat('pt-BR').format(count)
}

export const ProductRating = ({ rating }: ProductRatingProps) => {
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
              size={14}
              color={iconColor === 'active' ? theme.colors.waring : theme.colors.disabled}
              style={styles.star}
            />
          )
        })}
      </View>
      <Text style={styles.reviewsText}>{formatReviewCount(rating.reviews)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: theme.spacing.xs,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    marginRight: 2,
  },
  reviewsText: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.sm,
    lineHeight: theme.fonts.size.sm,
    color: theme.colors.text_tertiary,
  },
})
