// src/components/ListEmptyMessage.tsx

import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { theme } from '@/styles/theme'

interface ListEmptyMessageProps {
  message: string
}

export const ListEmptyMessage = ({ message }: ListEmptyMessageProps) => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyMessage}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  emptyContainer: {
    padding: theme.spacing.md,
  },
  emptyMessage: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    color: theme.colors.text,
  },
})
