// src/screens/SignUpScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'

import type { SignUpScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'

const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Tela de Cadastro (SignUp)</Text>
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
export default SignUpScreen
