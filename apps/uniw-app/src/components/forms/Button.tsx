// src/components/Button.tsx

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
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { MaterialCommunityIconsIcon } from '@uniw/shared-types'

const variantStyles = {
  primary: {
    container: {
      backgroundColor: colors.brand.primary,
    },
    text: {
      fontSize: themeApp.fonts.size.lg,
      color: colors.text.onBrand,
      fontFamily: themeApp.fonts.family.semiBold,
    },
    icon: {
      color: colors.text.onBrand,
    },
  },
  secondary: {
    container: {
      backgroundColor: colors.brand.secondary,
    },
    text: {
      fontSize: themeApp.fonts.size.lg,
      color: colors.brand.primary,
      fontFamily: themeApp.fonts.family.bold,
    },
    icon: {
      color: colors.brand.primary,
    },
  },
  tertiary: {
    container: {
      backgroundColor: colors.brand.secondary,
      borderWidth: 1,
      borderColor: colors.ui.border,
    },
    text: {
      fontSize: themeApp.fonts.size.md,
      color: colors.text.primary,
      fontFamily: themeApp.fonts.family.semiBold,
    },
    icon: {
      color: colors.text.primary,
    },
  },
  negative: {
    container: {
      backgroundColor: colors.brand.secondary,
    },
    text: {
      fontSize: themeApp.fonts.size.lg,
      color: colors.semantic.error,
      fontFamily: themeApp.fonts.family.semiBold,
    },
    icon: {
      color: colors.semantic.error,
    },
  },
}

type ButtonVariant = keyof typeof variantStyles

interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: ButtonVariant
  loading?: boolean
  leftIcon?: MaterialCommunityIconsIcon
}

export const Button = ({
  title,
  variant = 'primary',
  loading = false,
  disabled,
  leftIcon,
  ...rest
}: ButtonProps) => {
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

  const isButtonDisabled = loading || disabled

  const currentVariant = variantStyles[variant]

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isButtonDisabled}
      {...rest}
    >
      <Animated.View
        style={[
          styles.container,
          currentVariant.container,
          isButtonDisabled && styles.disabled,
          animatedStyle,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={colors.ui.background} />
        ) : (
          <>
            {leftIcon && (
              <MaterialCommunityIcons
                name={leftIcon}
                size={20}
                color={colors.text.secondary}
                style={[styles.icon, currentVariant.icon]}
              />
            )}

            <Text style={[styles.text, currentVariant.text]}>{title}</Text>
          </>
        )}
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 55,
    paddingHorizontal: themeApp.spacing.md,
    borderRadius: themeApp.borders.radius.xs,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    columnGap: themeApp.spacing.sm,
  },
  text: {},
  icon: {},
  disabled: {
    opacity: 0.5,
  },
})
