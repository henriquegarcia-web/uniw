// src/components/EditableUserPassword.tsx

import React, { useCallback, useEffect, useState } from 'react'

import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useForm, Controller, type FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { themeApp, colors } from '@uniw/shared-constants'
import { InputText } from './InputText'
import { Button } from './Button'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { useFocusEffect } from '@react-navigation/native'
import { changePasswordSchema } from '@uniw/shared-schemas'

interface EditableUserPasswordProps {}

export const EditableUserPassword = ({}: EditableUserPasswordProps) => {
  const { isLoadingAuthFunctions, reauthenticate, changePassword } = useClientAuth()

  const [modalVisible, setModalVisible] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    getValues,
    clearErrors,
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
    mode: 'onBlur',
    defaultValues: { currentPassword: '', newPassword: '', confirmNewPassword: '' },
  })

  const handleOpenModal = async () => {
    const currentPassword = getValues('currentPassword')
    if (!currentPassword) {
      setError('currentPassword', {
        type: 'manual',
        message: 'Digite sua senha atual primeiro.',
      })
      return
    }

    try {
      await reauthenticate(currentPassword)
      setModalVisible(true)
    } catch (error: any) {
      setError('currentPassword', { type: 'manual', message: error.message })
    }
  }

  const handleCloseModal = () => {
    reset({ newPassword: '', confirmNewPassword: '' })
    setModalVisible(false)
  }

  const handleChangePassword = async (data: FieldValues) => {
    try {
      await changePassword(data.newPassword)
      Alert.alert('Sucesso', 'Sua senha foi alterada.')
      reset()
      setModalVisible(false)
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Não foi possível alterar a senha.')
    }
  }

  useFocusEffect(
    useCallback(() => {
      return () => {
        clearErrors()
      }
    }, [clearErrors]),
  )

  return (
    <>
      <View style={styles.content}>
        <Controller
          control={control}
          name="currentPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <InputText
              label="Senha"
              placeholder="Digite sua senha atual para edita-la"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              isPassword
              error={errors.currentPassword?.message}
            />
          )}
        />
        <View style={styles.toggleChangeMode}>
          <TouchableOpacity onPress={handleOpenModal}>
            <Text style={styles.changeModeLabel}>Alterar senha</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Alterar senha</Text>
            <Controller
              control={control}
              name="newPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputText
                  iconName="lock"
                  placeholder="Crie uma senha"
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
                  iconName="lock"
                  placeholder="Confirme sua senha"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  isPassword
                  error={errors.confirmNewPassword?.message}
                />
              )}
            />
            <View style={styles.modalActions}>
              <Button
                title="Cancelar"
                variant="secondary"
                onPress={handleCloseModal}
                disabled={isLoadingAuthFunctions}
                style={{ flex: 1 }}
              />
              <Button
                title="Salvar"
                variant="primary"
                onPress={handleSubmit(handleChangePassword)}
                loading={isLoadingAuthFunctions}
                disabled={isLoadingAuthFunctions}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    rowGap: themeApp.spacing.sm,
  },
  toggleChangeMode: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  changeModeLabel: {
    fontFamily: themeApp.fonts.family.medium,
    fontSize: themeApp.fonts.size.sm,
    color: colors.semantic.error,
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: themeApp.spacing.lg,
  },
  modalContent: {
    width: '100%',
    height: 320,
    backgroundColor: colors.ui.surface,
    borderRadius: themeApp.borders.radius.md,
    padding: themeApp.spacing.lg,
  },
  modalTitle: {
    fontFamily: themeApp.fonts.family.bold,
    fontSize: themeApp.fonts.size.lg,
    color: colors.text.primary,
    marginBottom: themeApp.spacing.md,
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    marginTop: themeApp.spacing.lg,
    gap: themeApp.spacing.md,
  },
})
