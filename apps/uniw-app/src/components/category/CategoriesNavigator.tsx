// src/components/CategoriesNavigator.tsx

import React from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'

import { themeApp, colors } from '@uniw/shared-constants'
import type { IProductCategory } from '@uniw/shared-types'
import { useNavigation } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { MainTabParamList } from '@uniw/shared-types'

interface CategoriesNavigatorProps {
  categories: IProductCategory[]
}

export const CategoriesNavigator = ({ categories }: CategoriesNavigatorProps) => {
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>()

  const handleSelectCategory = (categoryId: string) => {
    navigation.navigate('CategoryStack', {
      screen: 'CategoryDetails',
      params: {
        categoryId: categoryId,
      },
    })
  }

  const renderCategoryItem = ({ item }: { item: IProductCategory }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleSelectCategory(item.id)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.label}>{item.name}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
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
    columnGap: themeApp.spacing.sm,
    paddingHorizontal: themeApp.spacing.lg,
  },
  itemContainer: {
    alignItems: 'center',
    rowGap: themeApp.spacing.sm,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  label: {
    width: 80,
    textAlign: 'center',
    fontFamily: themeApp.fonts.family.medium,
    fontSize: themeApp.fonts.size.sm,
  },
})
