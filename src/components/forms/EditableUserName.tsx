// src/components/EditableUserName.tsx

import React, { useState } from 'react'
import { Text, StyleSheet, View, Alert, TouchableOpacity } from 'react-native'

import { theme } from '@/styles/theme'
import { ButtonEdit } from './ButtonEdit'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { Button } from './Button'
import { InputText } from './InputText'
import { Modal } from '../Modal'

interface EditableUserNameProps {}

export const EditableUserName = ({}: EditableUserNameProps) => {
  const { user, updateUserName, isLoadingAuthFunctions } = useClientAuth()

  const [modalVisible, setModalVisible] = useState(false)
  const [newName, setNewName] = useState(user?.baseProfile?.nome || '')

  const handleOpenModal = () => {
    setNewName(user?.baseProfile?.nome || '')
    setModalVisible(true)
  }

  const handleSubmit = async () => {
    if (!newName.trim()) {
      Alert.alert('Erro', 'O nome não pode ficar em branco.')
      return
    }

    try {
      await updateUserName(newName)
      Alert.alert('Sucesso', 'Seu nome foi alterado.')
      setModalVisible(false)
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível alterar o nome.')
    }
  }

  return (
    <View style={styles.nameContainer}>
      <View style={styles.nameWrapper}>
        <Text style={styles.name}>{user?.baseProfile.nome}</Text>

        <View style={styles.nameEdit}>
          <ButtonEdit size="sm" onPress={handleOpenModal} />
        </View>
      </View>

      <Modal
        variant="fade"
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Alterar Nome"
      >
        <View style={styles.modalContent}>
          <InputText
            label="Seu novo nome"
            placeholder="Digite seu novo nome"
            value={newName}
            onChangeText={setNewName}
            autoCapitalize="words"
          />
          <View style={styles.modalActions}>
            <Button
              title="Cancelar"
              variant="secondary"
              onPress={() => setModalVisible(false)}
              disabled={isLoadingAuthFunctions}
              style={{ flex: 1, height: 50 }}
            />
            <Button
              title="Salvar"
              variant="primary"
              onPress={handleSubmit}
              loading={isLoadingAuthFunctions}
              disabled={isLoadingAuthFunctions}
              style={{ flex: 1, height: 50 }}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: 'row',
  },
  nameWrapper: {
    position: 'relative',
  },
  name: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.md,
    lineHeight: theme.fonts.size.lg,
    borderRadius: theme.borders.radius.circle,
    color: theme.colors.text_contrast,
  },
  nameEdit: {
    position: 'absolute',
    top: -10,
    right: -22,
  },
  modalContent: {
    rowGap: 10,
  },
  modalActions: {
    flexDirection: 'row',
    marginTop: theme.spacing.md,
    gap: theme.spacing.md,
  },
})
