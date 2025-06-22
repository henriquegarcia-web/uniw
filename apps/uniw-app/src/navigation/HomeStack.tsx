// src/navigation/HomeStack.tsx

import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from '@/screens/HomeScreen'
import { Header } from '@/components/Header'
import { HomeStackParamList } from '@uniw/shared-types'

const Stack = createNativeStackNavigator<HomeStackParamList>()

export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="main-full" />,
        }}
      />
    </Stack.Navigator>
  )
}
