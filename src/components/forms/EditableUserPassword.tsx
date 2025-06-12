// src/components/EditableUserPassword.tsx

import React, { useState } from 'react'

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useForm, Controller, type FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { theme } from '@/styles/theme'
import { changePasswordSchema } from '@/types/auth'
import { InputText } from './InputText'

interface EditableUserPasswordProps {}

export const EditableUserPassword = ({}: EditableUserPasswordProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
    mode: 'onBlur',
    defaultValues: { currentPassword: '', newPassword: '', confirmNewPassword: '' },
  })

  return (
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
        <TouchableOpacity
          onPress={() => {
            setIsEditing(!isEditing)
          }}
        >
          <Text style={styles.changeModeLabel}>
            {isEditing ? 'Cancelar' : 'Alterar senha'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    rowGap: theme.spacing.sm,
  },
  toggleChangeMode: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  changeModeLabel: {
    fontFamily: theme.fonts.family.medium,
    fontSize: theme.fonts.size.sm,
    color: theme.colors.error,
    textDecorationLine: 'underline',
  },
})
