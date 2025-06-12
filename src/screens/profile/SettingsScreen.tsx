// src/screens/ProfileScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'

import type { SettingsScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'

const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Tela de Configurações</Text>
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
export default SettingsScreen
