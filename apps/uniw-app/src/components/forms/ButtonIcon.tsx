// src/components/ButtonIcon.tsx

import React from 'react'
import { TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native'

import { theme } from '@/styles/theme'

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
    borderRadius: theme.borders.radius.circle,
    borderWidth: 1,
    borderColor: '#B667A5',
    backgroundColor: '#FCF3F6',
  },
})
