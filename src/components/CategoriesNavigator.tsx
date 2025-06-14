// src/components/CategoriesNavigator.tsx

import React from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'

import { theme } from '@/styles/theme'
import { mockCategories, type IProductCategory } from '@/types/products'

interface CategoriesNavigatorProps {}

export const CategoriesNavigator = ({}: CategoriesNavigatorProps) => {
  const onSelectCategory = (categoryId: string) => {}

  const renderCategoryItem = ({ item }: { item: IProductCategory }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onSelectCategory(item.id)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.label}>{item.name}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={mockCategories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  listContentContainer: {
    columnGap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  itemContainer: {
    alignItems: 'center',
    rowGap: theme.spacing.sm,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 30,
  },
  label: {
    width: 80,
    textAlign: 'center',

    fontFamily: theme.fonts.family.medium,
    fontSize: theme.fonts.size.sm,
    // color: theme.colors.secondary,
  },
})
