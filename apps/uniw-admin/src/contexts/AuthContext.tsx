'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { setCookie, deleteCookie } from 'cookies-next'
import * as services from '@uniw/shared-services'

import { IUser, UserRole } from '@uniw/shared-types'
import { SignInSchemaType } from '@uniw/shared-schemas'

// ─── Tipagem do contexto ─────────────────────────────────────────────────────

interface AuthContextType {
  user: IUser
  isAuthLoading: boolean
  authError: string | null
  login: (data: SignInSchemaType) => Promise<void>
  register: (data: any) => Promise<void>
  logout: () => Promise<void>
}

// ─── Contexto ────────────────────────────────────────────────────────────────

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  // const auth = getFirebaseAuth()

  const [user, setUser] = useState<any>(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    console.log(user)
  }, [user])

  // Ouve o estado de autenticação do Firebase em tempo real
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
  //     if (firebaseUser) {
  //       // Usuário está logado, busca dados e define cookies
  //       // const userData = await getCurrentUser()
  //       // setUser(userData)

  //       // Sincroniza os cookies para o middleware
  //       const token = await firebaseUser.getIdToken()
  //       setCookie('token', token)
  //       // setCookie('role', userData.role)
  //     } else {
  //       // Usuário está deslogado, limpa o estado e os cookies
  //       setUser(null)
  //       deleteCookie('token')
  //       deleteCookie('role')
  //     }
  //     setIsAuthLoading(false)
  //   })

  //   // Limpa o listener ao desmontar o componente
  //   return () => unsubscribe()
  // }, [])

  const login = async (data: SignInSchemaType) => {
    if (user) {
      console.log('Usuário já logado. Redirecionando...')
      router.push(`/painel/inicio`)
      return
    }

    setIsAuthLoading(true)
    setAuthError(null)
    try {
      const u = await services.webLoginUser({
        email: data.email,
        password: data.password,
        roleToValidate: UserRole.ADMINISTRADOR,
      })
      setUser(u.user)
      setCookie('token', u.token)
      setCookie('role', u.user.role)
      router.push(`/painel/inicio`)
    } catch {
      setAuthError('Credenciais inválidas.')
    } finally {
      setIsAuthLoading(false)
    }
  }

  const register = async (data: any) => {
    setIsAuthLoading(true)
    setAuthError(null)
    try {
      // const u = await services.registerUser(data)
      // setUser(u)
      // router.push(`/painel/inicio`)
    } catch {
      setAuthError('Erro ao registrar.')
    } finally {
      setIsAuthLoading(false)
    }
  }

  const logout = async () => {
    await services.logout()
    setUser(null)
    deleteCookie('token')
    deleteCookie('role')
    router.push(`/auth/entrar`)
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthLoading, authError, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// ─── Hook de acesso simplificado ─────────────────────────────────────────────

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
