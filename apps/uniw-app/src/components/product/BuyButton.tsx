// src/components/BuyButton.tsx

import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native'

import { themeApp, colors } from '@uniw/shared-constants'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

type MaterialIconsIconName = keyof typeof MaterialIcons.glyphMap

interface BuyButtonProps {
  type: 'cart' | 'buy'
  onPress: () => void
}

export const BuyButton = ({ type, onPress }: BuyButtonProps) => {
  const icon: MaterialIconsIconName = type === 'buy' ? 'touch-app' : 'shopping-cart'
  const label = type === 'buy' ? 'Comprar' : '+ Carrinho'

  const backgroundImage =
    type === 'buy'
      ? require('@/assets/backgrounds/button-secondary-background.png')
      : require('@/assets/backgrounds/button-primary-background.png')

  const backgroundColor = type === 'buy' ? colors.brand.secondary : colors.brand.primary
  const textColor = type === 'buy' ? colors.text.onBrand : colors.text.primary

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.buyButtonIconContainer, { backgroundColor }]}>
        <Image source={backgroundImage} style={styles.buyButtonImage} />
        <MaterialIcons
          name={icon}
          size={24}
          color={textColor}
          style={styles.buyButtonIcon}
        />
      </View>
      <View style={[styles.buyButtonLabelContainer, { backgroundColor }]}>
        <Text style={[styles.buyButtonLabel, { color: textColor }]} numberOfLines={1}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buyButtonIconContainer: {
    position: 'relative',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: themeApp.borders.radius.full,
  },
  buyButtonImage: {
    position: 'absolute',
    top: 0.5,
    right: 0,
    bottom: 0,
    left: 0.5,
    width: '98%',
    height: '98%',
  },
  buyButtonIcon: {
    zIndex: 100,
  },
  buyButtonLabelContainer: {
    flex: 1,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: themeApp.spacing.sm,
    paddingLeft: 20,
    marginLeft: -20,
    borderTopRightRadius: themeApp.borders.radius.xs,
    borderBottomRightRadius: themeApp.borders.radius.xs,
  },
  buyButtonLabel: {
    fontFamily: themeApp.fonts.family.semiBold,
    fontSize: 18,
  },
})
