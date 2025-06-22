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

import * as services from '@uniw/shared-services'
import { onValue, ref } from 'firebase/database'
import { IBaseProfile, IUser } from '@uniw/shared-types'
import { getFirebaseAuth, getFirebaseDb } from '@uniw/shared-services'

type AuthContextData = {
  user: IUser | null
  isAuthenticated: boolean
  isLoadingAuth: boolean
  isLoadingAuthFunctions: boolean
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
  updateProfile(data: Partial<IBaseProfile>): Promise<void>
  updateUserName(newName: string): Promise<void>
  updateUserProfilePicture(imageUri: string): Promise<void>
  removeUserProfilePicture(): Promise<void>
  reauthenticate(password: string): Promise<void>
  changePassword(newPassword: string): Promise<void>
  deleteUserAccount(password: string): Promise<void>
  updateUserEmail(newEmail: string): Promise<void>
  startPhoneNumberVerification(
    phoneNumber: string,
    recaptchaVerifier: any,
  ): Promise<string>
  confirmPhoneNumberUpdate(
    verificationId: string,
    otpCode: string,
    newPhone: string,
  ): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = getFirebaseAuth()
  const database = getFirebaseDb()

  const [user, setUser] = useState<IUser | null>(null)

  const [isLoadingAuth, setIsLoadingAuth] = useState(true)
  const [isLoadingAuthFunctions, setIsLoadingAuthFunctions] = useState(false)
  const [errorAuth, setErrorAuth] = useState<any>(null)

  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
  const [isLoadingOnboarding, setIsLoadingOnboarding] = useState(true)

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userProfileRef = ref(database, `users/${firebaseUser.uid}`)

        const unsubscribeDb = onValue(userProfileRef, (snapshot) => {
          if (snapshot.exists()) {
            setUser(snapshot.val() as IUser)
          } else {
            setUser(null)
          }
          setIsLoadingAuth(false)
        })

        return () => unsubscribeDb()
      } else {
        setUser(null)
        setIsLoadingAuth(false)
      }
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
    return () => unsubscribeAuth()
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
    setIsLoadingAuthFunctions(true)
    setErrorAuth(null)
    try {
      await services.clientSignIn(email, password)
    } catch (error: any) {
      setErrorAuth(error.message)
    } finally {
      setIsLoadingAuthFunctions(false)
    }
  }

  const signOut = async () => {
    setIsLoadingAuthFunctions(true)
    try {
      await services.logout()
    } catch (error) {
    } finally {
      setIsLoadingAuthFunctions(false)
    }
  }

  const signUp = async (name: string, email: string, cpf: string, password: string) => {
    setIsLoadingAuthFunctions(true)
    setErrorAuth(null)
    try {
      await services.clientSignUp(name, email, cpf, password)
    } catch (error: any) {
      setErrorAuth(error.message)
    } finally {
      setIsLoadingAuthFunctions(false)
    }
  }

  const resetPassword = async (email: string) => {
    setIsLoadingAuthFunctions(true)
    setErrorAuth(null)
    try {
      await services.resetPassword(email)
    } catch (error: any) {
      setErrorAuth(error.message)
      throw error
    } finally {
      setIsLoadingAuthFunctions(false)
    }
  }

  const updateProfile = async (data: Partial<IBaseProfile>) => {
    if (!user) {
      throw new Error('Nenhum usuário autenticado para atualizar o perfil.')
    }

    setIsLoadingAuthFunctions(true)
    setErrorAuth(null)

    try {
      // await services.updateProfile(user.id, data)
    } catch (error: any) {
      setErrorAuth(error.message)
      throw error
    } finally {
      setIsLoadingAuthFunctions(false)
    }
  }

  const updateUserName = async (newName: string) => {
    if (!user) {
      throw new Error('Nenhum usuário autenticado para atualizar o nome.')
    }

    setIsLoadingAuthFunctions(true)
    setErrorAuth(null)

    try {
      await services.updateUserName(user.id, newName)
    } catch (error: any) {
      setErrorAuth(error.message)
      throw error
    } finally {
      setIsLoadingAuthFunctions(false)
    }
  }

  const updateUserProfilePicture = async (imageUri: string) => {
    if (!user) throw new Error('Usuário não autenticado.')
    setIsLoadingAuthFunctions(true)
    setErrorAuth(null)
    try {
      await services.updateUserProfilePicture(user.id, imageUri)
    } catch (error: any) {
      setErrorAuth(error.message)
      throw error
    } finally {
      setIsLoadingAuthFunctions(false)
    }
  }

  const removeUserProfilePicture = async () => {
    if (!user?.baseProfile.foto) throw new Error('Usuário não tem foto para remover.')
    setIsLoadingAuthFunctions(true)
    setErrorAuth(null)
    try {
      await services.removeUserProfilePicture(user.id, user.baseProfile.foto)
    } catch (error: any) {
      setErrorAuth(error.message)
      throw error
    } finally {
      setIsLoadingAuthFunctions(false)
    }
  }

  const reauthenticate = async (password: string) => {
    setIsLoadingAuthFunctions(true)
    setErrorAuth(null)
    try {
      await services.reauthenticate(password)
    } catch (error: any) {
      setErrorAuth(error.message)
      throw error
    } finally {
      setIsLoadingAuthFunctions(false)
    }
  }

  const changePassword = async (newPassword: string) => {
    setIsLoadingAuthFunctions(true)
    setErrorAuth(null)
    try {
      await services.changePassword(newPassword)
    } catch (error: any) {
      setErrorAuth(error.message)
      throw error
    } finally {
      setIsLoadingAuthFunctions(false)
    }
  }

  const deleteUserAccount = async (password: string) => {
    setIsLoadingAuthFunctions(true)
    setErrorAuth(null)
    try {
      await services.clientDeleteUserAccount(password)
    } catch (error: any) {
      setErrorAuth(error.message)
      throw error
    } finally {
      setIsLoadingAuthFunctions(false)
    }
  }

  const updateUserEmail = async (newEmail: string) => {
    if (!user) throw new Error('Usuário não autenticado.')
    setIsLoadingAuthFunctions(true)
    setErrorAuth(null)
    try {
      await services.updateUserEmail(user.id, newEmail)
    } catch (error: any) {
      setErrorAuth(error.message)
      throw error
    } finally {
      setIsLoadingAuthFunctions(false)
    }
  }

  const startPhoneNumberVerification = async (
    phoneNumber: string,
    recaptchaVerifier: any,
  ) => {
    setIsLoadingAuthFunctions(true)
    setErrorAuth(null)
    try {
      return await services.startPhoneNumberVerification(phoneNumber, recaptchaVerifier)
    } catch (error: any) {
      setErrorAuth(error.message)
      throw error
    } finally {
      setIsLoadingAuthFunctions(false)
    }
  }

  const confirmPhoneNumberUpdate = async (
    verificationId: string,
    otpCode: string,
    newPhone: string,
  ) => {
    if (!user) throw new Error('Usuário não autenticado.')
    setIsLoadingAuthFunctions(true)
    setErrorAuth(null)
    try {
      await services.confirmPhoneNumberUpdate(user.id, verificationId, otpCode, newPhone)
    } catch (error: any) {
      setErrorAuth(error.message)
      throw error
    } finally {
      setIsLoadingAuthFunctions(false)
    }
  }

  const clearAuthError = () => setErrorAuth(null)

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoadingAuth,
        isLoadingAuthFunctions,
        isErrorAuth: !!errorAuth,
        errorAuth,
        clearAuthError,
        hasCompletedOnboarding,
        isLoadingOnboarding,
        completeOnboarding,
        signIn,
        signOut,
        signUp,
        updateProfile,
        updateUserName,
        updateUserProfilePicture,
        removeUserProfilePicture,
        reauthenticate,
        changePassword,
        resetPassword,
        deleteUserAccount,
        updateUserEmail,
        startPhoneNumberVerification,
        confirmPhoneNumberUpdate,
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
