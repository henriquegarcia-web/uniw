// src/screens/ProfileScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, View, ScrollView } from 'react-native'

import { useForm, Controller, type FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import type { ProfileScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { forgotPasswordSchema } from '@/types/auth'

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
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

  const handleUpdateProfile = async (data: FieldValues) => {
    // await resetPassword(data.email)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}></View>
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
  content: {},
  formGroup: {},
  formGroupTitle: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size['3xl'],
    lineHeight: theme.fonts.size['3xl'],
    color: theme.colors.text,
  },
  formGroupDivisor: {},
  submitContainer: {
    marginTop: theme.spacing.lg,
  },
})

export default ProfileScreen
