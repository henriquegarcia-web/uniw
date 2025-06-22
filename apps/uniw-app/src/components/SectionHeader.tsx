// src/components/SectionHeader.tsx

import React from 'react'
import { StyleSheet, TouchableOpacityProps, View, Text } from 'react-native'

import { theme } from '@/styles/theme'

interface SectionHeaderProps extends TouchableOpacityProps {
  title?: string
}

export const SectionHeader = ({ title }: SectionHeaderProps) => {
  if (!title || title === '') return null

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,

    // borderWidth: 1,
    // borderColor: 'red',
  },
  title: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.xl,
    paddingTop: 2,
  },
})
