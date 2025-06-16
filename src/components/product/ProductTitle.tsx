// src/components/ProductTitle.tsx

import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { theme } from '@/styles/theme'

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
  productName: {},
  productCaption: {},
})
