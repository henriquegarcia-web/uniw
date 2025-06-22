// src/screens/profile/ChangeEmailScreen.tsx

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

import { ChangeEmailScreenProps } from '@uniw/shared-types'
import { themeApp as theme, colors } from '@uniw/shared-constants'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { InputText } from '@/components/forms/InputText'
import { Button } from '@/components/forms/Button'
import { ProfileHeader } from '@/components/ProfileHeader'
import { changeEmailSchema } from '@uniw/shared-schemas'

const ChangeEmailScreen = ({ navigation }: ChangeEmailScreenProps) => {
  const { user, reauthenticate, updateUserEmail, isLoadingAuthFunctions } =
    useClientAuth()

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(changeEmailSchema),
    mode: 'onBlur',
    defaultValues: {
      currentPassword: '',
      newEmail: '',
    },
  })

  const handleEmailChange = async (data: FieldValues) => {
    if (data.newEmail.toLowerCase() === user?.baseProfile.email.toLowerCase()) {
      setError('newEmail', {
        type: 'manual',
        message: 'O novo e-mail deve ser diferente do atual.',
      })
      return
    }

    try {
      // 1. Reautentica o usuário com a senha atual para garantir a segurança.
      await reauthenticate(data.currentPassword)

      // 2. Se a reautenticação for bem-sucedida, prossegue com a alteração do e-mail.
      await updateUserEmail(data.newEmail)

      Alert.alert(
        'Sucesso!',
        'Seu e-mail foi alterado. Um link de verificação foi enviado para o novo endereço.',
        [{ text: 'OK', onPress: () => navigation.goBack() }],
      )
    } catch (error: any) {
      if (error.message.includes('A senha atual está incorreta')) {
        setError('currentPassword', { type: 'manual', message: error.message })
      } else if (error.message.includes('e-mail já está em uso')) {
        setError('newEmail', { type: 'manual', message: error.message })
      } else {
        Alert.alert('Erro', error.message || 'Não foi possível alterar o e-mail.')
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
            {/* <Text style={styles.title}>Alterar E-mail</Text> */}
            <Text style={styles.subtitle}>
              Seu e-mail atual é{' '}
              <Text style={{ fontFamily: theme.fonts.family.bold }}>
                {user?.baseProfile.email}
              </Text>
              . Para alterá-lo, insira sua senha e o novo endereço de e-mail.
            </Text>
          </View>

          <View style={styles.formContainer}>
            {/* <ProfileHeader title="Credenciais" /> */}
            <Controller
              control={control}
              name="newEmail"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputText
                  label="Novo E-mail"
                  placeholder="Digite seu novo endereço de e-mail"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={errors.newEmail?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="currentPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputText
                  label="Senha Atual"
                  placeholder="Confirme sua senha para continuar"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  isPassword
                  error={errors.currentPassword?.message}
                />
              )}
            />
          </View>

          <Button
            title="Salvar Novo E-mail"
            variant="primary"
            onPress={handleSubmit(handleEmailChange)}
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
  title: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.xxl,
    color: colors.text.primary,
  },
  subtitle: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    color: colors.text.secondary,
    marginTop: theme.spacing.xs,
    lineHeight: 22,
  },
  formContainer: {
    gap: theme.spacing.md,
  },
  button: {
    marginTop: theme.spacing.lg,
  },
})

export default ChangeEmailScreen
