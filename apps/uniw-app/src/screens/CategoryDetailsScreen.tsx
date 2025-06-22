// src/screens/CategoryDetailScreen.tsx

import React, { useMemo } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'

import type { CategoryDetailsScreenProps } from '@uniw/shared-types'
import { themeApp as theme, colors } from '@uniw/shared-constants'
import { ProductList } from '@/components/product/ProductList'
import { getCategoryById, getProductsByCategoryId } from '@/utils/mockGetters'
import { ListingHeader } from '@/components/ListingHeader'
import { useProcessedProducts } from '@/hooks/useProcessedProducts'
import { ListEmptyMessage } from '@/components/ListEmptyMessage'

const CategoryDetailsScreen = ({ navigation, route }: CategoryDetailsScreenProps) => {
  const { categoryId } = route.params

  const categoryData = useMemo(() => {
    const data = getCategoryById(categoryId)
    return data
  }, [categoryId])

  const categoryProducts = useMemo(() => {
    const data = getProductsByCategoryId(categoryId)
    return data
  }, [categoryId])

  const { processedProducts, filters, setFilters, sortOption, setSortOption } =
    useProcessedProducts(categoryProducts)

  return (
    <SafeAreaView style={styles.container}>
      <ProductList
        type="category"
        products={processedProducts}
        EmptyComponent={
          <ListEmptyMessage message={`Nenhum produto encontrado para esta categoria`} />
        }
        HeaderComponent={
          <ListingHeader
            title="Todos"
            currentSort={sortOption}
            onSortChange={setSortOption}
            currentFilters={filters}
            onFiltersApply={setFilters}
          />
        }
      />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ui.surface,
    marginBottom: theme.spacing.custom['botom-tab-height'],
    paddingVertical: theme.spacing.sm,
    rowGap: theme.spacing.lg,
  },
})
export default CategoryDetailsScreen
