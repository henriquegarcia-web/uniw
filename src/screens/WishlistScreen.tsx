// src/screens/WishlistScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'
import type { WishlistScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'

const WishlistScreen = ({ navigation }: WishlistScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Tela de Desejos</Text>
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
export default WishlistScreen
