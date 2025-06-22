// src/components/ButtonIcon.tsx

import React from 'react'
import { TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native'

import { themeApp, colors } from '@uniw/shared-constants'

interface ButtonIconProps extends TouchableOpacityProps {
  children: React.ReactNode
}

export const ButtonIcon = ({ children, ...rest }: ButtonIconProps) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8} {...rest}>
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 56,
    height: 56,
    borderRadius: themeApp.borders.radius.full,
    borderWidth: 1,
    borderColor: '#B667A5',
    backgroundColor: '#FCF3F6',
  },
})
