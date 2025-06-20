// src/screens/profile/ProfileScreen.tsx

import React from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native'

import type {
  AppStackParamList,
  ProfileScreenProps,
  ProfileStackParamList,
} from '@/navigation/types'
import { theme } from '@/styles/theme'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { UserTag } from '@/components/UserTag'
import { ProfileHeader } from '@/components/ProfileHeader'
import { EditableUserPicture } from '@/components/forms/EditableUserPicture'
import { EditableUserName } from '@/components/forms/EditableUserName'

type MaterialCommunityIconsIconName = keyof typeof MaterialCommunityIcons.glyphMap

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const { user } = useClientAuth()

  const userHasPhoto = !!user?.baseProfile?.foto

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.userPictureContainer}>
          <EditableUserPicture />

          {/* {userHasPhoto ? (
            <Image source={{ uri: user.baseProfile.foto! }} style={styles.userPicture} />
          ) : (
            <Image
              source={require('@/assets/images/avatar.jpg')}
              style={styles.placeholder}
            />
          )} */}
        </View>
        <View style={styles.userMainInfos}>
          <EditableUserName />
          {/* <Text style={styles.userName}>{user?.baseProfile.nome}</Text> */}
          <Text style={styles.userEmail}>{user?.baseProfile.email}</Text>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.userBadges}>
          <UserTag label="Membro do Clube" icon="crown-outline" />
          <UserTag label="Verificado" icon="shield-check-outline" />
        </View>

        <ProfileMenu sectionTitle="Principal" type="grid">
          <ProfileNavigatorItem
            label="Ofertas"
            icon="tag-outline"
            appScreen="DailyOffers"
          />
          <ProfileNavigatorItem label="Histórico" icon="history" screen="OrderHistory" />
          <ProfileNavigatorItem label="Clube" icon="crown-outline" screen="Club" />
          <ProfileNavigatorItem
            label="Cupons"
            icon="ticket-percent-outline"
            screen="Coupons"
          />
        </ProfileMenu>

        <ProfileMenu sectionTitle="Mais atividades" type="list">
          <ProfileMenuItem
            label="Comprar novamente"
            icon="cart-plus"
            screen="OrderHistory"
          />
          <ProfileMenuItem
            label="Programa de fidelidade"
            icon="handshake-outline"
            screen="LoyaltyProgram"
          />
          {/* <ProfileMenuItem label="Prêmios" icon="gift-outline" screen="Awards" /> */}
        </ProfileMenu>

        <ProfileMenu sectionTitle="Suporte" type="list">
          <ProfileMenuItem
            label="Venda na UNIW"
            icon="storefront-outline"
            appScreen="SaleAnnouncement"
          />
          <ProfileMenuItem
            label="Central de Ajuda"
            icon="headset"
            appScreen="HelpCenter"
          />
          <ProfileMenuItem label="Sobre nós" icon="domain" appScreen="AboutUs" />
        </ProfileMenu>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    marginBottom: theme.spacing['4xl'],
  },
  topContainer: {
    position: 'relative',
    height: 50,
    justifyContent: 'flex-end',
    paddingBottom: 12,
  },
  userPictureContainer: {
    position: 'absolute',
    bottom: -50,
    left: theme.spacing.lg,
    zIndex: 100,
  },
  userPicture: {
    width: 100,
    height: 100,
    borderRadius: theme.borders.radius.circle,
  },
  placeholder: {
    width: 100,
    height: 100,
    borderRadius: theme.borders.radius.circle,
  },
  userMainInfos: {
    rowGap: 2,
    paddingLeft: 135,
  },
  userEmail: {
    fontFamily: theme.fonts.family.medium,
    fontSize: theme.fonts.size.sm,
    lineHeight: theme.fonts.size.md,
    color: theme.colors.text_contrast,
    opacity: 0.7,
  },
  mainContainer: {
    flex: 1,
    rowGap: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.borders.radius.md,
    borderTopRightRadius: theme.borders.radius.md,
  },
  userBadges: {
    height: 40,
    flexDirection: 'row',
    columnGap: theme.spacing.xs,
    paddingLeft: 111,
    marginTop: -5,

    // borderWidth: 1,
    // borderColor: 'red',
  },
})

export default ProfileScreen

// ==================================================================

interface IProfileMenu {
  type: 'list' | 'grid'
  sectionTitle: string
  children: React.ReactNode
}

export const ProfileMenu = ({ type, sectionTitle, children }: IProfileMenu) => {
  return (
    <View style={profileMenuStyles.profileMenuWraper}>
      <ProfileHeader title={sectionTitle} />
      <View
        style={
          type === 'grid'
            ? profileMenuStyles.gridContainer
            : profileMenuStyles.listContainer
        }
      >
        {children}
      </View>
    </View>
  )
}

const profileMenuStyles = StyleSheet.create({
  profileMenuWraper: {},
  gridContainer: {
    // borderWidth: 1,
    // borderColor: 'red',

    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },

  listContainer: {
    // borderWidth: 1,
    // borderColor: 'red',

    gap: 6,
  },
})

// ==================================

interface ProfileNavigatorItemProps {
  label: string
  icon: MaterialCommunityIconsIconName
  screen?: keyof ProfileStackParamList
  appScreen?: keyof AppStackParamList
  onPress?: () => void
}

export const ProfileNavigatorItem = ({
  label,
  icon,
  screen,
  appScreen,
  onPress,
}: ProfileNavigatorItemProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

  const handleNavigate = () => {
    if (onPress) {
      onPress()
    } else if (appScreen) {
      navigation.navigate(appScreen as any)
    } else if (screen) {
      navigation.navigate('MainTabs', {
        screen: 'ProfileStack',
        params: { screen: screen as any },
      })
    }
  }

  return (
    <TouchableOpacity
      onPress={handleNavigate}
      activeOpacity={0.7}
      style={profileNavigatorItemStyles.navigatorItem}
    >
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={theme.colors.text_secondary}
          style={profileNavigatorItemStyles.navigatorItemIcon}
        />
      )}

      <Text style={profileNavigatorItemStyles.navigatorItemLabel}>{label}</Text>
    </TouchableOpacity>
  )
}

const profileNavigatorItemStyles = StyleSheet.create({
  navigatorItem: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    rowGap: 6,
    paddingVertical: 14,
    borderRadius: theme.borders.radius.xs,

    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  navigatorItemIcon: {},
  navigatorItemLabel: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.sm,
    lineHeight: theme.fonts.size.md,
    color: theme.colors.text_secondary,
  },
})

// ==================================================================

interface ProfileMenuItemProps {
  type?: 'default' | 'negative'
  label: string
  icon?: MaterialCommunityIconsIconName
  screen?: keyof ProfileStackParamList
  appScreen?: keyof AppStackParamList
  onPress?: () => void
}

export const ProfileMenuItem = ({
  type = 'default',
  label,
  icon,
  screen,
  appScreen,
  onPress,
}: ProfileMenuItemProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

  const handleNavigate = () => {
    if (onPress) {
      onPress()
    } else if (appScreen) {
      navigation.navigate(appScreen as any)
    } else if (screen) {
      navigation.navigate('MainTabs', {
        screen: 'ProfileStack',
        params: { screen: screen as any },
      })
    }
  }

  return (
    <TouchableOpacity
      onPress={handleNavigate}
      activeOpacity={0.7}
      style={profileMenuItemStyles.menuItem}
    >
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={18}
          color={theme.colors.text_secondary}
          style={[
            profileMenuItemStyles.menuItemIcon,
            type === 'negative' && profileMenuItemStyles.menuItemLabelExit,
          ]}
        />
      )}

      <Text
        style={[
          profileMenuItemStyles.menuItemLabel,
          type === 'negative' && profileMenuItemStyles.menuItemLabelExit,
        ]}
      >
        {label}
      </Text>

      <MaterialCommunityIcons
        name="chevron-right"
        size={20}
        color={theme.colors.text_tertiary}
        style={[
          profileMenuItemStyles.menuItemIconChevron,
          type === 'negative' && profileMenuItemStyles.menuItemLabelExit,
        ]}
      />
    </TouchableOpacity>
  )
}

const profileMenuItemStyles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    height: 42,
    paddingLeft: 14,
    paddingRight: 8,
    borderRadius: theme.borders.radius.xs,

    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  menuItemIcon: {},
  menuItemLabel: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    lineHeight: theme.fonts.size.lg,
    color: theme.colors.text_secondary,
  },
  menuItemLabelExit: {
    color: theme.colors.error,
  },
  menuItemIconChevron: {
    marginLeft: 'auto',
  },
})
