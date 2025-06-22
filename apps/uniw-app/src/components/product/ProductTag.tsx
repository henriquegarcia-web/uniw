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
          size={16}
          color={theme.colors.text_tertiary}
          style={styles.icon}
        />
      )}

      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: theme.spacing.xs,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borders.radius.xs,
    borderWidth: 1,
    borderColor: theme.colors.text_tertiary,
  },
  label: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.sm,
    lineHeight: theme.fonts.size.sm,
    color: theme.colors.text_tertiary,
  },
  icon: {},
})
