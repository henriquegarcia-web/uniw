// src/screens/profile/ChatsListScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'

import type { ChatsListScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'

const ChatsListScreen = ({ navigation }: ChatsListScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Tela de Adicionar Novo Cartão</Text>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing['4xl'],
    rowGap: theme.spacing.lg,
  },
})
export default ChatsListScreen
