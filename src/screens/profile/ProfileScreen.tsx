// src/screens/ProfileScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native'

import type { ProfileScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'
import { useClientAuth } from '@/contexts/ClientAuthProvider'

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const { signOut } = useClientAuth()

  return (
    <SafeAreaView style={styles.container}>
      <Text>Tela de Perfil do Usuário</Text>
      <TouchableOpacity onPress={signOut}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default ProfileScreen
