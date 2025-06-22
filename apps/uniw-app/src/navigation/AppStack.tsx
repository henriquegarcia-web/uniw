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
import HelpArticleDetailsScreen from '@/screens/support/HelpArticleDetailsScreen'
import TicketDetailsScreen from '@/screens/support/TicketDetailsScreen'
import TicketHistoryScreen from '@/screens/support/TicketHistoryScreen'
import ContactSupportScreen from '@/screens/support/ContactSupportScreen'
import HelpTopicDetailsScreen from '@/screens/support/HelpTopicDetailsScreen'
import { getHelpCategoryById } from '@/utils/mockGetters'

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
          header: () => <Header variant="back-title" title="Deletar Conta" />,
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
        name="SaleAnnouncement"
        component={SaleAnnouncementScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-title" title="Venda na UNIW" />,
        }}
      />

      <Stack.Screen
        name="HelpCenter"
        component={HelpCenterScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-title" title="Central de Ajuda" />,
        }}
      />
      <Stack.Screen
        name="HelpTopicDetails"
        component={HelpTopicDetailsScreen}
        options={({ route }) => {
          // Para esta tela, o ideal é ter um título dinâmico
          // com o nome da categoria que o usuário selecionou.
          // Ex: "Pedidos e Entregas", "Pagamentos", etc.
          const category = getHelpCategoryById(route.params.categoryId)
          return {
            headerShown: true,
            header: () => (
              <Header variant="back-title" title={category?.name || 'Ajuda'} />
            ),
          }
        }}
      />
      <Stack.Screen
        name="HelpArticleDetails"
        component={HelpArticleDetailsScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-title" title="Artigo da Ajuda" />,
        }}
      />
      <Stack.Screen
        name="ContactSupport"
        component={ContactSupportScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-title" title="Fale Conosco" />,
        }}
      />
      <Stack.Screen
        name="TicketHistory"
        component={TicketHistoryScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-title" title="Meus Chamados" />,
        }}
      />
      <Stack.Screen
        name="TicketDetails"
        component={TicketDetailsScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-title" title="Detalhes do Chamado" />,
        }}
      />
    </Stack.Navigator>
  )
}
