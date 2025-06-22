// src/screens/PaymentScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'

import type { PaymentScreenProps } from '@uniw/shared-types'
import { themeApp as theme, colors } from '@uniw/shared-constants'

const PaymentScreen = ({ navigation }: PaymentScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Tela de Pagamento</Text>
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
export default PaymentScreen
