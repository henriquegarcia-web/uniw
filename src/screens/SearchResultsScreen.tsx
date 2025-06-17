// src/screens/SearchResultsScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'

import type { SearchResultsScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'
import { ProductList } from '@/components/product/ProductList'
import { mockProducts } from '@/types/products'
import { useProcessedProducts } from '@/hooks/useProcessedProducts'
import { ListingHeader } from '@/components/ListingHeader'
import { ListEmptyMessage } from '@/components/ListEmptyMessage'

const SearchResultsScreen = ({ navigation, route }: SearchResultsScreenProps) => {
  const { searchTerm: submittedSearchTerm } = route.params || {}

  const { processedProducts, sortOption, setSortOption, filters, setFilters } =
    useProcessedProducts(mockProducts, submittedSearchTerm ?? '')

  return (
    <SafeAreaView style={styles.container}>
      <ProductList
        type="search"
        products={processedProducts}
        EmptyComponent={
          <ListEmptyMessage
            message={`Nenhum produto encontrado para a busca: "${submittedSearchTerm}"`}
          />
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
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing['4xl'],
    paddingVertical: theme.spacing.md,
    rowGap: theme.spacing.lg,
  },
})
export default SearchResultsScreen
