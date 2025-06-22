// src/navigation/MainTabNavigator.tsx

import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { HomeStack } from './HomeStack'
import { CartStack } from './CartStack'
import { ProfileStack } from './ProfileStack'

import { CustomTabBar } from './CustomTabBar'
import { CategoryStack } from './CategoryStack'
import WishlistScreen from '@/screens/WishlistScreen'
import { Header } from '@/components/Header'
import { MainTabParamList } from '@uniw/shared-types'

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
        name="CategoryStack"
        component={CategoryStack}
        options={{ title: 'Categorias' }}
      />
      <Tab.Screen
        name="CartStack"
        component={CartStack}
        options={{ title: 'Carrinho' }}
      />
      <Tab.Screen
        name="Favoritos"
        component={WishlistScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="main" title="Favoritos" />,
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{ title: 'Perfil' }}
      />
    </Tab.Navigator>
  )
}
