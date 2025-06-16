// src/navigation/MainTabNavigator.tsx

import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MainTabParamList } from './types'

import { HomeStack } from './HomeStack'
import { CartStack } from './CartStack'
import { ProfileStack } from './ProfileStack'

import { CustomTabBar } from './CustomTabBar'
import { Header } from '@/components/Header'
import { CategoryStack } from './CategoryStack'
import SearchResultsScreen from '@/screens/SearchResultsScreen'

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
        options={{ title: 'Produtos' }}
      />
      <Tab.Screen
        name="CartStack"
        component={CartStack}
        options={{ title: 'Carrinho' }}
      />
      <Tab.Screen
        name="SearchResults"
        component={SearchResultsScreen}
        options={{
          title: 'Pesquisa',
          headerShown: true,
          header: () => <Header variant="main" />,
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
