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
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'

import { theme } from '@/styles/theme'
import { AppStackParamList } from '@/navigation/types'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { useMenu } from '@/contexts/MenuProvider'
import { InputSearch } from './forms/InputSearch'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type HeaderVariant =
  | 'main'
  | 'main-full'
  | 'back-cart'
  | 'back-title'
  | 'back-title-action'
  | 'profile'
  | 'back-profile'

type FeatherIcon = keyof typeof Feather.glyphMap
type MaterialCommunityIconsIcon = keyof typeof MaterialCommunityIcons.glyphMap

export interface HeaderProps {
  variant: HeaderVariant
  title?: string
  rightIconName?: MaterialCommunityIconsIcon
  onRightIconPress?: () => void
}

export const Header = ({
  variant,
  title,
  rightIconName,
  onRightIconPress,
}: HeaderProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

  const { user } = useClientAuth()
  const { openMenu } = useMenu()

  const userHasPhoto = !!user?.baseProfile?.foto
  const isVariantProfile = variant === 'profile' || variant === 'back-profile'

  const backgroundColor = isVariantProfile ? theme.colors.secondary : theme.colors.surface
  const logoImage = isVariantProfile
    ? require('@/assets/uniw_logo_constrast.png')
    : require('@/assets/uniw_logo.png')

  const onMenuPress = openMenu
  const handleBackPress = () => {
    navigation.goBack()
  }
  const onNotificationsPress = () => {
    navigation.navigate('MainTabs', {
      screen: 'ProfileStack',
      params: {
        screen: 'Notifications',
      },
    })
  }
  const onChatsPress = () => {
    navigation.navigate('MainTabs', {
      screen: 'ProfileStack',
      params: {
        screen: 'ChatsList',
      },
    })
  }
  const onSettingsPress = () => {
    navigation.navigate('MainTabs', {
      screen: 'ProfileStack',
      params: {
        screen: 'Settings',
      },
    })
  }
  const onCartPress = () => {
    navigation.navigate('MainTabs', {
      screen: 'CartStack',
      params: {
        screen: 'Cart',
      },
    })
  }
  const onProfilePress = () => {
    navigation.navigate('MainTabs', {
      screen: 'ProfileStack',
      params: {
        screen: 'Profile',
      },
    })
  }

  const renderLeftComponent = () => {
    switch (variant) {
      case 'main':
      case 'main-full':
        return (
          <TouchableOpacity onPress={onMenuPress} style={styles.iconButtonLeft}>
            <MaterialCommunityIcons
              name="menu"
              size={32}
              color={
                isVariantProfile ? theme.colors.text_contrast : theme.colors.secondary
              }
            />
          </TouchableOpacity>
        )
      case 'back-profile':
      case 'back-cart':
      case 'back-title':
      case 'back-title-action':
        return (
          <TouchableOpacity onPress={handleBackPress} style={styles.iconButtonLeft}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={26}
              color={isVariantProfile ? theme.colors.text_contrast : theme.colors.text}
            />
          </TouchableOpacity>
        )
      case 'profile':
        return (
          <>
            <TouchableOpacity
              onPress={onNotificationsPress}
              style={styles.iconButtonLeft}
            >
              <MaterialCommunityIcons
                name="bell-outline"
                size={26}
                color={isVariantProfile ? theme.colors.text_contrast : theme.colors.text}
              />
            </TouchableOpacity>
            <View style={styles.placeholder} />
          </>
        )
      default:
        return null
    }
  }

  const renderCenterComponent = () => {
    switch (variant) {
      case 'main':
      case 'main-full':
      case 'profile':
        return <Image source={logoImage} style={styles.logo} resizeMode="contain" />
      case 'back-profile':
      case 'back-title':
      case 'back-title-action':
      case 'back-cart':
        return (
          <Text
            style={[
              styles.title,
              {
                color: isVariantProfile ? theme.colors.text_contrast : theme.colors.text,
              },
            ]}
          >
            {title}
          </Text>
        )
      default:
        return null
    }
  }

  const renderRightComponent = () => {
    switch (variant) {
      case 'main':
      case 'main-full':
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
              size={isVariantProfile ? 26 : 20}
              color={theme.colors.background}
              style={{ marginTop: 1, marginRight: 1 }}
            />
          </TouchableOpacity>
        )
      case 'back-title-action':
        if (rightIconName && onRightIconPress) {
          return (
            <TouchableOpacity onPress={onRightIconPress} style={styles.iconButtonRight}>
              <MaterialCommunityIcons
                name={rightIconName}
                size={26}
                color={theme.colors.text}
              />
            </TouchableOpacity>
          )
        }
        return <View style={styles.placeholder} />
      case 'profile':
        return (
          <>
            <TouchableOpacity onPress={onChatsPress} style={styles.iconButtonRight}>
              <MaterialCommunityIcons
                name="message-outline"
                size={26}
                color={isVariantProfile ? theme.colors.text_contrast : theme.colors.text}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onSettingsPress} style={styles.iconButtonRight}>
              <MaterialCommunityIcons
                name="cog-outline"
                size={26}
                color={isVariantProfile ? theme.colors.text_contrast : theme.colors.text}
              />
            </TouchableOpacity>
          </>
        )
      case 'back-title':
      case 'back-profile':
      default:
        return <View style={styles.placeholder} />
    }
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <View style={styles.container}>
        <View style={styles.sideComponent}>{renderLeftComponent()}</View>
        <View style={styles.centerComponent}>{renderCenterComponent()}</View>
        <View style={styles.sideComponent}>{renderRightComponent()}</View>
      </View>
      {variant === 'main-full' && (
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
  iconButtonLeft: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  iconButtonRight: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  placeholder: {
    width: 40,
  },
})
