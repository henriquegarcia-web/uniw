// src/screens/HomeScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, FlatList } from 'react-native'

import {
  HomeScreenProps,
  IBanner,
  isOfferBanner,
  isProductListBanner,
} from '@uniw/shared-types'
import { themeApp as theme, colors } from '@uniw/shared-constants'
import { CategoriesNavigator } from '@/components/category/CategoriesNavigator'
import { mockCategories } from '@/types/products'
import { mockBanners } from '@/types/banners'
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
    backgroundColor: colors.ui.surface,
    marginBottom: theme.spacing.custom['botom-tab-height'],
    paddingVertical: theme.spacing.md,
    rowGap: theme.spacing.lg,
  },
  listContainer: {
    rowGap: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
})
export default HomeScreen
