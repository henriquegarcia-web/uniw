// src/screens/CategoryListScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'

import type { CategoryListScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'
import { SectionHeader } from '@/components/SectionHeader'

const CategoryListScreen = ({ navigation }: CategoryListScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <SectionHeader title="Todas as Categorias" />
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
export default CategoryListScreen
