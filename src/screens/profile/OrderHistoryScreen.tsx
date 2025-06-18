// src/screens/profile/OrderHistoryScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, Text, ScrollView } from 'react-native'

import type { OrderHistoryScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'

const OrderHistoryScreen = ({ navigation }: OrderHistoryScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      ></ScrollView>
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    rowGap: theme.spacing.md,
  },
})
export default OrderHistoryScreen
