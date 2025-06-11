// src/screens/CartScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'

import type { CartScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'

const CartScreen = ({ navigation }: CartScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Tela do Carrinho</Text>
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
export default CartScreen
