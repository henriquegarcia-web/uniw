// src/components/product/ProductList.tsx

import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import { ProductCard } from './ProductCard'
import { IProduct } from '@uniw/shared-types'
import { themeApp, colors } from '@uniw/shared-constants'

interface ProductListProps {
  products: IProduct[]
  HeaderComponent?: React.ReactElement
  EmptyComponent?: React.ReactElement
  type: 'category' | 'search' | 'wishlist'
}

export const ProductList = ({
  products,
  HeaderComponent,
  EmptyComponent,
  type,
}: ProductListProps) => {
  const data = [...products]
  if (data.length % 2 !== 0) {
    data.push({ id: 'placeholder-item', empty: true } as any)
  }

  const renderItem = ({ item }: { item: IProduct & { empty?: boolean } }) => {
    if (item.empty) {
      return <View style={styles.itemInvisible} />
    }

    return <ProductCard product={item} type={type} />
  }

  return (
    <FlatList
      ListEmptyComponent={EmptyComponent ?? null}
      ListHeaderComponent={HeaderComponent ?? null}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={{
        gap: themeApp.spacing.sm,
        paddingBottom: themeApp.spacing.xl,
      }}
      columnWrapperStyle={{ gap: themeApp.spacing.sm }}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: themeApp.spacing.lg,
  },
  itemInvisible: {
    flex: 1,
  },
})
