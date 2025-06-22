// src/components/ProfileHeader.tsx

import React from 'react'
import { StyleSheet, TouchableOpacityProps, View, Text } from 'react-native'

import { theme } from '@/styles/theme'

interface ProfileHeaderProps extends TouchableOpacityProps {
  size?: 'default' | 'large'
  title?: string
}

export const ProfileHeader = ({ size, title }: ProfileHeaderProps) => {
  if (!title || title === '') return null

  const customStyles =
    size === 'large'
      ? {
          fontSize: theme.fonts.size.lg,
          color: theme.colors.text,
        }
      : {
          fontSize: theme.fonts.size.sm,
          color: theme.colors.text_secondary,
        }

  return <Text style={[styles.profileHeaderTitle, customStyles]}>{title}</Text>
}

const styles = StyleSheet.create({
  profileHeaderTitle: {
    marginBottom: theme.spacing.sm,

    fontFamily: theme.fonts.family.semiBold,
  },
})
