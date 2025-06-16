// src/screens/SearchResultsScreen.tsx

import React, { useEffect } from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'

import type { SearchResultsScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'
import { ProductList } from '@/components/product/ProductList'
import { mockProducts } from '@/types/products'
import { useProcessedProducts } from '@/hooks/useProcessedProducts'
import { ListingHeader } from '@/components/ListingHeader'

const SearchResultsScreen = ({ navigation, route }: SearchResultsScreenProps) => {
  const { searchTerm: initialSearchTerm } = route.params

  // const { clearSearch: clearContextSearch } = useSearch()

  const {
    searchTerm,
    processedProducts,
    setSearchTerm,
    sortOption,
    setSortOption,
    filters,
    setFilters,
  } = useProcessedProducts(mockProducts)

  useEffect(() => {
    setSearchTerm(initialSearchTerm)
  }, [initialSearchTerm, setSearchTerm])

  // useFocusEffect(
  //   React.useCallback(() => {
  //     return () => {
  //       console.log('Saindo da tela de busca, limpando o contexto.')
  //       clearContextSearch()
  //     }
  //   }, [clearContextSearch]),
  // )

  if (!processedProducts || processedProducts.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Nenhum produto encontrado com a busca "{searchTerm}"</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ProductList
        products={processedProducts}
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
