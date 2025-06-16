// src/screens/WishlistScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'

import type { WishlistScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'
import { ProductList } from '@/components/product/ProductList'
import { mockProducts } from '@/types/products'

const WishlistScreen = ({ navigation }: WishlistScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <ProductList products={mockProducts} /> */}
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing['4xl'],
    paddingVertical: theme.spacing.md,
    rowGap: theme.spacing.lg,
  },
})
export default WishlistScreen
