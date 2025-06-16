// src/components/BuyButton.tsx

import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'

import { theme } from '@/styles/theme'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

type MaterialIconsIconName = keyof typeof MaterialIcons.glyphMap

interface BuyButtonProps {
  type: 'cart' | 'buy'
  onPress: () => void
}

export const BuyButton = ({ type, onPress }: BuyButtonProps) => {
  const icon: MaterialIconsIconName = type === 'buy' ? 'touch-app' : 'shopping-cart'
  const label = type === 'buy' ? 'Comprar' : '+ Carrinho'

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.container}>
        <MaterialIcons
          name={icon}
          size={20}
          color={theme.colors.text_secondary}
          style={styles.buyButtonIcon}
        />
      </View>
      <View style={styles.buyButtonLabelContainer}>
        <Text style={styles.buyButtonLabel}>{label}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {},
  buyButtonIcon: {},
  buyButtonLabelContainer: {},
  buyButtonLabel: {},
})
