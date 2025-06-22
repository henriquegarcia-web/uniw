'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { setCookie, deleteCookie } from 'cookies-next'
import { auth } from '@/libs/firebase' // Importe o 'auth' diretamente

import {
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  getCurrentUser,
} from '@/services/auth'
import { UserRole } from '@/types/auth'

// ─── Tipagem do contexto ─────────────────────────────────────────────────────

interface AuthContextType {
  user: any
  loading: boolean
  error: string | null
  login: (email: string, password: string, role: UserRole) => Promise<void>
  register: (data: any, role: UserRole) => Promise<void>
  logout: (role: UserRole) => Promise<void>
  sendReset: (email: string) => Promise<void>
}

// ─── Contexto ────────────────────────────────────────────────────────────────

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true) // Inicia como true para aguardar a verificação
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    console.log(user)
  }, [user])

  // Ouve o estado de autenticação do Firebase em tempo real
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        // Usuário está logado, busca dados e define cookies
        const userData = await getCurrentUser()
        setUser(userData)

        // Sincroniza os cookies para o middleware
        const token = await firebaseUser.getIdToken()
        setCookie('token', token)
        setCookie('role', userData.role)
      } else {
        // Usuário está deslogado, limpa o estado e os cookies
        setUser(null)
        deleteCookie('token')
        deleteCookie('role')
      }
      setLoading(false)
    })

    // Limpa o listener ao desmontar o componente
    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string, role: UserRole) => {
    // Se já houver um usuário no estado, apenas redireciona
    if (user) {
      console.log('Usuário já logado. Redirecionando...')
      router.push(`/${user.role}/painel/inicio`)
      return
    }

    setLoading(true)
    setError(null)
    try {
      // A função loginUser no serviço já cuidará de autenticar e definir o cookie inicial
      const u = await loginUser({ email, password })
      // O listener onAuthStateChanged cuidará de atualizar o estado,
      // mas podemos setar aqui para uma resposta mais imediata na UI.
      setUser(u)
      router.push(`/${role}/painel/inicio`)
    } catch {
      setError('Credenciais inválidas.')
    } finally {
      setLoading(false)
    }
  }

  const register = async (data: any, role: UserRole) => {
    setLoading(true)
    setError(null)
    try {
      const u = await registerUser(data)
      setUser(u)
      router.push(`/${role}/painel/inicio`)
    } catch {
      setError('Erro ao registrar.')
    } finally {
      setLoading(false)
    }
  }

  const logout = async (role: UserRole) => {
    // A função de logout no serviço já limpa os cookies
    await logoutUser()
    setUser(null)
    // O redirecionamento pode variar. Se houver múltiplas áreas de login,
    // talvez precise de uma lógica mais elaborada.
    router.push(`/${role}/auth/entrar`)
  }

  const sendReset = async (email: string) => {
    setLoading(true)
    setError(null)
    try {
      await resetPassword(email)
    } catch {
      setError('Erro ao enviar e-mail de recuperação.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, register, logout, sendReset }}
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
