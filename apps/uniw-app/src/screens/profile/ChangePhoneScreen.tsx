// src/screens/profile/ChangePhoneScreen.tsx

import React, { useState, useRef } from 'react'
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
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'

import {  ChangePhoneScreenProps } from '@uniw/shared-types'
import { themeApp as theme, colors } from '@uniw/shared-constants'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { firebaseConfig } from '@/services/firebaseConfig'
import { applyMask } from '@uniw/shared-utils'
import { InputText } from '@/components/forms/InputText'
import { Button } from '@/components/forms/Button'
import { ProfileHeader } from '@/components/ProfileHeader'
import { changePhoneSchema } from '@uniw/shared-schemas'

const ChangePhoneScreen = ({ navigation }: ChangePhoneScreenProps) => {
  const {
    user,
    reauthenticate,
    startPhoneNumberVerification,
    confirmPhoneNumberUpdate,
    isLoadingAuthFunctions,
  } = useClientAuth()

  const [step, setStep] = useState<'enterPhone' | 'enterOtp'>('enterPhone')
  const [verificationId, setVerificationId] = useState<string | null>(null)
  const [newPhoneNumber, setNewPhoneNumber] = useState('')

  const recaptchaVerifier = useRef(null)

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePhoneSchema),
    mode: 'onBlur',
    defaultValues: { currentPassword: '', newPhone: '' },
  })

  const {
    control: otpControl,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
  } = useForm({
    defaultValues: { otp: '' },
  })

  const handleSendVerificationCode = async (data: FieldValues) => {
    if (data.newPhone.replace(/\D/g, '') === user?.baseProfile.telefone) {
      setError('newPhone', {
        type: 'manual',
        message: 'O novo telefone deve ser diferente do atual.',
      })
      return
    }

    try {
      await reauthenticate(data.currentPassword)
      const nationalPhoneNumber = `+55${data.newPhone.replace(/\D/g, '')}`
      const verId = await startPhoneNumberVerification(
        nationalPhoneNumber,
        recaptchaVerifier.current,
      )

      setNewPhoneNumber(nationalPhoneNumber)
      setVerificationId(verId)
      setStep('enterOtp')
      Alert.alert(
        'Código Enviado',
        `Enviamos um código de verificação para ${data.newPhone}.`,
      )
    } catch (error: any) {
      if (error.message.includes('senha atual está incorreta')) {
        setError('currentPassword', { type: 'manual', message: error.message })
      } else {
        Alert.alert('Erro', error.message || 'Não foi possível enviar o código.')
      }
    }
  }

  const handleConfirmOtp = async (data: FieldValues) => {
    if (!verificationId) return

    try {
      await confirmPhoneNumberUpdate(verificationId, data.otp, newPhoneNumber)

      Alert.alert('Sucesso!', 'Seu número de telefone foi alterado.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ])
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Código de verificação inválido.')
    }
  }

  const EnterPhoneView = (
    <View>
      <View style={styles.header}>
        {/* <Text style={styles.title}>Alterar Telefone</Text> */}
        <Text style={styles.subtitle}>
          Seu telefone atual é{' '}
          <Text style={{ fontFamily: theme.fonts.family.bold }}>
            {user?.baseProfile.telefone
              ? applyMask(user.baseProfile.telefone, 'phone')
              : 'não informado'}
          </Text>
          .
        </Text>
      </View>

      <View style={styles.formContainer}>
        <Controller
          control={control}
          name="newPhone"
          render={({ field: { onChange, onBlur, value } }) => (
            <InputText
              label="Novo Telefone com DDD"
              placeholder="(00) 00000-0000"
              onBlur={onBlur}
              onChangeText={(text) => onChange(applyMask(text, 'phone'))}
              value={value}
              keyboardType="phone-pad"
              maxLength={15}
              error={errors.newPhone?.message}
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
        title="Enviar Código de Verificação"
        variant="primary"
        onPress={handleSubmit(handleSendVerificationCode)}
        loading={isLoadingAuthFunctions}
        style={styles.button}
      />
    </View>
  )

  const EnterOtpView = (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Verificar Número</Text>
        <Text style={styles.subtitle}>
          Digite o código de 6 dígitos que enviamos por SMS para o número{' '}
          <Text style={{ fontFamily: theme.fonts.family.bold }}>
            {applyMask(newPhoneNumber.replace('+55', ''), 'phone')}
          </Text>
          .
        </Text>
      </View>
      <View style={styles.formContainer}>
        <Controller
          control={otpControl}
          name="otp"
          rules={{ required: 'O código é obrigatório', minLength: 6, maxLength: 6 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputText
              label="Código de Verificação"
              placeholder="000000"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="number-pad"
              maxLength={6}
              error={otpErrors.otp?.message}
            />
          )}
        />
      </View>
      <Button
        title="Confirmar e Salvar"
        variant="primary"
        onPress={handleOtpSubmit(handleConfirmOtp)}
        loading={isLoadingAuthFunctions}
        style={styles.button}
      />
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        title="Confirmar que não é um robô"
        cancelLabel="Cancelar"
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
        >
          {step === 'enterPhone' ? EnterPhoneView : EnterOtpView}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: theme.spacing.custom['botom-tab-height'],
    backgroundColor: colors.ui.surface,
  },
  contentContainer: {
    flexGrow: 1,
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.custom['botom-tab-height'],
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

export default ChangePhoneScreen
