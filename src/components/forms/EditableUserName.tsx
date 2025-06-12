// src/components/EditableUserName.tsx

import React, { useState } from 'react'
import { Text, StyleSheet, View, Alert, Modal } from 'react-native'

import { theme } from '@/styles/theme'
import { ButtonEdit } from './ButtonEdit'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { Button } from './Button'
import { InputText } from './InputText'

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
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Alterar Nome</Text>
            <InputText
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
                style={{ flex: 1 }}
              />
              <Button
                title="Salvar"
                variant="primary"
                onPress={handleSubmit}
                loading={isLoadingAuthFunctions}
                disabled={isLoadingAuthFunctions}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  nameContainer: {
    alignItems: 'center',
  },
  nameWrapper: {
    position: 'relative',
  },
  name: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.md,
    lineHeight: theme.fonts.size.lg,
    borderRadius: theme.borders.radius.circle,
  },
  nameEdit: {
    position: 'absolute',
    top: -10,
    right: -22,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  modalContent: {
    width: '100%',
    height: 240,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borders.radius.md,
    padding: theme.spacing.lg,
  },
  modalTitle: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.lg,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
})
