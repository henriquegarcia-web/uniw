// src/components/ProductTag.tsx

import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { theme } from '@/styles/theme'
import { Feather } from '@expo/vector-icons'

type FeatherIconName = keyof typeof Feather.glyphMap

interface ProductTagProps {
  label: string
  leftIcon?: FeatherIconName
}

export const ProductTag = ({ label, leftIcon }: ProductTagProps) => {
  return (
    <View style={styles.container}>
      {leftIcon && (
        <Feather
          name={leftIcon}
          size={20}
          color={theme.colors.text_secondary}
          style={styles.icon}
        />
      )}

      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  label: {},
  icon: {},
})
