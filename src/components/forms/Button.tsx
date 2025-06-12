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

interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: 'primary' | 'secondary'
  loading?: boolean
}

export const Button = ({
  title,
  variant = 'primary',
  loading = false,
  disabled,
  ...rest
}: ButtonProps) => {
  const backgroundColor =
    variant === 'primary' ? theme.colors.buttonPrimary : theme.colors.buttonSecondary
  const color =
    variant === 'primary' ? theme.colors.text_contrast : theme.colors.buttonPrimary
  const fontFamily =
    variant === 'primary' ? theme.fonts.family.semiBold : theme.fonts.family.bold

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
          { backgroundColor },
          isButtonDisabled && styles.disabled,
          animatedStyle,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={theme.colors.background} />
        ) : (
          <Text style={[styles.text, { color, fontFamily }]}>{title}</Text>
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
