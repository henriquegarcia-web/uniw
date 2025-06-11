// src/screens/SignInScreen.tsx

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
import { signInSchema } from '@/types/auth'

import type { SignInScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { InputText } from '@/components/forms/InputText'
import { Button } from '@/components/forms/Button'
import { SocialIcon } from '@/components/SocialIcon'
import { ButtonIcon } from '@/components/forms/ButtonIcon'

const SignInScreen = ({ navigation }: SignInScreenProps) => {
  const { signIn, isLoadingAuth, isErrorAuth, errorAuth } = useClientAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  })

  const handleSignIn = (data: FieldValues) => {
    signIn(data.email, data.password)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View></View>
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Bem</Text>
            <Text style={styles.title}>vindo(a)!</Text>
          </View>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                iconName="user"
                placeholder="Nome de usuário ou e-mail"
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
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                iconName="lock"
                placeholder="Digite sua senha"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                isPassword
                error={errors.password?.message}
              />
            )}
          />

          {isErrorAuth && <Text style={styles.errorText}>{errorAuth.toString()}</Text>}

          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
          </TouchableOpacity>

          <View style={styles.submitContainer}>
            <Button
              title="Login"
              variant="secondary"
              onPress={handleSubmit(handleSignIn)}
              loading={isLoadingAuth}
              disabled={isLoadingAuth}
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

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Criar uma conta </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
    paddingTop: theme.spacing['4xl'],
  },
  titleContainer: {
    rowGap: 10,
    marginBottom: theme.spacing['4xl'],
  },
  title: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size['3xl'],
    lineHeight: theme.fonts.size['3xl'],
    color: theme.colors.text,
  },
  errorText: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    color: theme.colors.error,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    fontFamily: theme.fonts.family.medium,
    fontSize: theme.fonts.size.sm,
    color: theme.colors.secondary,
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
    color: theme.colors.text_secondary,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.lg,
    marginVertical: theme.spacing.md,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  signUpText: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    color: theme.colors.text_secondary,
  },
  signUpLink: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.md,
    color: theme.colors.secondary,
  },
})

export default SignInScreen
