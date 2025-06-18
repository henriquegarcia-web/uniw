// src/navigation/ProfileStack.tsx

import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { ProfileStackParamList } from './types'

import { Header } from '@/components/Header'
import ProfileScreen from '@/screens/profile/ProfileScreen'
import AddNewCardScreen from '@/screens/profile/AddNewCardScreen'
import OrderHistoryScreen from '@/screens/profile/OrderHistoryScreen'
import SettingsScreen from '@/screens/profile/SettingsScreen'
import EditProfileScreen from '@/screens/profile/EditProfileScreen'

const Stack = createNativeStackNavigator<ProfileStackParamList>()

export function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="profile" title="Perfil Usuário" />,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-profile" title="Perfil Usuário" />,
        }}
      />
      <Stack.Screen
        name="AddNewCard"
        component={AddNewCardScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-profile" title="Novo Cartão" />,
        }}
      />
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-profile" title="Histórico de Compras" />,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-profile" title="Configurações" />,
        }}
      />
    </Stack.Navigator>
  )
}
