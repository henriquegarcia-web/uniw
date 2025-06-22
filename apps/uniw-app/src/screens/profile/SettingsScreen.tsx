// src/screens/profile/SettingsScreen.tsx

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
          {/* <ProfileMenuItem label="Editar perfil" screen="EditProfile" /> */}
          <ProfileMenuItem label="Alterar telefone" screen="ChangePhone" />
          <ProfileMenuItem label="Alterar e-mail" screen="ChangeEmail" />
          <ProfileMenuItem label="Alterar senha" screen="ChangePassword" />
          <ProfileMenuItem label="Meus endereços" screen="MyAddresses" />
          <ProfileMenuItem label="Cartões salvos" screen="MyCards" />
        </ProfileMenu>

        <ProfileMenu sectionTitle="Definições" type="list">
          <ProfileMenuItem
            label="Configurações de notificação"
            screen="NotificationsSettings"
          />
          {/* <ProfileMenuItem label="Idioma" screen="ChangeLanguage" /> */}
        </ProfileMenu>

        <ProfileMenu sectionTitle="Suporte" type="list">
          <ProfileMenuItem label="Central de Ajuda" appScreen="HelpCenter" />
          <ProfileMenuItem label="Políticas da UNIW" appScreen="Policies" />
          <ProfileMenuItem label="Feliz com a UNIW? Avalie-nos!" onPress={() => {}} />
          <ProfileMenuItem label="Sobre nós" appScreen="AboutUs" />
          <ProfileMenuItem
            label="Solicitar exclusão de conta"
            appScreen="DeleteAccount"
          />
        </ProfileMenu>

        <ProfileMenuItem type="negative" label="Sair" onPress={() => {}} />
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
