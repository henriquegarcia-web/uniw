// src/navigation/types.ts

import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { NavigatorScreenParams } from '@react-navigation/native'

// --- Pilhas de Navegação (Stacks) ---

export type OnboardingStackParamList = {
  Onboarding: undefined
}

export type AuthStackParamList = {
  SignIn: undefined
  SignUp: undefined
  ForgotPassword: undefined
}

export type HomeStackParamList = {
  Home: undefined
  ProductDetails: { productId: string }
}

export type CartStackParamList = {
  Cart: undefined
  OrderSummary: undefined
  Payment: undefined
  CheckoutSuccess: undefined
}

export type SettingsStackParamList = {
  Profile: undefined
  AddNewCard: undefined
  OrderHistory: undefined
  Settings: undefined
}

// --- Navegador Principal (Tabs) ---

export type MainTabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList> | undefined
  Wishlist: undefined
  Search: undefined
  CartStack: NavigatorScreenParams<CartStackParamList> | undefined
  SettingsStack: NavigatorScreenParams<SettingsStackParamList> | undefined
}

// --- Tipos de Props para cada Tela ---

// Onboarding
export type OnboardingScreenProps = NativeStackScreenProps<
  OnboardingStackParamList,
  'Onboarding'
>

// Autenticação
export type SignInScreenProps = NativeStackScreenProps<AuthStackParamList, 'SignIn'>
export type SignUpScreenProps = NativeStackScreenProps<AuthStackParamList, 'SignUp'>
export type ForgotPasswordScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'ForgotPassword'
>

// Home
export type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'Home'>
export type ProductDetailsScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'ProductDetails'
>

// Desejos e Pesquisa (telas simples)
export type WishlistScreenProps = NativeStackScreenProps<MainTabParamList, 'Wishlist'>
export type SearchScreenProps = NativeStackScreenProps<MainTabParamList, 'Search'>

// Carrinho
export type CartScreenProps = NativeStackScreenProps<CartStackParamList, 'Cart'>
export type OrderSummaryScreenProps = NativeStackScreenProps<
  CartStackParamList,
  'OrderSummary'
>
export type PaymentScreenProps = NativeStackScreenProps<CartStackParamList, 'Payment'>
export type CheckoutSuccessScreenProps = NativeStackScreenProps<
  CartStackParamList,
  'CheckoutSuccess'
>

// Perfil
export type SettingsScreenProps = NativeStackScreenProps<
  SettingsStackParamList,
  'Settings'
>
export type ProfileScreenProps = NativeStackScreenProps<SettingsStackParamList, 'Profile'>
export type AddNewCardScreenProps = NativeStackScreenProps<
  SettingsStackParamList,
  'AddNewCard'
>
export type OrderHistoryScreenProps = NativeStackScreenProps<
  SettingsStackParamList,
  'OrderHistory'
>
