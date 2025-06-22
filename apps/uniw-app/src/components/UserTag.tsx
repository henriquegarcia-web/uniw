// src/components/UserTag.tsx

import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { themeApp, colors } from '@uniw/shared-constants'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { MaterialCommunityIconsIcon } from '@uniw/shared-types'

interface UserTagProps {
  label: string
  icon?: MaterialCommunityIconsIcon
}

export const UserTag = ({ label, icon }: UserTagProps) => {
  return (
    <View style={styles.container}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={16}
          color={colors.text.secondary}
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
    columnGap: themeApp.spacing.xs,
    paddingVertical: themeApp.spacing.xs,
    paddingHorizontal: themeApp.spacing.sm,
    borderRadius: themeApp.borders.radius.xs,
    borderWidth: 1,
    borderColor: colors.text.secondary,
  },
  label: {
    fontFamily: themeApp.fonts.family.semiBold,
    fontSize: themeApp.fonts.size.xs,
    lineHeight: themeApp.fonts.size.xs,
    color: colors.text.secondary,
  },
  icon: {},
})
