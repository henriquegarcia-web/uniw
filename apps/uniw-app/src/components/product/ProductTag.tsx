// src/components/ProductTag.tsx

import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { themeApp, colors } from '@uniw/shared-constants'
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
          color={colors.text.tertiary}
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
    columnGap: themeApp.spacing.xs,
    paddingVertical: themeApp.spacing.xs,
    paddingHorizontal: themeApp.spacing.sm,
    borderRadius: themeApp.borders.radius.xs,
    borderWidth: 1,
    borderColor: colors.text.tertiary,
  },
  label: {
    fontFamily: themeApp.fonts.family.semiBold,
    fontSize: themeApp.fonts.size.sm,
    lineHeight: themeApp.fonts.size.sm,
    color: colors.text.tertiary,
  },
  icon: {},
})
