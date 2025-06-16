// src/components/SideMenu.tsx

import React, { useEffect, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  SafeAreaView,
  Image,
} from 'react-native'
import { Feather } from '@expo/vector-icons'

import { useMenu } from '@/contexts/MenuProvider'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { theme } from '@/styles/theme'
import { navigate } from '@/services/navigation'
import { MainTabParamList } from '@/navigation/types'

const { width } = Dimensions.get('window')
const MENU_WIDTH = width * 0.75

export const SideMenu = () => {
  const { isOpen, closeMenu } = useMenu()
  const { user, signOut } = useClientAuth()

  const position = useRef(new Animated.Value(-MENU_WIDTH)).current

  useEffect(() => {
    Animated.timing(position, {
      toValue: isOpen ? 0 : -MENU_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [isOpen, position])

  const navigateAndClose = (
    name: keyof MainTabParamList,
    params?: MainTabParamList[keyof MainTabParamList],
  ) => {
    navigate(name, params)
    closeMenu()
  }

  const handleSignOut = () => {
    closeMenu()
    signOut()
  }

  if (!isOpen) {
    return null
  }

  return (
    <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={closeMenu}>
      <Animated.View
        style={[styles.menuContainer, { transform: [{ translateX: position }] }]}
      >
        <View style={styles.menuHeader}>
          <Image
            source={require('@/assets/uniw_logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <SafeAreaView style={styles.menuWrapper}>
          <View style={styles.menuItems}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigateAndClose('ProfileStack', { screen: 'Profile' })}
            >
              <Feather name="user" size={22} color={theme.colors.text} />
              <Text style={styles.menuItemText}>Meu Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigateAndClose('ProfileStack', { screen: 'Wishlist' })}
            >
              <Feather name="heart" size={22} color={theme.colors.text} />
              <Text style={styles.menuItemText}>Favoritos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigateAndClose('ProfileStack', { screen: 'OrderHistory' })}
            >
              <Feather name="shopping-bag" size={22} color={theme.colors.text} />
              <Text style={styles.menuItemText}>Meus Pedidos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigateAndClose('ProfileStack', { screen: 'Settings' })}
            >
              <Feather name="settings" size={22} color={theme.colors.text} />
              <Text style={styles.menuItemText}>Configurações</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
            <Feather name="log-out" size={22} color={theme.colors.error} />
            <Text style={[styles.menuItemText, { color: theme.colors.error }]}>Sair</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: MENU_WIDTH,
    backgroundColor: theme.colors.background,
    paddingTop: theme.spacing['phone-default-header'],
  },
  menuWrapper: {
    flex: 1,
  },
  menuHeader: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  logo: {
    height: 40,
    width: 80,
  },
  menuItems: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  menuItemText: {
    fontFamily: theme.fonts.family.medium,
    fontSize: theme.fonts.size.md,
    marginLeft: theme.spacing.md,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
})
