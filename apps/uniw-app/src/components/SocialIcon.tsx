// src/components/SocialIcon.tsx

import React from 'react'
import { Image } from 'react-native'

import { AntDesign } from '@expo/vector-icons'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import { theme } from '@/styles/theme'

type Provider = 'google' | 'facebook' | 'apple'

interface SocialIconProps {
  provider: Provider
}

export const SocialIcon = ({ provider }: SocialIconProps) => {
  switch (provider) {
    case 'apple':
      return (
        <AntDesign
          name="apple1"
          size={26}
          color={theme.colors.text}
          style={{ marginTop: -4 }}
        />
      )

    case 'google':
      return (
        <Image
          source={require('@/assets/icons/google.png')}
          style={{ width: 26, height: 26 }}
        />
      )

    case 'facebook':
      return <FontAwesome name="facebook" size={26} color="#3D4DA6" />

    default:
      return null
  }
}
