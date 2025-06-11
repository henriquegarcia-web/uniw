// src/navigation/SettingsStack.tsx

import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SettingsStackParamList } from './types'

import ProfileScreen from '@/screens/profile/ProfileScreen'
import AddNewCardScreen from '@/screens/profile/AddNewCardScreen'
import OrderHistoryScreen from '@/screens/profile/OrderHistoryScreen'

const Stack = createNativeStackNavigator<SettingsStackParamList>()

export function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="AddNewCard" component={AddNewCardScreen} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
    </Stack.Navigator>
  )
}
