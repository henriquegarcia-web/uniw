// src/screens/ProfileScreen.tsx

import React from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native'

import type { AppStackParamList, ProfileScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { UserTag } from '@/components/UserTag'

type AntDesignIconName = keyof typeof AntDesign.glyphMap

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const { user } = useClientAuth()

  const userHasPhoto = !!user?.baseProfile?.foto

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.userPictureContainer}>
          {userHasPhoto ? (
            <Image source={{ uri: user.baseProfile.foto! }} style={styles.userPicture} />
          ) : (
            <Image
              source={require('@/assets/images/avatar.jpg')}
              style={styles.placeholder}
            />
          )}
        </View>
        <View style={styles.userMainInfos}>
          <Text style={styles.userName}>{user?.baseProfile.nome}</Text>
          <Text style={styles.userEmail}>{user?.baseProfile.email}</Text>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.userBadges}>
          <UserTag label="Membro do Clube" icon="Trophy" />
          <UserTag label="Verificado" icon="Safety" />
        </View>

        <ProfileMenu sectionTitle="Principal" type="grid">
          <ProfileNavigatorItem label="Ofertas" icon="rocket1" screen="" />
          <ProfileNavigatorItem label="Histórico" icon="shoppingcart" screen="" />
          <ProfileNavigatorItem label="Clube" icon="Trophy" screen="" />
          <ProfileNavigatorItem label="Cupons" icon="tagso" screen="" />
        </ProfileMenu>

        <ProfileMenu sectionTitle="Mais atividades" type="list">
          <ProfileMenuItem label="Comprar novamente" icon="retweet" screen="" />
          <ProfileMenuItem label="Programa de fidelidade" icon="Trophy" screen="" />
          <ProfileMenuItem label="Prêmios" icon="gift" screen="" />
        </ProfileMenu>

        <ProfileMenu sectionTitle="Suporte" type="list">
          <ProfileMenuItem label="Venda na UNIW" icon="isv" screen="" />
          <ProfileMenuItem label="Central de Ajuda" icon="customerservice" screen="" />
          <ProfileMenuItem label="Sobre nós" icon="book" screen="" />
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
  userName: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.lg,
    lineHeight: theme.fonts.size.xl,
    color: theme.colors.text_contrast,
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
    height: 35,
    flexDirection: 'row',
    columnGap: theme.spacing.xs,
    paddingLeft: 111,

    // borderWidth: 1,
    // borderColor: 'red',
  },
  profileMenuWraper: {
    rowGap: theme.spacing.sm,
  },
  profileMenuWraperTitle: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.sm,
    color: theme.colors.text_secondary,
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
    <View style={styles.profileMenuWraper}>
      <Text style={styles.profileMenuWraperTitle}>{sectionTitle}</Text>
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
  icon: AntDesignIconName
  screen: string
}

export const ProfileNavigatorItem = ({
  label,
  icon,
  screen,
}: ProfileNavigatorItemProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

  const handleNavigate = () => {
    // navigation.navigate('MainTabs', {
    //   screen: 'ProfileStack',
    //   params: {
    //     screen: screen,
    //   },
    // })
  }

  return (
    <TouchableOpacity
      onPress={handleNavigate}
      activeOpacity={0.7}
      style={profileNavigatorItemStyles.navigatorItem}
    >
      {icon && (
        <AntDesign
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
  label: string
  icon?: AntDesignIconName
  screen?: string
  onPress?: () => void
}

export const ProfileMenuItem = ({
  label,
  icon,
  screen,
  onPress,
}: ProfileMenuItemProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

  const handleNavigate = () => {
    if (onPress) {
      onPress()
      return
    }
    // navigation.navigate('MainTabs', {
    //   screen: 'ProfileStack',
    //   params: {
    //     screen: screen,
    //   },
    // })
  }

  return (
    <TouchableOpacity
      onPress={handleNavigate}
      activeOpacity={0.7}
      style={profileMenuItemStyles.menuItem}
    >
      {icon && (
        <AntDesign
          name={icon}
          size={18}
          color={theme.colors.text_secondary}
          style={profileMenuItemStyles.menuItemIcon}
        />
      )}

      <Text
        style={[
          profileMenuItemStyles.menuItemLabel,
          onPress && profileMenuItemStyles.menuItemLabelExit,
        ]}
      >
        {label}
      </Text>

      <AntDesign
        name="right"
        size={14}
        color={theme.colors.text_tertiary}
        style={profileMenuItemStyles.menuItemIconChevron}
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
    paddingRight: 10,
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
