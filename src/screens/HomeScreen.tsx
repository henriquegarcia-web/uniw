// src/screens/HomeScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'

import type { HomeScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'
import { CategoriesNavigator } from '@/components/CategoriesNavigator'
import { mockCategories } from '@/types/products'

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const handleSelectCategory = (categoryId: string) => {
    const parentNavigator = navigation.getParent()

    if (parentNavigator) {
      parentNavigator.navigate('CategoryStack', {
        screen: 'CategoryDetails',
        params: {
          categoryId: categoryId,
        },
      })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <CategoriesNavigator
        categories={mockCategories}
        onSelectCategory={handleSelectCategory}
      />
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
