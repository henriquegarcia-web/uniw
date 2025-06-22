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

import { theme } from '@/styles/theme'
import { Feather } from '@expo/vector-icons'

const variantStyles = {
  default: {
    container: {
      backgroundColor: 'transparent',
      borderColor: theme.colors.text_contrast,
    },
    text: {
      color: theme.colors.text_contrast,
    },
    icon: {
      color: theme.colors.text_contrast,
    },
  },
  filled: {
    container: {
      backgroundColor: theme.colors.secondary,
      borderColor: theme.colors.secondary,
    },
    text: {
      color: theme.colors.text_contrast,
    },
    icon: {
      color: theme.colors.text_contrast,
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
          <ActivityIndicator color={theme.colors.background} />
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
    columnGap: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.sm,
    borderRadius: theme.borders.radius.xs,
    borderWidth: 1,
  },
  text: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.md,
    color: theme.colors.text_contrast,
  },
  icon: {},
  disabled: {
    opacity: 0.5,
  },
})
