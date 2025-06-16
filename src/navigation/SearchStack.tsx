// src/navigation/SearchStack.tsx

import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SearchStackParamList } from './types'

import ProductDetailsScreen from '@/screens/ProductDetailsScreen'
import { Header } from '@/components/Header'
import SearchResultsScreen from '@/screens/SearchResultsScreen'

const Stack = createNativeStackNavigator<SearchStackParamList>()

export function SearchStack() {
  return (
    <Stack.Navigator
      initialRouteName="SearchResults"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="SearchResults"
        component={SearchResultsScreen}
        options={{
          title: 'Pesquisa',
          headerShown: true,
          header: () => <Header variant="main" />,
        }}
      />
      <Stack.Screen
        name="SearchProductDetails"
        component={ProductDetailsScreen}
        options={{
          // title: '',
          headerShown: true,
          header: () => <Header variant="back-cart" />,
        }}
      />
    </Stack.Navigator>
  )
}
