// src/navigation/types.ts

import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { NavigatorScreenParams } from '@react-navigation/native'

// --- NAVEGADOR RAIZ (APP STACK) ---

export type AppStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>
  SearchResults: { searchTerm: string }
  ProductDetails: { productId: string }
}

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
}

export type CategoryStackParamList = {
  CategoryList: undefined
  CategoryDetails: { categoryId: string }
}

export type CartStackParamList = {
  Cart: undefined
  OrderSummary: undefined
  Payment: undefined
  CheckoutSuccess: undefined
}

export type ProfileStackParamList = {
  Profile: undefined
  EditProfile: undefined
  AddNewCard: undefined
  OrderHistory: undefined
  Settings: undefined
}

// --- Navegador Principal (Tabs) ---

export type MainTabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList> | undefined
  CategoryStack: NavigatorScreenParams<CategoryStackParamList> | undefined
  CartStack: NavigatorScreenParams<CartStackParamList> | undefined
  Favoritos: undefined
  ProfileStack: NavigatorScreenParams<ProfileStackParamList> | undefined
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

export type SearchResultsScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'SearchResults'
>

export type ProductDetailsScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'ProductDetails'
>

// Home
export type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'Home'>

// Produtos
export type CategoryListScreenProps = NativeStackScreenProps<
  CategoryStackParamList,
  'CategoryList'
>
export type CategoryDetailsScreenProps = NativeStackScreenProps<
  CategoryStackParamList,
  'CategoryDetails'
>

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

// Desejos
export type WishlistScreenProps = NativeStackScreenProps<MainTabParamList, 'Favoritos'>

// Perfil
export type SettingsScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  'Settings'
>
export type ProfileScreenProps = NativeStackScreenProps<ProfileStackParamList, 'Profile'>
export type EditProfileScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  'EditProfile'
>
export type AddNewCardScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  'AddNewCard'
>
export type OrderHistoryScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  'OrderHistory'
>
