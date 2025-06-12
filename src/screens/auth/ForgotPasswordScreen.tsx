// src/screens/ForgotPasswordScreen.tsx

import React from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native'

import { useForm, Controller, type FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import type { ForgotPasswordScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { InputText } from '@/components/forms/InputText'
import { Button } from '@/components/forms/Button'
import { forgotPasswordSchema } from '@/types/auth'
import { isEmailInUse } from '@/services/auth'

const ForgotPasswordScreen = ({ navigation }: ForgotPasswordScreenProps) => {
  const { resetPassword, isLoadingAuthFunctions } = useClientAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
  })

  const handlePasswordReset = async (data: FieldValues) => {
    const isExists = await isEmailInUse(data.email)
    if (!isExists) {
      setError('email', { type: 'manual', message: 'Este e-mail não está em uso.' })
      return
    }

    await resetPassword(data.email)
    navigation.navigate('SignIn')
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Esqueceu</Text>
            <Text style={styles.title}>a senha?</Text>
          </View>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                iconName="mail"
                placeholder="Digite seu email cadastrado"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email?.message}
              />
            )}
          />

          <Text style={styles.infoText}>
            * Enviaremos uma mensagem para você definir ou redefinir sua nova senha
          </Text>

          <View style={styles.submitContainer}>
            <Button
              title="Enviar"
              variant="primary"
              onPress={handleSubmit(handlePasswordReset)}
              loading={isLoadingAuthFunctions}
              disabled={isLoadingAuthFunctions}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backToLoginLink}>Voltar para o Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
    paddingTop: theme.spacing['4xl'],
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  titleContainer: {
    marginBottom: theme.spacing['4xl'],
  },
  title: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size['3xl'],
    lineHeight: theme.fonts.size['3xl'],
    color: theme.colors.text,
  },
  infoText: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.sm,
    color: theme.colors.text_secondary,
    textAlign: 'center',
    marginVertical: theme.spacing.sm,
  },
  submitContainer: {
    marginTop: theme.spacing.lg,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: theme.spacing.md,
  },
  backToLoginLink: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.md,
    color: theme.colors.secondary,
  },
})

export default ForgotPasswordScreen
