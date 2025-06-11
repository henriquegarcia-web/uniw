// src/screens/SearchScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'

import type { SearchScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'

const SearchScreen = ({ navigation }: SearchScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Tela de Pesquisa</Text>
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
export default SearchScreen
