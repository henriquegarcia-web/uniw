// src/screens/HomeScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, FlatList } from 'react-native'

import type { HomeScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'
import { CategoriesNavigator } from '@/components/category/CategoriesNavigator'
import { mockCategories } from '@/types/products'
import { IBanner, isOfferBanner, isProductListBanner, mockBanners } from '@/types/banners'
import { OffersBanner } from '@/components/banners/OffersBanner'
import { ProductsBanner } from '@/components/banners/ProductsBanner'

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const renderBannerItem = ({ item }: { item: IBanner }) => {
    if (isOfferBanner(item)) {
      return <OffersBanner banner={item} />
    }

    if (isProductListBanner(item)) {
      return <ProductsBanner banner={item} />
    }

    return null
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={<CategoriesNavigator categories={mockCategories} />}
        data={mockBanners}
        renderItem={renderBannerItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
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
  listContainer: {
    rowGap: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
})
export default HomeScreen
