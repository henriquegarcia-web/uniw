// src/navigation/CartStack.tsx

import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import CartScreen from '@/screens/cart/CartScreen'
import OrderSummaryScreen from '@/screens/cart/OrderSummaryScreen'
import PaymentScreen from '@/screens/cart/PaymentScreen'
import CheckoutSuccessScreen from '@/screens/cart/CheckoutSuccessScreen'
import { Header } from '@/components/Header'
import { CartStackParamList } from '@uniw/shared-types'

const Stack = createNativeStackNavigator<CartStackParamList>()

export function CartStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-title" title="Carrinho" />,
        }}
      />
      <Stack.Screen
        name="OrderSummary"
        component={OrderSummaryScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-title" title="Ordem de Compra" />,
        }}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-title" title="Pagamento" />,
        }}
      />
      <Stack.Screen
        name="CheckoutSuccess"
        component={CheckoutSuccessScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-title" title="Checkout" />,
        }}
      />
    </Stack.Navigator>
  )
}
