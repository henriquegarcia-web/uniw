// src/screens/SignInScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'

import type { SignInScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'

const SignInScreen = ({ navigation }: SignInScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Tela de Login (SignIn)</Text>
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
export default SignInScreen
