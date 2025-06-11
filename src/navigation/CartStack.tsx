// src/navigation/CartStack.tsx

import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { CartStackParamList } from './types'

import CartScreen from '@/screens/cart/CartScreen'
import OrderSummaryScreen from '@/screens/cart/OrderSummaryScreen'
import PaymentScreen from '@/screens/cart/PaymentScreen'
import CheckoutSuccessScreen from '@/screens/cart/CheckoutSuccessScreen'

const Stack = createNativeStackNavigator<CartStackParamList>()

export function CartStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="CheckoutSuccess" component={CheckoutSuccessScreen} />
    </Stack.Navigator>
  )
}
