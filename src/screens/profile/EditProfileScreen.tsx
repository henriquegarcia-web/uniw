// src/screens/EditProfileScreen.tsx

import React, { useCallback, useEffect, useState } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native'

import { useForm, Controller, type FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import type { EditProfileScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { updateProfileSchema, IBaseProfile } from '@/types/auth'

// Importando todos os nossos componentes e serviços
import { InputText } from '@/components/forms/InputText'
import { Dropdown, DropdownItem } from '@/components/forms/Dropdown'
import { Button } from '@/components/forms/Button'
import { applyMask } from '@/utils/masks'
import { viacepService } from '@/services/viacep'
import { ibgeService, IBGEState, IBGECity } from '@/services/ibge'
import { EditableUserPicture } from '@/components/forms/EditableUserPicture'
import { EditableUserName } from '@/components/forms/EditableUserName'
import { EditableUserPassword } from '@/components/forms/EditableUserPassword'
import { useFocusEffect } from '@react-navigation/native'

const EditProfileScreen = ({ navigation }: EditProfileScreenProps) => {
  const { user, updateProfile, isLoadingAuthFunctions } = useClientAuth()

  const [states, setStates] = useState<DropdownItem[]>([])
  const [cities, setCities] = useState<DropdownItem[]>([])
  const [isLoadingCities, setIsLoadingCities] = useState(false)
  const [isCepLoading, setIsCepLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(updateProfileSchema),
    mode: 'onBlur',
  })

  const watchedState = watch('endereco.estado')

  useEffect(() => {
    if (user) {
      reset({
        email: user.baseProfile.email,
        cpf: applyMask(user.baseProfile.cpf, 'cpf'),
        telefone: user.baseProfile?.telefone
          ? applyMask(user.baseProfile?.telefone, 'phone')
          : null,
        endereco: {
          cep: user.baseProfile?.endereco?.cep
            ? applyMask(user.baseProfile.endereco.cep, 'cep')
            : null,
          rua: user.baseProfile?.endereco?.rua || null,
          numero: user.baseProfile?.endereco?.numero || null,
          bairro: user.baseProfile?.endereco?.bairro || null,
          cidade: user.baseProfile?.endereco?.cidade || null,
          estado: user.baseProfile?.endereco?.estado || null,
        },
      })
    }
  }, [user, reset])

  useEffect(() => {
    ibgeService.getStates().then((data) => {
      const formattedStates = data.map((s: IBGEState) => ({
        label: s.nome,
        value: s.sigla,
      }))
      setStates(formattedStates)
    })
  }, [])

  useEffect(() => {
    if (watchedState) {
      setIsLoadingCities(true)
      ibgeService.getCitiesByState(watchedState).then((data) => {
        const formattedCities = data.map((c: IBGECity) => ({
          label: c.nome,
          value: c.nome,
        }))
        setCities(formattedCities)
        setIsLoadingCities(false)
      })
    } else {
      setCities([])
    }
  }, [watchedState])

  const handleCepBlur = async (cep: string) => {
    if (cep?.length === 9) {
      setIsCepLoading(true)
      try {
        const endereco = await viacepService.getAddressByCep(cep)
        if (!endereco.erro) {
          setValue('endereco.rua', endereco.logradouro, { shouldValidate: true })
          setValue('endereco.bairro', endereco.bairro, { shouldValidate: true })
          setValue('endereco.estado', endereco.uf, { shouldValidate: true })
          setValue('endereco.cidade', endereco.localidade, { shouldValidate: true })
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsCepLoading(false)
      }
    }
  }

  const handleUpdateProfile = async (data: FieldValues) => {
    try {
      const dataToUpdate: Partial<IBaseProfile> = {}

      if (data.telefone) {
        dataToUpdate.telefone = data.telefone.replace(/\D/g, '')
      }

      if (data.endereco) {
        const cleanAddress = { ...data.endereco }
        if (cleanAddress.cep) {
          cleanAddress.cep = cleanAddress.cep.replace(/\D/g, '')
        }
        dataToUpdate.endereco = cleanAddress
      }

      await updateProfile(dataToUpdate)

      Alert.alert('Sucesso', 'Seu perfil foi atualizado.')
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar seu perfil.')
    }
  }

  useFocusEffect(
    useCallback(() => {
      return () => {
        reset()
      }
    }, [reset]),
  )

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
            <Text style={styles.formGroupTitle}>Detalhes Pessoais</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputText
                  label="E-mail"
                  placeholder="Digite seu e-mail"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value || ''}
                  editable={false}
                  error={errors.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="cpf"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputText
                  label="CPF"
                  placeholder="CPF"
                  onBlur={onBlur}
                  onChangeText={(text) => onChange(applyMask(text, 'cpf'))}
                  value={value || ''}
                  editable={false}
                  error={errors.cpf?.message}
                />
              )}
            />
            <EditableUserPassword />
            <Controller
              control={control}
              name="telefone"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputText
                  label="Telefone/Contato"
                  placeholder="(00) 00000-0000"
                  onBlur={onBlur}
                  onChangeText={(text) => onChange(applyMask(text, 'phone'))}
                  value={value || ''}
                  keyboardType="phone-pad"
                  maxLength={15}
                  error={errors.telefone?.message}
                />
              )}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formGroupTitle}>Detalhes do Endereço</Text>
            <View style={styles.cepContainer}>
              <Controller
                control={control}
                name="endereco.cep"
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputText
                    label="CEP"
                    placeholder="00000-000"
                    onBlur={() => value && handleCepBlur(value)}
                    onChangeText={(text) => onChange(applyMask(text, 'cep'))}
                    value={value || ''}
                    keyboardType="numeric"
                    maxLength={9}
                    error={errors.endereco?.cep?.message}
                  />
                )}
              />
              {isCepLoading && <ActivityIndicator style={styles.cepLoading} />}
            </View>

            <View style={styles.formGroupWrapper}>
              <Controller
                control={control}
                name="endereco.rua"
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputText
                    label="Rua"
                    placeholder="Ex: Rua das Flores"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value || ''}
                    error={errors.endereco?.rua?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="endereco.numero"
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputText
                    label="Número"
                    placeholder="Ex: 123"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value || ''}
                    error={errors.endereco?.numero?.message}
                    width={30}
                  />
                )}
              />
            </View>

            <Controller
              control={control}
              name="endereco.bairro"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputText
                  label="Bairro"
                  placeholder="Seu bairro"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value || ''}
                  error={errors.endereco?.bairro?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="endereco.estado"
              render={({ field: { onChange, value } }) => (
                <Dropdown
                  label="Estado"
                  items={states}
                  value={value}
                  onValueChange={onChange}
                  error={errors.endereco?.estado?.message}
                  placeholder="Selecione seu estado"
                />
              )}
            />

            <Controller
              control={control}
              name="endereco.cidade"
              render={({ field: { onChange, value } }) => (
                <Dropdown
                  label="Cidade"
                  items={cities}
                  value={value}
                  onValueChange={onChange}
                  error={errors.endereco?.cidade?.message}
                  placeholder="Selecione sua cidade"
                  disabled={!watchedState || isLoadingCities}
                />
              )}
            />
          </View>

          <View style={styles.submitContainer}>
            <Button
              title="Salvar Alterações"
              variant="primary"
              onPress={handleSubmit(handleUpdateProfile)}
              loading={isLoadingAuthFunctions}
              disabled={!isDirty || isLoadingAuthFunctions}
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
    backgroundColor: theme.colors.surface,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  content: {
    paddingBottom: theme.spacing['4xl'],
    rowGap: theme.spacing.lg,
  },
  mainFormGroup: {
    rowGap: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  },
  formGroup: {
    rowGap: theme.spacing.md,
  },
  formGroupTitle: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.lg,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  formGroupWrapper: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    columnGap: theme.spacing.md,
  },
  cepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cepLoading: {
    marginLeft: theme.spacing.sm,
  },
  submitContainer: {
    marginTop: theme.spacing.md,
  },
})

export default EditProfileScreen
