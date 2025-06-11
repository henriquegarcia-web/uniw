// src/contexts/ClientAuthProvider.tsx

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useMemo,
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { onAuthStateChanged } from 'firebase/auth'

import { auth } from '@/services/firebaseConfig'
import * as authService from '@/services/auth'
import { IUser } from '@/types/auth'

type AuthContextData = {
  user: IUser | null
  isAuthenticated: boolean
  isLoadingAuth: boolean
  isErrorAuth: boolean
  errorAuth: any
  clearAuthError: () => void
  hasCompletedOnboarding: boolean
  isLoadingOnboarding: boolean
  signIn(email: string, password: string): Promise<void>
  signOut(): void
  signUp(name: string, email: string, cpf: string, password: string): Promise<void>
  completeOnboarding(): Promise<void>
  resetPassword(email: string): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null)

  const [isLoadingAuth, setIsLoadingAuth] = useState(true)
  const [errorAuth, setErrorAuth] = useState<any>(null)

  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
  const [isLoadingOnboarding, setIsLoadingOnboarding] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userProfile = await authService.getFullUserData(firebaseUser.uid)
        setUser(userProfile)
      } else {
        setUser(null)
      }
      setIsLoadingAuth(false)
    })

    const checkOnboarding = async () => {
      try {
        const onboardingStatus = await AsyncStorage.getItem('@Onboarding:completed')
        if (onboardingStatus === 'true') {
          setHasCompletedOnboarding(true)
        }
      } catch (error) {
        console.error('Falha ao buscar status do onboarding', error)
      } finally {
        setIsLoadingOnboarding(false)
      }
    }

    checkOnboarding()
    return () => unsubscribe()
  }, [])

  const isAuthenticated = useMemo(() => {
    return !!user
  }, [user])

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('@Onboarding:completed', 'true')
      setHasCompletedOnboarding(true)
    } catch (error) {
      console.error('Falha ao salvar status do onboarding', error)
    }
  }

  const signIn = async (email: string, password: string) => {
    setIsLoadingAuth(true)
    setErrorAuth(null)
    try {
      await authService.signIn(email, password)
    } catch (error: any) {
      setErrorAuth(error.message)
      setIsLoadingAuth(false)
    }
  }

  const signOut = async () => {
    setIsLoadingAuth(true)
    try {
      await authService.logout()
    } catch (error) {
      setIsLoadingAuth(false)
    }
  }

  const signUp = async (name: string, email: string, cpf: string, password: string) => {
    setIsLoadingAuth(true)
    setErrorAuth(null)
    try {
      await authService.signUp(name, email, cpf, password)
    } catch (error: any) {
      setErrorAuth(error.message)
      setIsLoadingAuth(false)
    }
  }

  const resetPassword = async (email: string) => {
    setIsLoadingAuth(true)
    setErrorAuth(null)
    try {
      await authService.resetPassword(email)
    } catch (error: any) {
      setErrorAuth(error.message)
      throw error
    } finally {
      setIsLoadingAuth(false)
    }
  }

  const clearAuthError = () => setErrorAuth(null)

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoadingAuth,
        isErrorAuth: !!errorAuth,
        errorAuth,
        clearAuthError,
        hasCompletedOnboarding,
        isLoadingOnboarding,
        completeOnboarding,
        signIn,
        signOut,
        signUp,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useClientAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useClientAuth deve ser usado dentro de um AuthProvider')
  }

  return context
}
