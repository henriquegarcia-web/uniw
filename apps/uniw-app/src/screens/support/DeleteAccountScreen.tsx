// src/screens/support/DeleteAccountScreen.tsx

import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, Text, View, ScrollView, Alert } from 'react-native'
import { Feather } from '@expo/vector-icons'

import type { DeleteAccountScreenProps } from '@uniw/shared-types'
import { themeApp as theme, colors } from '@uniw/shared-constants'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { Button } from '@/components/forms/Button'
import { InputText } from '@/components/forms/InputText'

// Subcomponente para cada item da lista de alertas
const WarningItem = ({ text }: { text: string }) => (
  <View style={styles.warningItem}>
    <Feather name="chevrons-right" size={16} color={colors.text.secondary} />
    <Text style={styles.warningText}>{text}</Text>
  </View>
)

const DeleteAccountScreen = ({ navigation }: DeleteAccountScreenProps) => {
  const { deleteUserAccount, isLoadingAuthFunctions } = useClientAuth()
  const [password, setPassword] = useState('')

  const handleDelete = () => {
    if (!password) {
      Alert.alert(
        'Confirmação Necessária',
        'Por favor, digite sua senha para confirmar a exclusão da conta.',
      )
      return
    }

    Alert.alert(
      'Atenção: Ação Irreversível',
      'Você tem certeza que deseja excluir sua conta permanentemente? Todos os seus dados, incluindo histórico de compras e pontos de fidelidade, serão perdidos.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir Permanentemente',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteUserAccount(password)
              Alert.alert('Conta Excluída', 'Sua conta foi excluída com sucesso.')
              // O listener onAuthStateChanged no contexto irá redirecionar o usuário
            } catch (error: any) {
              Alert.alert('Erro na Exclusão', error.message)
            }
          },
        },
      ],
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <Feather name="alert-triangle" size={40} color={colors.semantic.error} />
          <Text style={styles.title}>Excluir sua Conta</Text>
        </View>

        <View style={styles.warningSection}>
          <Text style={styles.paragraph}>
            Esta é uma ação{' '}
            <Text style={{ fontFamily: theme.fonts.family.bold }}>
              permanente e irreversível
            </Text>
            . Ao continuar, todos os seus dados associados à UNIW serão removidos.
          </Text>

          <Text style={styles.subtitle}>Você perderá o acesso a:</Text>
          <WarningItem text="Seu histórico de compras e agendamentos" />
          <WarningItem text="Seus pontos de fidelidade e cupons" />
          <WarningItem text="Seus métodos de pagamento e endereços salvos" />
          <WarningItem text="Sua lista de produtos favoritos" />
        </View>

        <View style={styles.confirmationSection}>
          <Text style={styles.subtitle}>Para confirmar, por favor, digite sua senha</Text>
          <InputText
            placeholder="Sua senha"
            value={password}
            onChangeText={setPassword}
            isPassword
            iconName="lock"
          />
        </View>

        <Button
          variant="negative"
          title="Excluir Minha Conta Permanentemente"
          onPress={handleDelete}
          loading={isLoadingAuthFunctions}
          // style={styles.deleteButton}
          // textStyle={styles.deleteButtonText} // Passando estilo customizado para o texto
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ui.surface,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.custom['botom-tab-height'],
  },
  header: {
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: '#fee1e1',
    borderRadius: theme.borders.radius.sm,
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.lg,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
    color: colors.semantic.error,
  },
  warningSection: {
    marginBottom: theme.spacing.lg,
  },
  paragraph: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    color: colors.text.secondary,
    lineHeight: 22,
    marginBottom: theme.spacing.lg,
  },
  subtitle: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.lg,
    color: colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  warningItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  warningText: {
    flex: 1,
    marginLeft: theme.spacing.sm,
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    color: colors.text.secondary,
  },
  confirmationSection: {
    marginBottom: theme.spacing.xl,
  },
  // deleteButton: {
  //   backgroundColor: colors.semantic.error,
  // },
  // deleteButtonText: {
  //   color: colors.text.onBrand,
  // },
})

export default DeleteAccountScreen
