// src/components/ButtonEdit.tsx

import React, { useRef } from 'react'
import {
  Text,
  StyleSheet,
  TouchableOpacityProps,
  Pressable,
  Animated,
} from 'react-native'
import Feather from '@expo/vector-icons/Feather'

import { themeApp, colors } from '@uniw/shared-constants'

interface ButtonEditProps extends TouchableOpacityProps {
  size?: 'sm' | 'md'
  loading?: boolean
}

export const ButtonEdit = ({
  size = 'md',
  loading = false,
  disabled,
  ...rest
}: ButtonEditProps) => {
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

  const isButtonEditDisabled = loading || disabled

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isButtonEditDisabled}
      {...rest}
    >
      <Animated.View
        style={[
          styles.container,
          {
            width: size === 'md' ? 30 : 20,
            height: size === 'md' ? 30 : 20,
            borderWidth: size === 'md' ? 3 : 0,
          },
          isButtonEditDisabled && styles.disabled,
          animatedStyle,
        ]}
      >
        <Feather name="edit-2" size={size === 'md' ? 14 : 14} color="white" />
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: themeApp.borders.radius.full,
    backgroundColor: colors.brand.secondary,
    // borderColor: colors.ui.background,
  },
  disabled: {
    opacity: 0.5,
  },
})
