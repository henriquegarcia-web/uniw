// src/components/BuyButton.tsx

import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native'

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

  const backgroundImage =
    type === 'buy'
      ? require('@/assets/backgrounds/button-secondary-background.png')
      : require('@/assets/backgrounds/button-primary-background.png')

  const backgroundColor = type === 'buy' ? theme.colors.secondary : theme.colors.primary
  const textColor = type === 'buy' ? theme.colors.text_contrast : theme.colors.text

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
    borderRadius: theme.borders.radius.circle,
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
    paddingRight: theme.spacing.sm,
    paddingLeft: 20,
    marginLeft: -20,
    borderTopRightRadius: theme.borders.radius.xs,
    borderBottomRightRadius: theme.borders.radius.xs,
  },
  buyButtonLabel: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: 18,
  },
})
