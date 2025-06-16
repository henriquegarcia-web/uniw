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

import { theme } from '@/styles/theme'
import { Feather } from '@expo/vector-icons'

const variantStyles = {
  primary: {
    container: {
      backgroundColor: theme.colors.buttonPrimary,
    },
    text: {
      fontSize: theme.fonts.size.lg,
      color: theme.colors.text_contrast,
      fontFamily: theme.fonts.family.semiBold,
    },
    icon: {
      color: theme.colors.text_contrast,
    },
  },
  secondary: {
    container: {
      backgroundColor: theme.colors.buttonSecondary,
    },
    text: {
      fontSize: theme.fonts.size.lg,
      color: theme.colors.buttonPrimary,
      fontFamily: theme.fonts.family.bold,
    },
    icon: {
      color: theme.colors.buttonPrimary,
    },
  },
  tertiary: {
    container: {
      backgroundColor: theme.colors.buttonSecondary,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    text: {
      fontSize: theme.fonts.size.md,
      color: theme.colors.text,
      fontFamily: theme.fonts.family.semiBold,
    },
    icon: {
      color: theme.colors.text,
    },
  },
  negative: {
    container: {
      backgroundColor: theme.colors.buttonSecondary,
    },
    text: {
      fontSize: theme.fonts.size.lg,
      color: theme.colors.error,
      fontFamily: theme.fonts.family.semiBold,
    },
    icon: {
      color: theme.colors.error,
    },
  },
}

type ButtonVariant = keyof typeof variantStyles
type FeatherIconName = keyof typeof Feather.glyphMap

interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: ButtonVariant
  loading?: boolean
  leftIcon?: FeatherIconName
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
          <ActivityIndicator color={theme.colors.background} />
        ) : (
          <>
            {leftIcon && (
              <Feather
                name={leftIcon}
                size={20}
                color={theme.colors.text_secondary}
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
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borders.radius.xs,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    columnGap: theme.spacing.sm,
  },
  text: {},
  icon: {},
  disabled: {
    opacity: 0.5,
  },
})
