// src/screens/ProductDetailScreen.tsx

import React, { useMemo } from 'react'
import { StyleSheet, SafeAreaView, Text, ScrollView, View } from 'react-native'

import type { ProductDetailsScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'
import { ProductImageCarousel } from '@/components/product/ProductImageCarousel'
import { ProductDetails } from '@/components/product/ProductDetails'
import { FavouriteButton } from '@/components/product/FavouriteButton'
import { BuyButton } from '@/components/product/BuyButton'
import { Button } from '@/components/forms/Button'
import { getProductById } from '@/utils/mockGetters'
import { useProductVariations } from '@/hooks/useProductVariations'

const ProductDetailsScreen = ({ route }: ProductDetailsScreenProps) => {
  const { productId } = route.params

  const productData = useMemo(() => getProductById(productId), [productId])

  const { selectedSku, selectedVariations, handleSelectVariation } =
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
        <ProductImageCarousel />
        <ProductDetails />

        <View style={styles.buyContainer}>
          <BuyButton />
          <BuyButton />
          <FavouriteButton />
        </View>

        <View style={styles.deliveryBanner}>
          <Text style={styles.deliveryBannerTopText}>Será postado em</Text>
          <Text style={styles.deliveryBannerBottomText}>até 10 dias úteis</Text>
        </View>

        <View style={styles.optionsContainer}>
          <Button
            title="Ver similares"
            leftIcon="eye"
            variant="tertiary"
            onPress={() => {}}
          />
          <Button
            title="Add para comparar"
            leftIcon="copy"
            variant="tertiary"
            onPress={() => {}}
          />
        </View>
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
  },
  buyContainer: {},
  deliveryBanner: {},
  deliveryBannerTopText: {},
  deliveryBannerBottomText: {},
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: theme.spacing.sm,
  },
})
export default ProductDetailsScreen
