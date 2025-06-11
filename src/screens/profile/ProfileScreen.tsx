// src/screens/ProfileScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'

import type { ProfileScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Tela de Perfil do Usuário</Text>
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
