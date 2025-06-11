import { StatusBar } from 'expo-status-bar'

import { Routes } from '@/navigation'
import { AuthProvider } from '@/contexts/ClientAuthProvider'

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <Routes />
    </AuthProvider>
  )
}
