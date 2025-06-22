// src/navigation/CategoryStack.tsx

import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import { Header } from '@/components/Header'
import CategoryDetailsScreen from '@/screens/CategoryDetailsScreen'
import CategoryListScreen from '@/screens/CategoryListScreen'
import { getCategoryById } from '@/utils/mockGetters'
import { CategoryStackParamList } from '@uniw/shared-types'

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
          header: () => <Header variant="main-full" />,
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
    </Stack.Navigator>
  )
}
