// src/screens/OrderSummaryScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'

import type { CheckoutSuccessScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'

const CheckoutSuccessScreen = ({ navigation }: CheckoutSuccessScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Tela de Checkout com Sucesso</Text>
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
export default CheckoutSuccessScreen
