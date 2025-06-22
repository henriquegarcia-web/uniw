// src/components/ListEmptyMessage.tsx

import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { themeApp, colors } from '@uniw/shared-constants'

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
    padding: themeApp.spacing.md,
  },
  emptyMessage: {
    fontFamily: themeApp.fonts.family.regular,
    fontSize: themeApp.fonts.size.md,
    color: colors.text.primary,
  },
})
