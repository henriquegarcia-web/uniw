// src/components/EditableUserPicture.tsx

import React, { useState } from 'react'
import {
  Alert,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import { theme } from '@/styles/theme'
import { ButtonEdit } from './ButtonEdit'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { Button } from './Button'

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
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <SafeAreaView style={styles.actionSheet}>
            <TouchableOpacity style={styles.optionButton} onPress={handlePickImage}>
              <Text style={styles.optionText}>Alterar foto de perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, !userHasPhoto && styles.disabledOption]}
              onPress={handleRemoveImage}
              // disabled={!userHasPhoto}
            >
              <Text style={[styles.optionText, styles.destructiveText]}>
                Remover foto
              </Text>
            </TouchableOpacity>
            <Button
              title="Cancelar"
              variant="secondary"
              onPress={() => setModalVisible(false)}
              disabled={isLoadingAuthFunctions}
            />
          </SafeAreaView>
        </TouchableOpacity>
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
    borderRadius: theme.borders.radius.circle,
  },
  placeholder: {
    width: 100,
    height: 100,
    borderRadius: theme.borders.radius.circle,
  },
  avatarEdit: {
    position: 'absolute',
    top: -2,
    right: -2,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  actionSheet: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.borders.radius.md,
    borderTopRightRadius: theme.borders.radius.md,
    padding: theme.spacing.sm,
  },
  optionButton: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borders.radius.sm,
    padding: theme.spacing.md,
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  cancelButton: {
    marginTop: theme.spacing.xs,
  },
  optionText: {
    fontSize: theme.fonts.size.lg,
    color: theme.colors.secondary,
    fontFamily: theme.fonts.family.medium,
  },
  destructiveText: {
    color: theme.colors.error,
  },
  disabledOption: {
    opacity: 0.5,
  },
})
