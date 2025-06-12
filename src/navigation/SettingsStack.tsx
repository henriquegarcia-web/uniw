// src/navigation/SettingsStack.tsx

import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SettingsStackParamList } from './types'

import ProfileScreen from '@/screens/profile/ProfileScreen'
import AddNewCardScreen from '@/screens/profile/AddNewCardScreen'
import OrderHistoryScreen from '@/screens/profile/OrderHistoryScreen'
import { Header } from '@/components/Header'

const Stack = createNativeStackNavigator<SettingsStackParamList>()

export function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-title" title="Perfil Usuário" />,
        }}
      />
      <Stack.Screen
        name="AddNewCard"
        component={AddNewCardScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-title" title="Novo Cartão" />,
        }}
      />
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-title" title="Histórico de Compras" />,
        }}
      />
    </Stack.Navigator>
  )
}
