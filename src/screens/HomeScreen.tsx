// src/screens/HomeScreen.tsx

import React, { useEffect } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'

import type { HomeScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'
import { CategoriesNavigator } from '@/components/category/CategoriesNavigator'
import { mockCategories } from '@/types/products'
import { useSearch } from '@/contexts/SearchProvider'

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { clearSearch: clearContextSearch } = useSearch()

  useEffect(() => {
    clearContextSearch()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <CategoriesNavigator categories={mockCategories} />
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
export default HomeScreen
