// src/components/FavouriteButton.tsx

import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { themeApp, colors } from '@uniw/shared-constants'
import { FontAwesome } from '@expo/vector-icons'
import { useClientProfile } from '@/contexts/ClientProfileProvider'

interface FavouriteButtonProps {
  productId: string
  large?: boolean
}

export const FavouriteButton = ({ productId, large = false }: FavouriteButtonProps) => {
  const { isFavorite, addFavorite, removeFavorite } = useClientProfile()

  const isCurrentlyFavorite = isFavorite(productId)

  const iconSize = large ? 32 : 18
  const iconName = isCurrentlyFavorite ? 'heart' : 'heart-o'
  const iconColor = isCurrentlyFavorite ? colors.ecommerce.sale : colors.text.secondary

  const handleFavorite = () => {
    if (isCurrentlyFavorite) {
      removeFavorite(productId)
    } else {
      addFavorite(productId)
    }
  }

  return (
    <TouchableOpacity style={styles.favouriteButton} onPress={handleFavorite}>
      <FontAwesome
        name={iconName}
        size={iconSize}
        color={iconColor}
        style={styles.favouriteIcon}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  favouriteButton: {},
  favouriteIcon: {},
})
