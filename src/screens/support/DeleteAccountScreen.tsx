// src/screens/support/DeleteAccountScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'

import type { DeleteAccountScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'

const DeleteAccountScreen = ({ navigation }: DeleteAccountScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Tela de Adicionar Novo Cartão</Text>
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
export default DeleteAccountScreen
