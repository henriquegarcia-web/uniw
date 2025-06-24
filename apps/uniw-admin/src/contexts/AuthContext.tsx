'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { setCookie, deleteCookie } from 'cookies-next'
import * as services from '@uniw/shared-services'

import { IUser, UserRole } from '@uniw/shared-types'
import { SignInSchemaType } from '@uniw/shared-schemas'
import { useFirebase } from './FirebaseContext'

// ─── Tipagem do contexto ─────────────────────────────────────────────────────

interface AuthContextType {
  user: IUser | null
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
  const { isInitialized } = useFirebase()

  const [user, setUser] = useState<IUser | null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)

  // useEffect(() => {
  //   if (!isInitialized) {
  //     return
  //   }
  //   const teste = async () => await services.registerAdmin()
  //   teste()
  // }, [isInitialized])

  useEffect(() => {
    if (!isInitialized) {
      return
    }

    const unsubscribe = services.listenForAuthChanges(({ user, token }) => {
      setUser(user)

      if (user && token) {
        setCookie('token', token)
        if (user.role) {
          setCookie('role', user.role)
        }
      } else {
        deleteCookie('token')
        deleteCookie('role')
      }
      setIsAuthLoading(false)
    })

    return () => unsubscribe()
  }, [isInitialized])

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
