// src/navigation/MainTabNavigator.tsx

import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MainTabParamList } from './types'

import { HomeStack } from './HomeStack'
import { CartStack } from './CartStack'
import { SettingsStack } from './SettingsStack'
import WishlistScreen from '@/screens/WishlistScreen'
import SearchScreen from '@/screens/SearchScreen'

import { CustomTabBar } from './CustomTabBar'
import { Header } from '@/components/Header'

const Tab = createBottomTabNavigator<MainTabParamList>()

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="HomeStack" component={HomeStack} options={{ title: 'Início' }} />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          title: 'Desejos',
          headerShown: true,
          header: () => <Header variant="main" />,
        }}
      />
      <Tab.Screen
        name="CartStack"
        component={CartStack}
        options={{ title: 'Carrinho' }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Pesquisar',
          headerShown: true,
          header: () => <Header variant="main" />,
        }}
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{ title: 'Perfil' }}
      />
    </Tab.Navigator>
  )
}
