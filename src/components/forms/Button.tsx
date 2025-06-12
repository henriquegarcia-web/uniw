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

const variantStyles = {
  primary: {
    container: {
      backgroundColor: theme.colors.buttonPrimary,
    },
    text: {
      color: theme.colors.text_contrast,
      fontFamily: theme.fonts.family.semiBold,
    },
  },
  secondary: {
    container: {
      backgroundColor: theme.colors.buttonSecondary,
    },
    text: {
      color: theme.colors.buttonPrimary,
      fontFamily: theme.fonts.family.bold,
    },
  },
  negative: {
    container: {
      backgroundColor: theme.colors.buttonSecondary,
    },
    text: {
      color: theme.colors.error,
      fontFamily: theme.fonts.family.semiBold,
    },
  },
}

type ButtonVariant = keyof typeof variantStyles

interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: ButtonVariant
  loading?: boolean
}

export const Button = ({
  title,
  variant = 'primary',
  loading = false,
  disabled,
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
          <Text style={[styles.text, currentVariant.text]}>{title}</Text>
        )}
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 55,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borders.radius.xs,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: theme.fonts.size.lg,
  },
  disabled: {
    opacity: 0.5,
  },
})
