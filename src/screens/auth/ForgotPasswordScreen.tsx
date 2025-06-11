// src/screens/ForgotPasswordScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'

import type { ForgotPasswordScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'

const ForgotPasswordScreen = ({ navigation }: ForgotPasswordScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Tela de Esqueceu a Senha</Text>
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
export default ForgotPasswordScreen
