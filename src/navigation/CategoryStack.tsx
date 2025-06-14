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
        // 1. Transforme 'options' em uma função que recebe { route }
        options={({ route }) => {
          // 2. Agora o TypeScript sabe que route.params contém 'categoryId'
          const { categoryId } = route.params
          const category = getCategoryById(categoryId)

          // 3. Retorne o objeto de opções
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
