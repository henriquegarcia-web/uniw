// src/screens/CategoryListScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'

import type { CategoryListScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'
import { CategoryList } from '@/components/category/CategoriesList'
import { mockCategories } from '@/types/products'

const CategoryListScreen = ({ navigation }: CategoryListScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <CategoryList categories={mockCategories} />
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

    // borderWidth: 1,
    // borderColor: 'red',
  },
})
export default CategoryListScreen
