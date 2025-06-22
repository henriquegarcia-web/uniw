// src/screens/profile/AddNewAddressScreen.tsx

import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Alert,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from 'react-native'
import { useForm, Controller, FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import {
  type AddNewAddressScreenProps,
  type IAddress,
  type IBGEState,
  type IBGECity,
} from '@uniw/shared-types'
import { themeApp as theme, colors } from '@uniw/shared-constants'
import { useClientProfile } from '@/contexts/ClientProfileProvider'
import { applyMask } from '@uniw/shared-utils'

import { InputText } from '@/components/forms/InputText'
import { Button } from '@/components/forms/Button'
import { Switch } from '@/components/forms/Switch'
import { Dropdown, DropdownItem } from '@/components/forms/Dropdown'
import { addAddressSchema } from '@uniw/shared-schemas'
import { ibgeService, viacepService } from '@uniw/shared-services'

const AddNewAddressScreen = ({ navigation }: AddNewAddressScreenProps) => {
  const { addAddress, isProfileLoading } = useClientProfile()

  const [states, setStates] = useState<DropdownItem[]>([])
  const [cities, setCities] = useState<DropdownItem[]>([])
  const [isLoadingCities, setIsLoadingCities] = useState(false)
  const [isCepLoading, setIsCepLoading] = useState(false)

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(addAddressSchema),
    mode: 'onBlur',
    defaultValues: {
      nome: '',
      cep: '',
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      complemento: '',
      isDefault: false,
    },
  })

  const watchedState = watch('estado')

  useEffect(() => {
    ibgeService
      .getStates()
      .then((data) =>
        setStates(data.map((s: IBGEState) => ({ label: s.nome, value: s.sigla }))),
      )
  }, [])

  useEffect(() => {
    if (watchedState) {
      setIsLoadingCities(true)
      ibgeService
        .getCitiesByState(watchedState)
        .then((data) =>
          setCities(data.map((c: IBGECity) => ({ label: c.nome, value: c.nome }))),
        )
        .finally(() => setIsLoadingCities(false))
    }
  }, [watchedState])

  const handleCepBlur = async (cep: string) => {
    if (cep?.length === 9) {
      setIsCepLoading(true)
      try {
        const endereco = await viacepService.getAddressByCep(cep)
        if (!endereco.erro) {
          setValue('rua', endereco.logradouro, { shouldValidate: true })
          setValue('bairro', endereco.bairro, { shouldValidate: true })
          setValue('estado', endereco.uf, { shouldValidate: true })
          setValue('cidade', endereco.localidade, { shouldValidate: true })
        }
      } finally {
        setIsCepLoading(false)
      }
    }
  }

  const handleSaveAddress = async (data: FieldValues) => {
    try {
      await addAddress(data as Omit<IAddress, 'id'>)
      Alert.alert('Sucesso!', 'Seu novo endereço foi salvo.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ])
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Não foi possível salvar o endereço.')
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
          <Controller
            control={control}
            name="nome"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                label="Nome do Endereço"
                placeholder="Ex: Casa, Trabalho"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.nome?.message}
              />
            )}
          />

          <View style={styles.cepContainer}>
            <Controller
              control={control}
              name="cep"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputText
                  label="CEP"
                  placeholder="00000-000"
                  onBlur={() => handleCepBlur(value)}
                  onChangeText={(text) => onChange(applyMask(text, 'cep'))}
                  value={value}
                  keyboardType="numeric"
                  maxLength={9}
                  error={errors.cep?.message}
                />
              )}
            />
            {isCepLoading && <ActivityIndicator style={styles.cepLoading} />}
          </View>

          <View style={styles.row}>
            <Controller
              control={control}
              name="rua"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputText
                  label="Rua"
                  placeholder="Ex: Rua das Flores"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.rua?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="numero"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputText
                  label="Número"
                  placeholder="Ex: 123"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.numero?.message}
                  width={30}
                />
              )}
            />
          </View>

          <Controller
            control={control}
            name="bairro"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                label="Bairro"
                placeholder="Seu bairro"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.bairro?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="estado"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                label="Estado"
                items={states}
                value={value}
                onValueChange={onChange}
                error={errors.estado?.message}
                placeholder="Selecione seu estado"
              />
            )}
          />

          <Controller
            control={control}
            name="cidade"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                label="Cidade"
                items={cities}
                value={value}
                onValueChange={onChange}
                error={errors.cidade?.message}
                placeholder="Selecione sua cidade"
                disabled={!watchedState || isLoadingCities}
              />
            )}
          />

          <Controller
            control={control}
            name="complemento"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                label="Complemento (Opcional)"
                placeholder="Ex: Apto 101, Bloco B"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="isDefault"
            render={({ field: { onChange, value } }) => (
              <Switch
                label="Definir como endereço padrão"
                description="Este endereço será usado para futuras compras."
                onValueChange={onChange}
                value={value}
              />
            )}
          />

          <Button
            title="Salvar Endereço"
            variant="primary"
            onPress={handleSubmit(handleSaveAddress)}
            loading={isProfileLoading}
            disabled={!isDirty || isProfileLoading}
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
    paddingBottom: theme.spacing.custom['botom-tab-height'],
    backgroundColor: colors.ui.background,
  },
  contentContainer: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.custom['botom-tab-height'],
    gap: theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
  },
  cepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cepLoading: {
    marginLeft: theme.spacing.sm,
    position: 'absolute',
    right: 16,
    top: 40,
  },
  button: {
    marginTop: theme.spacing.lg,
  },
})

export default AddNewAddressScreen
