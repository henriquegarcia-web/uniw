// src/navigation/AppAStack.tsx

import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppStackParamList } from './types'

import { MainTabNavigator } from './MainTabNavigator'
import SearchResultsScreen from '@/screens/SearchResultsScreen'
import { Header } from '@/components/Header'
import ProductDetailsScreen from '@/screens/ProductDetailsScreen'

const Stack = createNativeStackNavigator<AppStackParamList>()

export function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen
        name="SearchResults"
        component={SearchResultsScreen}
        options={({ route }) => ({
          headerShown: true,
          header: () => (
            <Header
              variant="back-title"
              title={`Busca por "${route.params.searchTerm}"`}
            />
          ),
        })}
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
