// src/components/category/CategoryList.tsx

import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

import { CategoryCard } from './CategoryCard'
import { IProductCategory } from '@uniw/shared-types'
import { MainTabParamList } from '@uniw/shared-types'
import { themeApp, colors } from '@uniw/shared-constants'
import { SectionHeader } from '../SectionHeader'

interface CategoryListProps {
  categories: IProductCategory[]
}

export const CategoryList = ({ categories }: CategoryListProps) => {
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>()

  const handleCategoryPress = (categoryId: string) => {
    navigation.navigate('CategoryStack', {
      screen: 'CategoryDetails',
      params: { categoryId },
    })
  }

  return (
    <FlatList
      ListHeaderComponent={<SectionHeader title="Todas as Categorias" />}
      data={categories}
      renderItem={({ item }) => (
        <CategoryCard category={item} onPress={handleCategoryPress} />
      )}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={{
        gap: themeApp.spacing.sm,
        paddingBottom: themeApp.spacing.lg,
      }}
      columnWrapperStyle={{ gap: themeApp.spacing.sm }}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: themeApp.spacing.lg,
  },
})
