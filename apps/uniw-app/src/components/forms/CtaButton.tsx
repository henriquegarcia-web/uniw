// src/components/CtaButton.tsx

import React, { useRef } from 'react'
import {
  Text,
  StyleSheet,
  TouchableOpacityProps,
  Pressable,
  ActivityIndicator,
  Animated,
} from 'react-native'

import { themeApp, colors } from '@uniw/shared-constants'
import { Feather } from '@expo/vector-icons'

const variantStyles = {
  default: {
    container: {
      backgroundColor: 'transparent',
      borderColor: colors.text.onBrand,
    },
    text: {
      color: colors.text.onBrand,
    },
    icon: {
      color: colors.text.onBrand,
    },
  },
  filled: {
    container: {
      backgroundColor: colors.brand.secondary,
      borderColor: colors.brand.secondary,
    },
    text: {
      color: colors.text.onBrand,
    },
    icon: {
      color: colors.text.onBrand,
    },
  },
}

interface CtaButtonProps extends TouchableOpacityProps {
  type?: 'default' | 'filled'
  title: string
  loading?: boolean
}

export const CtaButton = ({
  type = 'default',
  title,
  loading = false,
  disabled,
  ...rest
}: CtaButtonProps) => {
  const scaleValue = useRef(new Animated.Value(1)).current

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start()
  }

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  }

  const currentVariant = variantStyles[type]

  const isCtaButtonDisabled = loading || disabled

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isCtaButtonDisabled}
      {...rest}
    >
      <Animated.View
        style={[
          styles.container,
          currentVariant.container,
          isCtaButtonDisabled && styles.disabled,
          animatedStyle,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={colors.ui.background} />
        ) : (
          <>
            <Text style={[styles.text, currentVariant.text]}>{title}</Text>
            <Feather name="arrow-right" size={18} style={currentVariant.icon} />
          </>
        )}
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: themeApp.spacing.sm,
    paddingVertical: themeApp.spacing.sm,
    paddingLeft: themeApp.spacing.md,
    paddingRight: themeApp.spacing.sm,
    borderRadius: themeApp.borders.radius.xs,
    borderWidth: 1,
  },
  text: {
    fontFamily: themeApp.fonts.family.semiBold,
    fontSize: themeApp.fonts.size.md,
    color: colors.text.onBrand,
  },
  icon: {},
  disabled: {
    opacity: 0.5,
  },
})
