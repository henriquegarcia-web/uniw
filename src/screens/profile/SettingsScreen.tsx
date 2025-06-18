// src/screens/SettingsScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native'

import type { SettingsScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'
import { ProfileMenu, ProfileMenuItem } from './ProfileScreen'

const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <ProfileMenu sectionTitle="Minha conta" type="list">
          <ProfileMenuItem label="Editar perfil" screen="" />
          <ProfileMenuItem label="Alterar telefone" screen="" />
          <ProfileMenuItem label="Alterar e-mail" screen="" />
          <ProfileMenuItem label="Alterar senha" screen="" />
          <ProfileMenuItem label="Meus endereços" screen="" />
          <ProfileMenuItem label="Cartões" screen="" />
        </ProfileMenu>

        <ProfileMenu sectionTitle="Definições" type="list">
          <ProfileMenuItem label="Configurações de notificação" screen="" />
          <ProfileMenuItem label="Idioma" screen="" />
        </ProfileMenu>

        <ProfileMenu sectionTitle="Suporte" type="list">
          <ProfileMenuItem label="Central de Ajuda" screen="" />
          <ProfileMenuItem label="Políticas da UNIW" screen="" />
          <ProfileMenuItem label="Feliz com a UNIW? Avalie-nos!" screen="" />
          <ProfileMenuItem label="Sobre nós" screen="" />
          <ProfileMenuItem label="Solicitar exclusão de conta" screen="" />
        </ProfileMenu>

        <ProfileMenuItem label="Sair" onPress={() => {}} />
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing['4xl'],
    paddingVertical: theme.spacing.md,
    rowGap: theme.spacing.lg,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    rowGap: theme.spacing.md,
  },
})
export default SettingsScreen
