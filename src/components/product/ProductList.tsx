// src/components/product/ProductList.tsx

import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import { ProductCard } from './ProductCard'
import { IProduct } from '@/types/products'
import { theme } from '@/styles/theme'
import { ListingHeader } from '../ListingHeader'

interface ProductListProps {
  products: IProduct[]
  HeaderComponent: React.ReactElement
}

export const ProductList = ({ products, HeaderComponent }: ProductListProps) => {
  const data = [...products]
  if (data.length % 2 !== 0) {
    data.push({ id: 'placeholder-item', empty: true } as any)
  }

  const renderItem = ({ item }: { item: IProduct & { empty?: boolean } }) => {
    if (item.empty) {
      return <View style={styles.itemInvisible} />
    }

    return <ProductCard product={item} />
  }

  return (
    <FlatList
      ListHeaderComponent={HeaderComponent}
      data={data}
      renderItem={renderItem}
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
  itemInvisible: {
    flex: 1,
  },
})
