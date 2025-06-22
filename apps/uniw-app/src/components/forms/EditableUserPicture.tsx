// src/components/EditableUserPicture.tsx

import React, { useState } from 'react'
import { Alert, Image, StyleSheet, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import { themeApp, colors } from '@uniw/shared-constants'
import { ButtonEdit } from './ButtonEdit'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { Button } from './Button'
import { Modal } from '../Modal'

interface EditableUserPictureProps {}

export const EditableUserPicture = ({}: EditableUserPictureProps) => {
  const {
    user,
    updateUserProfilePicture,
    removeUserProfilePicture,
    isLoadingAuthFunctions,
  } = useClientAuth()
  const [modalVisible, setModalVisible] = useState(false)

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permissionResult.granted === false) {
      Alert.alert(
        'Permissão necessária',
        'Você precisa permitir o acesso à galeria para alterar a foto.',
      )
      return
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    })

    if (!pickerResult.canceled) {
      setModalVisible(false)
      try {
        await updateUserProfilePicture(pickerResult.assets[0].uri)
        Alert.alert('Sucesso', 'Sua foto de perfil foi atualizada!')
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível atualizar sua foto.')
      }
    }
  }

  const handleRemoveImage = () => {
    setModalVisible(false)
    Alert.alert(
      'Remover Foto',
      'Tem certeza que deseja remover sua foto de perfil? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeUserProfilePicture()
              Alert.alert('Sucesso', 'Sua foto foi removida.')
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível remover sua foto.')
            }
          },
        },
      ],
    )
  }

  const userHasPhoto = !!user?.baseProfile?.foto

  return (
    <View style={styles.avatarContainer}>
      <View style={styles.avatarWrapper}>
        {userHasPhoto ? (
          <Image source={{ uri: user.baseProfile.foto! }} style={styles.avatar} />
        ) : (
          <Image
            source={require('@/assets/images/avatar.jpg')}
            style={styles.placeholder}
          />
        )}

        <View style={styles.avatarEdit}>
          <ButtonEdit onPress={() => setModalVisible(true)} />
        </View>
      </View>

      <Modal
        variant="slide"
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={userHasPhoto ? 'Alterar foto de perfil' : 'Adicionar foto de perfil'}
      >
        <View style={styles.modalContent}>
          <Button
            title="Escolher foto"
            variant="primary"
            onPress={handlePickImage}
            style={{ height: 50 }}
          />
          {userHasPhoto && (
            <Button
              title="Remover foto"
              variant="negative"
              onPress={handleRemoveImage}
              style={{ height: 50 }}
            />
          )}
          <Button
            title="Cancelar"
            variant="secondary"
            onPress={() => setModalVisible(false)}
            disabled={isLoadingAuthFunctions}
            style={{ height: 50 }}
          />
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: themeApp.borders.radius.full,
  },
  placeholder: {
    width: 100,
    height: 100,
    borderRadius: themeApp.borders.radius.full,
  },
  avatarEdit: {
    position: 'absolute',
    top: -2,
    right: -2,
  },
  modalContent: {
    rowGap: themeApp.spacing.sm,
  },
})
