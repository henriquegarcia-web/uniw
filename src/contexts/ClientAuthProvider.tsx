import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useMemo,
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import * as api from '@/services/api'; // Exemplo de import de serviços de API

// --- Definição de Tipos ---

// Tipo para o objeto de usuário
type User = {
  id: string
  name: string
  email: string
}

// Tipo para os dados que o contexto irá prover
type AuthContextData = {
  user: User | null
  isAuthenticated: boolean
  isLoadingAuth: boolean
  hasCompletedOnboarding: boolean
  isLoadingOnboarding: boolean
  signIn(email: string, password: string): Promise<void>
  signOut(): void
  signUp(name: string, email: string, password: string): Promise<void>
  completeOnboarding(): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

// --- Componente Provedor ---

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // --- States ---
  const [user, setUser] = useState<User | null>(null)
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
  const [isLoadingOnboarding, setIsLoadingOnboarding] = useState(true)

  const isAuthenticated = useMemo(() => {
    return !!user
  }, [user])

  // --- Efeito para Carregar Dados Iniciais ---
  useEffect(() => {
    async function loadDataFromStorage() {
      // Inicia o carregamento
      setIsLoadingAuth(true)
      setIsLoadingOnboarding(true)

      try {
        // Busca o status do onboarding e o token/usuário do storage ao mesmo tempo
        const [onboardingStatus, storedUser] = await Promise.all([
          AsyncStorage.getItem('@Onboarding:completed'),
          AsyncStorage.getItem('@Auth:user'), // Exemplo de chave para usuário
        ])

        if (onboardingStatus === 'true') {
          setHasCompletedOnboarding(true)
        }

        if (storedUser) {
          // Se encontrou dados do usuário, parseia e define no estado
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error('Falha ao carregar dados do storage', error)
      } finally {
        // Finaliza os loadings
        setIsLoadingAuth(false)
        setIsLoadingOnboarding(false)
      }
    }

    loadDataFromStorage()
  }, [])

  // --- Funções ---

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('@Onboarding:completed', 'true')
      setHasCompletedOnboarding(true)
    } catch (error) {
      console.error('Falha ao salvar status do onboarding', error)
    }
  }

  // --- Estrutura das Funções de Autenticação ---

  const signIn = async (email: string, password: string) => {
    setIsLoadingAuth(true)
    console.log('Tentando login com:', email, password)
    //
    // LÓGICA DE LOGIN COM FIREBASE OU SUA API VIRIA AQUI
    // Ex: const response = await api.signIn({ email, password });
    //
    // Em caso de sucesso:
    // const loggedUser = { id: '123', name: 'Usuário', email };
    // await AsyncStorage.setItem('@Auth:user', JSON.stringify(loggedUser));
    // setUser(loggedUser);
    //
    setIsLoadingAuth(false)
  }

  const signOut = async () => {
    setIsLoadingAuth(true)
    console.log('Deslogando...')
    //
    // LÓGICA DE LOGOUT
    //
    // await AsyncStorage.removeItem('@Auth:user');
    // await AsyncStorage.removeItem('@Auth:token');
    // setUser(null);
    //
    setIsLoadingAuth(false)
  }

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoadingAuth(true)
    console.log('Registrando novo usuário:', name, email)
    //
    // LÓGICA DE CADASTRO
    //
    setIsLoadingAuth(false)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoadingAuth,
        hasCompletedOnboarding,
        isLoadingOnboarding,
        completeOnboarding,
        signIn,
        signOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// --- Hook Customizado ---
export function useClientAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useClientAuth deve ser usado dentro de um AuthProvider')
  }

  return context
}
