// src/components/ProfileHeader.tsx

import React from 'react'
import { StyleSheet, TouchableOpacityProps, View, Text } from 'react-native'

import { themeApp, colors } from '@uniw/shared-constants'

interface ProfileHeaderProps extends TouchableOpacityProps {
  size?: 'default' | 'large'
  title?: string
}

export const ProfileHeader = ({ size, title }: ProfileHeaderProps) => {
  if (!title || title === '') return null

  const customStyles =
    size === 'large'
      ? {
          fontSize: themeApp.fonts.size.lg,
          color: colors.text.primary,
        }
      : {
          fontSize: themeApp.fonts.size.sm,
          color: colors.text.secondary,
        }

  return <Text style={[styles.profileHeaderTitle, customStyles]}>{title}</Text>
}

const styles = StyleSheet.create({
  profileHeaderTitle: {
    marginBottom: themeApp.spacing.sm,

    fontFamily: themeApp.fonts.family.semiBold,
  },
})
