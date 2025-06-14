// src/screens/HomeScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'

import type { HomeScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Tela Inicial (Home)</Text>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing['4xl'],
  },
})
export default HomeScreen
