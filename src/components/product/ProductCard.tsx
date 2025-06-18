// src/components/product/ProductCard.tsx

import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

import { theme } from '@/styles/theme'
import { IProduct } from '@/types/products'
import { ProductRating } from './ProductRating'
import { ProductPrice } from './ProductPrice'
import { useNavigation } from '@react-navigation/native'
import { AppStackParamList } from '@/navigation/types'
import { FavouriteButton } from './FavouriteButton'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

interface ProductCardProps {
  product: IProduct
  type: 'category' | 'search' | 'wishlist' | 'home'
}

export const ProductCard = ({ product, type }: ProductCardProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

  const imageSource =
    product?.images && product.images.length > 0
      ? { uri: product.images[0] }
      : require('@/assets/backgrounds/product-without-image-placeholder.png')
  const displayPrice = product.skus[0]?.price || 0
  const displayPromotionalPrice = product.skus[0]?.promotionalPrice || 0

  const handleSelectProduct = (productId: string) => {
    navigation.navigate('ProductDetails', {
      productId: productId,
    })
  }

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => handleSelectProduct(product.id)}
    >
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>

      <View style={styles.content}>
        <View style={styles.mainContent}>
          <Text style={styles.name} numberOfLines={2}>
            {product.name}
          </Text>
          <Text style={styles.caption} numberOfLines={1}>
            {product.caption}
          </Text>
          <View style={styles.price}>
            <ProductPrice
              price={displayPrice}
              promotionalPrice={displayPromotionalPrice}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <ProductRating rating={product.rating} />
          {type !== 'home' && <FavouriteButton productId={product.id} />}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borders.radius.sm,

    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: theme.borders.radius.sm,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: theme.spacing.sm,
  },
  mainContent: {
    rowGap: theme.spacing.xs,
  },
  name: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.lg,
    color: theme.colors.text,
    marginBottom: -4,
  },
  caption: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.xs,
    color: theme.colors.text_secondary,
  },
  price: {
    marginVertical: theme.spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: theme.spacing.xs,
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.sm,
    color: theme.colors.text_secondary,
  },
})
