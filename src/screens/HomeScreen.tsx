// src/screens/HomeScreen.tsx

import React, { useCallback } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'

import type { HomeScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'
import { CategoriesNavigator } from '@/components/category/CategoriesNavigator'
import { mockCategories } from '@/types/products'
import { useSearch } from '@/contexts/SearchProvider'
import { useFocusEffect } from '@react-navigation/native'

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { clearSearch: clearContextSearch } = useSearch()

  useFocusEffect(
    useCallback(() => {
      clearContextSearch()
    }, [clearContextSearch]),
  )

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
