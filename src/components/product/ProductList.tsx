// src/components/product/ProductList.tsx

import React from 'react'
import { FlatList, StyleSheet } from 'react-native'

import { ProductCard } from './ProductCard'
import { IProduct } from '@/types/products'
import { theme } from '@/styles/theme'

interface ProductListProps {
  products: IProduct[]
}

export const ProductList = ({ products }: ProductListProps) => {
  const handleProductPress = (productId: string) => {
    console.log('Card do produto pressionado:', productId)
  }

  const handleToggleWishlist = (productId: string) => {
    console.log('Ícone de favorito pressionado:', productId)
  }

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={handleProductPress}
          onToggleWishlist={handleToggleWishlist}
        />
      )}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={{
        gap: theme.spacing.md,
        paddingBottom: theme.spacing.lg,
      }}
      columnWrapperStyle={{ gap: theme.spacing.md }}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
})
