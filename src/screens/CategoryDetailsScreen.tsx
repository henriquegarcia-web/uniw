// src/screens/CategoryDetailScreen.tsx

import React, { useMemo } from 'react'
import { StyleSheet, SafeAreaView, Text, ScrollView } from 'react-native'

import type { CategoryDetailsScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'
import { ProductList } from '@/components/product/ProductList'
import { mockProducts } from '@/types/products'
import { getCategoryById, getProductsByCategoryId } from '@/utils/mockGetters'

const CategoryDetailsScreen = ({ navigation, route }: CategoryDetailsScreenProps) => {
  const { categoryId } = route.params

  const categoryData = useMemo(() => {
    const data = getCategoryById(categoryId)
    return data
  }, [categoryId])

  const categoryProducts = useMemo(() => {
    const data = getProductsByCategoryId(categoryId)
    return data
  }, [categoryId])

  return (
    <SafeAreaView style={styles.container}>
      <ProductList products={categoryProducts} />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing['4xl'],
    paddingVertical: theme.spacing.sm,
    rowGap: theme.spacing.lg,
  },
})
export default CategoryDetailsScreen
