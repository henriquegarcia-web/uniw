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
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { MainTabParamList } from '@/navigation/types'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { useMenu } from '@/contexts/MenuProvider'
import { InputSearch } from './forms/InputSearch'

type HeaderVariant = 'main' | 'back-cart' | 'back-title' | 'back-title-action'

type FeatherIconName = keyof typeof Feather.glyphMap

export interface HeaderProps {
  variant: HeaderVariant
  title?: string
  rightIconName?: FeatherIconName
  onRightIconPress?: () => void
}

export const Header = ({
  variant,
  title,
  rightIconName,
  onRightIconPress,
}: HeaderProps) => {
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>()

  const { user } = useClientAuth()
  const { openMenu } = useMenu()

  const handleBackPress = () => {
    navigation.goBack()
  }
  const onMenuPress = openMenu
  const onCartPress = () => navigation.navigate('CartStack', { screen: 'Cart' })
  const onProfilePress = () => navigation.navigate('ProfileStack', { screen: 'Profile' })

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
  const userHasPhoto = !!user?.baseProfile?.foto

  const renderRightComponent = () => {
    switch (variant) {
      case 'main':
        return (
          <TouchableOpacity onPress={onProfilePress}>
            {userHasPhoto ? (
              <Image source={{ uri: user.baseProfile.foto! }} style={styles.avatar} />
            ) : (
              <Image
                source={require('@/assets/images/avatar.jpg')}
                style={styles.avatarPlaceholder}
              />
            )}
          </TouchableOpacity>
        )
      case 'back-cart':
        return (
          <TouchableOpacity onPress={onCartPress} style={styles.cartButton}>
            <Feather
              name="shopping-cart"
              size={20}
              color={theme.colors.background}
              style={{ marginTop: 1, marginRight: 1 }}
            />
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
      {variant === 'main' && (
        <View style={styles.searchContainer}>
          <InputSearch onVoicePress={() => {}} />
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: theme.spacing['phone-default-header'],
    backgroundColor: theme.colors.surface,
  },
  container: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
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
  searchContainer: {
    height: 50,
    paddingHorizontal: theme.spacing.lg,
  },
  title: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.lg,
    lineHeight: theme.fonts.size.xl,
    color: theme.colors.text,
  },
  logo: {
    height: 40,
    width: 80,
  },
  avatar: {
    height: 36,
    width: 36,
    borderRadius: theme.borders.radius.circle,
  },
  avatarPlaceholder: {
    height: 36,
    width: 36,
    borderRadius: theme.borders.radius.circle,
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
