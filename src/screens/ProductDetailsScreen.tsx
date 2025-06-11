// src/screens/ProductDetailScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'

import type { ProductDetailsScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'

const ProductDetailsScreen = ({ route }: ProductDetailsScreenProps) => {
  const { productId } = route.params
  return (
    <SafeAreaView style={styles.container}>
      <Text>Tela de Detalhes do Produto: {productId}</Text>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default ProductDetailsScreen
