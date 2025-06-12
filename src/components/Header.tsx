// src/components/Header.tsx

import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'

import { theme } from '@/styles/theme'

type HeaderVariant = 'main' | 'back-cart' | 'back-title' | 'back-title-action'

type FeatherIconName = keyof typeof Feather.glyphMap

export interface HeaderProps {
  variant: HeaderVariant
  title?: string
  onBackPress?: () => void
  onCartPress?: () => void
  onMenuPress?: () => void
  onProfilePress?: () => void
  rightIconName?: FeatherIconName
  onRightIconPress?: () => void
}

export const Header = ({
  variant,
  title,
  onBackPress,
  onCartPress,
  onMenuPress,
  onProfilePress,
  rightIconName,
  onRightIconPress,
}: HeaderProps) => {
  const navigation = useNavigation()

  const handleBackPress = onBackPress || navigation.goBack

  const renderLeftComponent = () => {
    switch (variant) {
      case 'main':
        return (
          <TouchableOpacity onPress={onMenuPress}>
            <Feather name="menu" size={26} color={theme.colors.secondary} />
          </TouchableOpacity>
        )
      case 'back-cart':
      case 'back-title':
      case 'back-title-action':
        return (
          <TouchableOpacity onPress={handleBackPress}>
            <Feather name="chevron-left" size={26} color={theme.colors.text} />
          </TouchableOpacity>
        )
      default:
        return null
    }
  }

  const renderCenterComponent = () => {
    switch (variant) {
      case 'main':
        return (
          <Image
            source={require('@/assets/uniw_logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        )
      case 'back-title':
      case 'back-title-action':
        return <Text style={styles.title}>{title}</Text>
      default:
        return null
    }
  }

  const renderRightComponent = () => {
    switch (variant) {
      case 'main':
        return (
          <TouchableOpacity onPress={onProfilePress}>
            <Image source={require('@/assets/favicon.png')} style={styles.avatar} />
          </TouchableOpacity>
        )
      case 'back-cart':
        return (
          <TouchableOpacity onPress={onCartPress} style={styles.cartButton}>
            <Feather name="shopping-cart" size={24} color={theme.colors.background} />
          </TouchableOpacity>
        )
      case 'back-title-action':
        if (rightIconName && onRightIconPress) {
          return (
            <TouchableOpacity onPress={onRightIconPress}>
              <Feather name={rightIconName} size={24} color={theme.colors.text} />
            </TouchableOpacity>
          )
        }
        return <View style={styles.placeholder} />
      case 'back-title':
      default:
        return <View style={styles.placeholder} />
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.sideComponent}>{renderLeftComponent()}</View>
        <View style={styles.centerComponent}>{renderCenterComponent()}</View>
        <View style={styles.sideComponent}>{renderRightComponent()}</View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: theme.spacing['phone-default-header'],
    backgroundColor: theme.colors.background,
  },
  container: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  sideComponent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerComponent: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.lg,
    lineHeight: theme.fonts.size.lg,
    color: theme.colors.text,
  },
  logo: {
    height: 40,
    width: 80,
  },
  avatar: {
    height: 36,
    width: 36,
    borderRadius: 18,
  },
  cartButton: {
    backgroundColor: theme.colors.secondary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    width: 26,
  },
})
