// src/components/product/ProductCard.tsx

import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { theme } from '@/styles/theme'
import { IProduct } from '@/types/products'
import { ProductRating } from './ProductRating'
import { ProductPrice } from './ProductPrice'
import { useNavigation } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { MainTabParamList } from '@/navigation/types'

interface ProductCardProps {
  product: IProduct
  type: 'category' | 'search'
}

export const ProductCard = ({ product, type }: ProductCardProps) => {
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>()

  const imageSource =
    product?.images && product.images.length > 0
      ? { uri: product.images[0] }
      : require('@/assets/backgrounds/product-without-image-placeholder.png')
  const displayPrice = product.skus[0]?.price || 0
  const displayPromotionalPrice = product.skus[0]?.promotionalPrice || 0

  const handleSelectProduct = (productId: string) => {
    if (type === 'category') {
      navigation.navigate('CategoryStack', {
        screen: 'ProductDetails',
        params: {
          productId: productId,
        },
      })
      return
    }
    navigation.navigate('SearchStack', {
      screen: 'SearchProductDetails',
      params: {
        productId: productId,
      },
    })
  }

  const handleToggleWishlist = (productId: string) => {
    console.log('Ícone de favorito pressionado:', productId)
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
        <View>
          <Text style={styles.name} numberOfLines={2}>
            {product.name}
          </Text>
          <Text style={styles.caption} numberOfLines={1}>
            {product.caption}
          </Text>
          <ProductPrice price={displayPrice} promotionalPrice={displayPromotionalPrice} />
        </View>

        <View style={styles.footer}>
          <ProductRating rating={product.rating} />
          <TouchableOpacity onPress={() => handleToggleWishlist(product.id)}>
            <Feather name="heart" size={22} color={theme.colors.text_secondary} />
          </TouchableOpacity>
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

    elevation: 3,
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
  name: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.lg,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  caption: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.xs,
    color: theme.colors.text_secondary,
    marginBottom: theme.spacing.sm,
  },
  price: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.lg,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
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
