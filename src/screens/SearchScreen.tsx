// src/screens/SearchScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'

import type { SearchScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'
import { ListingHeader } from '@/components/ListingHeader'
import { mockProducts } from '@/types/products'
import { ProductList } from '@/components/product/ProductList'

const SearchScreen = ({ navigation }: SearchScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <ListingHeader title="Todos" />

      <ProductList products={mockProducts} />
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
export default SearchScreen
