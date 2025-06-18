// src/navigation/ProfileStack.tsx

import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { ProfileStackParamList } from './types'

import { Header } from '@/components/Header'
import ProfileScreen from '@/screens/profile/ProfileScreen'
import AddNewCardScreen from '@/screens/profile/AddNewCardScreen'
import OrderHistoryScreen from '@/screens/profile/OrderHistoryScreen'
import SettingsScreen from '@/screens/profile/SettingsScreen'
import EditProfileScreen from '@/screens/profile/EditProfileScreen'
import AwardsScreen from '@/screens/profile/AwardsScreen'
import ChangeEmailScreen from '@/screens/profile/ChangeEmailScreen'
import ChangeLanguageScreen from '@/screens/profile/ChangeLanguageScreen'
import ChangePasswordScreen from '@/screens/profile/ChangePasswordScreen'
import ChangePhoneScreen from '@/screens/profile/ChangePhoneScreen'
import ClubScreen from '@/screens/profile/ClubScreen'
import CouponsScreen from '@/screens/profile/CouponsScreen'
import LoyaltyProgramScreen from '@/screens/profile/LoyaltyProgramScreen'
import MyAddressesScreen from '@/screens/profile/MyAddressesScreen'
import MyCardsScreen from '@/screens/profile/MyCardsScreen'
import NotificationsSettingsScreen from '@/screens/profile/NotificationsSettingsScreen'

const Stack = createNativeStackNavigator<ProfileStackParamList>()

export function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="profile" title="Perfil Usuário" />,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-profile" title="Perfil Usuário" />,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-profile" title="Configurações" />,
        }}
      />
      <Stack.Screen
        name="AddNewCard"
        component={AddNewCardScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-profile" title="Novo Cartão" />,
        }}
      />
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-profile" title="Histórico de Compras" />,
        }}
      />

      <Stack.Screen
        name="Awards"
        component={AwardsScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-profile" title="Prêmios" />,
        }}
      />
      <Stack.Screen
        name="ChangeEmail"
        component={ChangeEmailScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-profile" title="Alterar e-mail" />,
        }}
      />
      <Stack.Screen
        name="ChangeLanguage"
        component={ChangeLanguageScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-profile" title="Alterar idioma" />,
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-profile" title="Alterar senha" />,
        }}
      />
      <Stack.Screen
        name="ChangePhone"
        component={ChangePhoneScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-profile" title="Alterar telefone" />,
        }}
      />
      <Stack.Screen
        name="Club"
        component={ClubScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-profile" title="Clube UNIW" />,
        }}
      />
      <Stack.Screen
        name="Coupons"
        component={CouponsScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-profile" title="Cupons" />,
        }}
      />
      <Stack.Screen
        name="LoyaltyProgram"
        component={LoyaltyProgramScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-profile" title="Programa de fidelidade" />,
        }}
      />
      <Stack.Screen
        name="MyAddresses"
        component={MyAddressesScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-profile" title="Meu endereços" />,
        }}
      />
      <Stack.Screen
        name="MyCards"
        component={MyCardsScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-profile" title="Meus cartões" />,
        }}
      />
      <Stack.Screen
        name="NotificationsSettings"
        component={NotificationsSettingsScreen}
        options={{
          headerShown: true,
          header: () => <Header variant="back-profile" title="Configurar notificações" />,
        }}
      />
    </Stack.Navigator>
  )
}
