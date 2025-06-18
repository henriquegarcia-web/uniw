// src/components/UserTag.tsx

import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { theme } from '@/styles/theme'
import { AntDesign } from '@expo/vector-icons'

type AntDesignIconName = keyof typeof AntDesign.glyphMap

interface UserTagProps {
  label: string
  icon?: AntDesignIconName
}

export const UserTag = ({ label, icon }: UserTagProps) => {
  return (
    <View style={styles.container}>
      {icon && (
        <AntDesign
          name={icon}
          size={16}
          color={theme.colors.text_secondary}
          style={styles.icon}
        />
      )}

      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 28,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: theme.spacing.xs,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borders.radius.xs,
    borderWidth: 1,
    borderColor: theme.colors.text_secondary,
  },
  label: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.xs,
    lineHeight: theme.fonts.size.xs,
    color: theme.colors.text_secondary,
  },
  icon: {},
})
