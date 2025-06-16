// src/navigation/CategoryStack.tsx

import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { CategoryStackParamList } from './types'

import ProductDetailsScreen from '@/screens/ProductDetailsScreen'
import { Header } from '@/components/Header'
import CategoryDetailsScreen from '@/screens/CategoryDetailsScreen'
import CategoryListScreen from '@/screens/CategoryListScreen'
import { getCategoryById } from '@/utils/mockGetters'

const Stack = createNativeStackNavigator<CategoryStackParamList>()

export function CategoryStack() {
  return (
    <Stack.Navigator
      initialRouteName="CategoryList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="CategoryList"
        component={CategoryListScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="main" />,
        }}
      />
      <Stack.Screen
        name="CategoryDetails"
        component={CategoryDetailsScreen}
        options={({ route }) => {
          const { categoryId } = route.params
          const category = getCategoryById(categoryId)
          return {
            headerShown: true,
            header: () => <Header variant="back-title" title={category?.name} />,
          }
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
