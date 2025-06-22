// src/screens/SearchResultsScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'

import type { SearchResultsScreenProps } from '@uniw/shared-types'
import { themeApp as theme, colors } from '@uniw/shared-constants'
import { ProductList } from '@/components/product/ProductList'
import { mockProducts } from '@/types/products'
import { useProcessedProducts } from '@/hooks/useProcessedProducts'
import { ListingHeader } from '@/components/ListingHeader'
import { ListEmptyMessage } from '@/components/ListEmptyMessage'
import { useSearch } from '@/contexts/SearchProvider'
import { useFocusEffect } from '@react-navigation/native'

const SearchResultsScreen = ({ navigation, route }: SearchResultsScreenProps) => {
  const { searchTerm: submittedSearchTerm } = route.params || {}

  const { processedProducts, sortOption, setSortOption, filters, setFilters } =
    useProcessedProducts(mockProducts, submittedSearchTerm ?? '')

  const { clearSearch } = useSearch()

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        clearSearch()
      }
    }, [clearSearch]),
  )

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
    backgroundColor: colors.ui.surface,
    marginBottom: theme.spacing.custom['botom-tab-height'],
    paddingVertical: theme.spacing.md,
    rowGap: theme.spacing.lg,
  },
})
export default SearchResultsScreen
