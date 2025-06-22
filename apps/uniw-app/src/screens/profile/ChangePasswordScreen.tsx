// src/screens/profile/ChangePasswordScreen.tsx

import React from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'

import { useForm, Controller, type FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { ChangePasswordScreenProps } from '@uniw/shared-types'
import { themeApp as theme, colors } from '@uniw/shared-constants'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { InputText } from '@/components/forms/InputText'
import { Button } from '@/components/forms/Button'
import { ProfileHeader } from '@/components/ProfileHeader'
import { changePasswordSchema } from '@uniw/shared-schemas'

const ChangePasswordScreen = ({ navigation }: ChangePasswordScreenProps) => {
  const { reauthenticate, changePassword, isLoadingAuthFunctions } = useClientAuth()

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  })

  const handlePasswordChange = async (data: FieldValues) => {
    try {
      // 1. Reautenticar o usuário com a senha atual para garantir a segurança.
      await reauthenticate(data.currentPassword)

      // 2. Se a reautenticação for bem-sucedida, prosseguir com a alteração da senha.
      await changePassword(data.newPassword)

      Alert.alert('Sucesso!', 'Sua senha foi alterada.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ])
    } catch (error: any) {
      // 3. Capturar erros, como senha atual incorreta, e exibi-los.
      if (error.message.includes('senha atual')) {
        setError('currentPassword', { type: 'manual', message: error.message })
      } else {
        Alert.alert('Erro', error.message || 'Não foi possível alterar a senha.')
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            {/* <Text style={styles.title}>Alterar Senha</Text> */}
            <Text style={styles.subtitle}>
              Para sua segurança, por favor, confirme sua senha atual antes de definir uma
              nova.
            </Text>
          </View>

          <View style={styles.formContainer}>
            {/* <ProfileHeader title="Credenciais" /> */}
            <Controller
              control={control}
              name="currentPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputText
                  label="Senha Atual"
                  placeholder="Digite sua senha atual"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  isPassword
                  error={errors.currentPassword?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="newPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputText
                  label="Nova Senha"
                  placeholder="Mínimo 6 caracteres"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  isPassword
                  error={errors.newPassword?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="confirmNewPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputText
                  label="Confirme a Nova Senha"
                  placeholder="Repita a nova senha"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  isPassword
                  error={errors.confirmNewPassword?.message}
                />
              )}
            />
          </View>

          <Button
            title="Salvar Nova Senha"
            variant="primary"
            onPress={handleSubmit(handlePasswordChange)}
            loading={isLoadingAuthFunctions}
            disabled={!isDirty || isLoadingAuthFunctions}
            style={styles.button}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ui.surface,
  },
  contentContainer: {
    flexGrow: 1,
    padding: theme.spacing.lg,
  },
  header: {
    marginBottom: theme.spacing.lg,
  },
  // title: {
  //   fontFamily: theme.fonts.family.bold,
  //   fontSize: theme.fonts.size.xxl,
  //   color: colors.text.primary,
  // },
  subtitle: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    color: colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
  formContainer: {
    gap: theme.spacing.md,
  },
  button: {
    marginTop: theme.spacing.lg,
  },
})

export default ChangePasswordScreen
