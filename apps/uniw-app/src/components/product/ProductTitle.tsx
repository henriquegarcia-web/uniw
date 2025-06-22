// src/components/ProductTitle.tsx

import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { themeApp, colors } from '@uniw/shared-constants'

interface ProductTitleProps {
  name: string
  caption?: string
}

export const ProductTitle = ({ name, caption }: ProductTitleProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.productName}>{name}</Text>
      <Text style={styles.productCaption}>{caption}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  productName: {
    fontFamily: themeApp.fonts.family.bold,
    fontSize: themeApp.fonts.size.xl,
    color: colors.text.primary,
  },
  productCaption: {
    fontFamily: themeApp.fonts.family.regular,
    fontSize: themeApp.fonts.size.md,
    color: colors.text.primary,
  },
})
