// src/components/banners/ProductsBanner.tsx

import React from 'react'
import {
  BannerType,
  IProductBanner,
  IProductFeaturedBanner,
  IProductListBanner,
} from '@/types/banners'
import { getProductById, getProductsByIds } from '@/utils/mockGetters'
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { ProductList } from '../product/ProductList'
import { ProductCard } from '../product/ProductCard'
import { theme } from '@/styles/theme'
import { SectionHeader } from '../SectionHeader'
import { CtaButton } from '../forms/CtaButton'

type ProductsBannerProps = {
  banner: IProductBanner
}

export const ProductsBanner = ({ banner }: ProductsBannerProps) => {
  switch (banner.type) {
    case BannerType.PRODUCT_GRID:
      return <ProductGrid data={banner} />

    case BannerType.PRODUCT_SCROLL:
      return <ProductScroll data={banner} />

    case BannerType.PRODUCT_FEATURED:
      return <ProductFeatured data={banner} />

    default:
      return null
  }
}

// ================================================================

export const ProductGrid = ({ data }: { data: IProductListBanner }) => {
  const products = getProductsByIds(data.productIds)
  return (
    <View>
      <ProductList products={products} type="category" />
    </View>
  )
}

// ================================================================

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const GAP_SIZE = theme.spacing.sm
const USABLE_WIDTH = SCREEN_WIDTH - theme.spacing.lg * 2 - GAP_SIZE
const CARD_WIDTH = USABLE_WIDTH / 2.5

export const ProductScroll = ({ data }: { data: IProductListBanner }) => {
  const products = getProductsByIds(data.productIds)

  return (
    <View style={productScrollStyles.container}>
      {!!data.title && data.title !== '' && (
        <View style={productScrollStyles.listHeader}>
          <SectionHeader title={data.title} />
        </View>
      )}
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={productScrollStyles.cardContainer}>
            <ProductCard product={item} type="home" />
          </View>
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={productScrollStyles.listContent}
        pagingEnabled={false}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + GAP_SIZE}
        snapToAlignment="start"
      />
    </View>
  )
}

const productScrollStyles = StyleSheet.create({
  container: {},
  listHeader: {
    paddingLeft: theme.spacing.lg,
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
  cardContainer: {
    width: CARD_WIDTH,
    marginRight: GAP_SIZE,
  },
})

// ================================================================

export const ProductFeatured = ({ data }: { data: IProductFeaturedBanner }) => {
  const product = getProductById(data.productId)
  return (
    <View style={productFeaturedStyles.container}>
      <Image
        source={{ uri: product?.images?.[0] }}
        style={productFeaturedStyles.mediaImage}
      />
      <View style={productFeaturedStyles.productDetails}>
        <Text style={productFeaturedStyles.productName}>{product?.name}</Text>
        <Text style={productFeaturedStyles.legend}>{data.legend}</Text>
        <CtaButton title="Ver agora" type="filled" />
      </View>
    </View>
  )
}

const productFeaturedStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    columnGap: theme.spacing.md,
    backgroundColor: '#E9E9E9',
    marginHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    borderLeftWidth: 5,
    borderLeftColor: theme.colors.success,
  },
  mediaImage: {
    width: 120,
    height: 120,
    borderRadius: theme.borders.radius.sm,
  },
  productDetails: {
    flex: 1,
    alignItems: 'flex-end',
  },
  productName: {
    textAlign: 'right',
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.xl,
    color: theme.colors.text,
  },
  legend: {
    textAlign: 'right',
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
})
