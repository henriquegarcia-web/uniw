// src/screens/ProfileScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, View, ScrollView, Text } from 'react-native'

import { useForm, Controller, type FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import type { ProfileScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { updateProfileSchema } from '@/types/auth'
import { EditableUserName } from '@/components/forms/EditableUserName'
import { EditableUserPicture } from '@/components/forms/EditableUserPicture'
import { InputText } from '@/components/forms/InputText'
import { EditableUserPassword } from '@/components/forms/EditableUserPassword'
import { Button } from '@/components/forms/Button'

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const { isLoadingAuthFunctions } = useClientAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(updateProfileSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      phone: '',
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
        <View style={styles.content}>
          <View style={styles.mainFormGroup}>
            <EditableUserPicture />
            <EditableUserName />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formGroupTitle}>Detalhes da Conta</Text>

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputText
                  iconName="user"
                  label="E-mail"
                  placeholder="E-mail"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  editable={false}
                  error={errors.email?.message}
                />
              )}
            />
            <EditableUserPassword />
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputText
                  iconName="phone"
                  label="Telefone/Contato"
                  placeholder="Telefone"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value ? value : ''}
                  keyboardType="phone-pad"
                  error={errors.email?.message}
                />
              )}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formGroupTitle}>Detalhes do Endereço</Text>

            {/* INPUT CEP - Utilizar serviço VIACEP para preencher automaticamente campos */}
            {/* INPUT RUA + INPUT NUMERO */}
            {/* INPUT BAIRRO */}
            {/* INPUT DROPDOWN ESTADO - Utilizar serviço IBGE */}
            {/* INPUT DROPDOWN CIDADE - Utilizar serviço IBGE */}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formGroupTitle}>Detalhes de Pagamento</Text>

            {/* INPUT NUMERO DO CARTÃO */}
            {/* INPUT NOME NO CARTÃO */}
            {/* INPUT VALIDADE (Mascara 00/00 + Validação de data valida) + INPUT CÓDIGO CVV (Max. 3 digitos) */}
          </View>

          <View style={styles.submitContainer}>
            <Button
              title="Salvar Perfil"
              variant="secondary"
              onPress={handleSubmit(handleUpdateProfile)}
              loading={isLoadingAuthFunctions}
              disabled={isLoadingAuthFunctions}
            />
          </View>
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
  },
  content: {
    rowGap: theme.spacing.lg,
  },
  mainFormGroup: {
    rowGap: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  },
  formGroup: {
    rowGap: theme.spacing.sm,
    paddingBottom: theme.spacing.lg,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
  formGroupTitle: {
    marginBottom: theme.spacing.sm,
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.lg,
    lineHeight: theme.fonts.size.xl,
    color: theme.colors.text,
  },
  submitContainer: {
    marginTop: theme.spacing.lg,
  },
})

export default ProfileScreen
