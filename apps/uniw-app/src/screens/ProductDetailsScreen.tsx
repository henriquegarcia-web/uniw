// src/screens/ProductDetailScreen.tsx

import React, { useMemo } from 'react'
import { StyleSheet, SafeAreaView, Text, ScrollView, View } from 'react-native'

import type { ProductDetailsScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'
import { ProductImageCarousel } from '@/components/product/ProductImageCarousel'
import { ProductDetails } from '@/components/product/ProductDetails'
import { FavouriteButton } from '@/components/product/FavouriteButton'
import { BuyButton } from '@/components/product/BuyButton'
import { getProductById } from '@/utils/mockGetters'
import { useProductVariations } from '@/hooks/useProductVariations'
import { ProductVariations } from '@/components/product/ProductVariations'
import { ProductRating } from '@/components/product/ProductRating'
import { ProductPrice } from '@/components/product/ProductPrice'
import { ProductTitle } from '@/components/product/ProductTitle'
import { ProductShipping } from '@/components/product/ProductShipping'

const ProductDetailsScreen = ({ route }: ProductDetailsScreenProps) => {
  const { productId } = route.params

  const productData = useMemo(() => getProductById(productId), [productId])

  const { selectedSku, selectedVariations, handleSelectVariation, isOptionDisabled } =
    useProductVariations(productData)

  if (!productData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Produto não encontrado!</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <ProductImageCarousel images={productData.images} type="productDetail" />
        <ProductTitle name={productData.name} caption={productData.caption} />
        <ProductRating rating={productData.rating} large />
        <View style={styles.priceContainer}>
          <ProductPrice
            price={selectedSku?.price ?? 0}
            promotionalPrice={selectedSku?.promotionalPrice ?? 0}
            large
          />
        </View>
        <View style={styles.variationsContainer}>
          <ProductVariations
            variationTypes={productData.variationTypes}
            selectedVariations={selectedVariations}
            onSelectVariation={handleSelectVariation}
            isOptionDisabled={isOptionDisabled}
          />
        </View>
        <ProductDetails
          description={productData.description}
          badges={productData.badges}
        />

        <View style={styles.buyContainer}>
          <BuyButton type="cart" onPress={() => {}} />
          <BuyButton type="buy" onPress={() => {}} />
          <View style={styles.buyContainerFavourite}>
            <FavouriteButton productId={productData.id} large />
          </View>
        </View>

        <ProductShipping shippingDetails={selectedSku?.shippingDetails} />

        {/* <View style={styles.optionsContainer}>
          <Button
            title="Ver similares"
            leftIcon="eye"
            variant="tertiary"
            onPress={() => {}}
            style={{ flex: 1 }}
          />
          <Button
            title="Comparar"
            leftIcon="copy"
            variant="tertiary"
            onPress={() => {}}
            style={{ flex: 1 }}
          />
        </View> */}

        {/* <ProductsBanner
          banner={{
            id: 'banner-22sd',
            category: BannerCategory.PRODUCTS,
            type: BannerType.PRODUCT_SCROLL,
            title: 'Novidades da Semana',
            productIds: sampleProductIds.slice(0, 4),
          }}
        /> */}
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing['4xl'],
    paddingVertical: theme.spacing.sm,
    rowGap: theme.spacing.lg,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    rowGap: theme.spacing.sm,
  },
  priceContainer: {
    marginTop: theme.spacing.sm,
  },
  variationsContainer: {
    marginVertical: theme.spacing.sm,
  },
  buyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: theme.spacing.sm,
    paddingVertical: theme.spacing.md,
  },
  buyContainerFavourite: {
    marginLeft: theme.spacing.xs,
  },
  optionsContainer: {
    flex: 1,
    flexDirection: 'row',
    columnGap: theme.spacing.sm,
  },
})
export default ProductDetailsScreen
