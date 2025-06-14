// src/screens/WishlistScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'

import type { WishlistScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'
import { ListingHeader } from '@/components/ListingHeader'

const WishlistScreen = ({ navigation }: WishlistScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <ListingHeader title="Todos" />

      <Text>Tela de Desejos</Text>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing['4xl'],
    paddingVertical: theme.spacing.md,
    rowGap: theme.spacing.lg,
  },
})
export default WishlistScreen
