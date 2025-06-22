// src/screens/OrderSummaryScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'

import type { CheckoutSuccessScreenProps } from '@uniw/shared-types'
import { themeApp as theme, colors } from '@uniw/shared-constants'

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
    backgroundColor: colors.ui.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default CheckoutSuccessScreen
