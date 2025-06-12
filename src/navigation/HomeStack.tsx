// src/navigation/HomeStack.tsx

import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeStackParamList } from './types'

import HomeScreen from '@/screens/HomeScreen'
import ProductDetailsScreen from '@/screens/ProductDetailsScreen'
import { Header } from '@/components/Header'

const Stack = createNativeStackNavigator<HomeStackParamList>()

export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Home"  
        component={HomeScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="main" />,
        }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-cart" />,
        }}
      />
    </Stack.Navigator>
  )
}
