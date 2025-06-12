import { createNavigationContainerRef } from '@react-navigation/native'
import { MainTabParamList } from '@/navigation/types'

// --- Variáveis para controlar o estado da navegação ---
let isMounted = false
// Fila para guardar a primeira ação de navegação, caso ela chegue cedo demais
let initialRoute: { name: keyof MainTabParamList; params?: any } | null = null

export const navigationRef = createNavigationContainerRef<MainTabParamList>()

/**
 * Função para navegar para uma rota específica.
 * Se o container não estiver pronto, a ação é guardada na "fila".
 */
export function navigate<RouteName extends keyof MainTabParamList>(
  name: RouteName,
  params?: MainTabParamList[RouteName],
) {
  // Se o container já está pronto, navega imediatamente
  if (isMounted && navigationRef.isReady()) {
    navigationRef.navigate(name as any, params as any)
  } else {
    // Se não, guarda a rota para ser executada depois
    console.log(`Navegação para '${name}' enfileirada.`)
    initialRoute = { name, params }
  }
}

/**
 * Função a ser chamada pelo NavigationContainer quando ele estiver pronto.
 * Ela processa qualquer navegação que estava na fila.
 */
export function onNavigationReady() {
  isMounted = true
  if (initialRoute) {
    console.log(`Executando navegação enfileirada para '${initialRoute.name}'.`)
    navigate(initialRoute.name, initialRoute.params)
    // Limpa a fila
    initialRoute = null
  }
}
