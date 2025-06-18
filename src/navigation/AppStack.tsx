// src/navigation/AppAStack.tsx

import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppStackParamList } from './types'

import { MainTabNavigator } from './MainTabNavigator'
import SearchResultsScreen from '@/screens/SearchResultsScreen'
import { Header } from '@/components/Header'
import ProductDetailsScreen from '@/screens/ProductDetailsScreen'
import DailyOffersScreen from '@/screens/profile/DailyOffersScreen'
import AboutUsScreen from '@/screens/support/AboutUsScreen'
import DeleteAccountScreen from '@/screens/support/DeleteAccountScreen'
import PoliciesScreen from '@/screens/support/PoliciesScreen'
import HelpCenterScreen from '@/screens/support/HelpCenterScreen'
import SaleAnnouncementScreen from '@/screens/support/SaleAnnouncementScreen'

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
      <Stack.Screen
        name="DailyOffers"
        component={DailyOffersScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-cart" title="Ofertas" />,
        }}
      />

      {/* SUPPORT */}
      <Stack.Screen
        name="AboutUs"
        component={AboutUsScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-title" title="Sobre a UNIW" />,
        }}
      />
      <Stack.Screen
        name="DeleteAccount"
        component={DeleteAccountScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-title" title="Deletar conta" />,
        }}
      />
      <Stack.Screen
        name="Policies"
        component={PoliciesScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-title" title="Políticas" />,
        }}
      />
      <Stack.Screen
        name="HelpCenter"
        component={HelpCenterScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-title" title="Central de ajuda" />,
        }}
      />
      <Stack.Screen
        name="SaleAnnouncement"
        component={SaleAnnouncementScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-title" title="Venda na UNIW" />,
        }}
      />
    </Stack.Navigator>
  )
}
