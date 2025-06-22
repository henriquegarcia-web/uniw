// src/screens/SignUpScreen.tsx

import React from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native'

import { useForm, Controller, type FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { SignUpScreenProps } from '@uniw/shared-types'
import { clientSignUpSchema } from '@uniw/shared-schemas'
import { themeApp as theme, colors } from '@uniw/shared-constants'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { InputText } from '@/components/forms/InputText'
import { Button } from '@/components/forms/Button'
import { ButtonIcon } from '@/components/forms/ButtonIcon'
import { SocialIcon } from '@/components/SocialIcon'
import { applyMask } from '@uniw/shared-utils'
import { isCpfInUse, isEmailInUse } from '@uniw/shared-services'

const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
  const { signUp, isLoadingAuthFunctions, isErrorAuth, errorAuth, clearAuthError } =
    useClientAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(clientSignUpSchema),
    mode: 'onBlur',
    defaultValues: {
      nome: '',
      email: '',
      cpf: '',
      password: '',
      confirmPassword: '',
    },
  })

  const handleSignUp = async (data: FieldValues) => {
    const isEmailTaken = await isEmailInUse(data.email)
    if (isEmailTaken) {
      setError('email', { type: 'manual', message: 'Este e-mail já está em uso.' })
      return
    }

    const isCpfTaken = await isCpfInUse(data.cpf)
    if (isCpfTaken) {
      setError('cpf', { type: 'manual', message: 'Este CPF já está em uso.' })
      return
    }

    const cleanedCpf = data.cpf.replace(/\D/g, '')
    signUp(data.nome, data.email, cleanedCpf, data.password)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View></View>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Criar uma</Text>
            <Text style={styles.title}>nova conta</Text>
          </View>

          <Controller
            control={control}
            name="nome"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                iconName="user"
                placeholder="Nome completo"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="words"
                error={errors.nome?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                iconName="mail"
                placeholder="Seu melhor e-mail"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                iconName="credit-card"
                placeholder="CPF"
                onBlur={onBlur}
                onChangeText={(text) => onChange(applyMask(text, 'cpf'))}
                value={value}
                keyboardType="numeric"
                maxLength={14}
                error={errors.cpf?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                iconName="lock"
                placeholder="Crie uma senha"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                isPassword
                error={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                iconName="lock"
                placeholder="Confirme sua senha"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                isPassword
                error={errors.confirmPassword?.message}
              />
            )}
          />

          {isErrorAuth && <Text style={styles.errorText}>{errorAuth.toString()}</Text>}

          <Text style={styles.termsWarningText}>
            Ao clicar em Criar Conta, você concorda com a oferta pública
          </Text>

          <View style={styles.submitContainer}>
            <Button
              title="Criar Conta"
              variant="primary"
              onPress={handleSubmit(handleSignUp)}
              loading={isLoadingAuthFunctions}
              disabled={isLoadingAuthFunctions}
            />
          </View>

          <View style={styles.dividerContainer}>
            <Text style={styles.dividerText}>- ou continue com -</Text>
          </View>

          <View style={styles.socialLoginContainer}>
            <ButtonIcon>
              <SocialIcon provider="google" />
            </ButtonIcon>
            <ButtonIcon>
              <SocialIcon provider="apple" />
            </ButtonIcon>
            <ButtonIcon>
              <SocialIcon provider="facebook" />
            </ButtonIcon>
          </View>
        </View>

        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Eu já tenho uma conta </Text>
          <TouchableOpacity
            onPress={() => {
              clearAuthError()
              navigation.navigate('SignIn')
            }}
          >
            <Text style={styles.signInLink}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

// Estilos baseados nos da tela de SignIn para consistência
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.ui.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.custom['botom-tab-height'],
  },
  content: {
    rowGap: theme.spacing.md,
  },
  titleContainer: {
    marginBottom: theme.spacing.custom['botom-tab-height'],
  },
  title: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.xxxl,
    lineHeight: theme.fonts.size.xxxl,
    color: colors.text.primary,
  },
  termsWarningText: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.sm,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  submitContainer: {
    marginVertical: theme.spacing.xl,
  },
  dividerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dividerText: {
    marginHorizontal: theme.spacing.md,
    fontFamily: theme.fonts.family.regular,
    color: colors.text.secondary,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.lg,
    marginVertical: theme.spacing.md,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  signInText: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    color: colors.text.secondary,
  },
  signInLink: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.md,
    color: colors.brand.secondary,
    textDecorationLine: 'underline',
  },
  errorText: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.sm,
    color: colors.semantic.error,
  },
})

export default SignUpScreen
