// src/components/Modal.tsx

import React from 'react'
import {
  Modal as NativeModal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { themeApp, colors } from '@uniw/shared-constants'

interface ModalProps {
  variant: 'fade' | 'slide'
  isVisible: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export const Modal = ({ variant, isVisible, onClose, title, children }: ModalProps) => {
  return (
    <NativeModal
      animationType={variant}
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      {variant === 'fade' ? (
        <View style={styles.modalFadeOverlay}>
          <SafeAreaView style={styles.modalFadeSafeArea}>
            <TouchableWithoutFeedback>
              <View style={styles.modalFadeContainer}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalHeaderTitle}>{title || ''}</Text>
                  <TouchableOpacity
                    onPress={onClose}
                    style={styles.modalHeaderCloseButton}
                  >
                    <MaterialCommunityIcons
                      name="close"
                      size={24}
                      color={colors.text.secondary}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.modalBody}>{children}</View>
              </View>
            </TouchableWithoutFeedback>
          </SafeAreaView>
        </View>
      ) : (
        <View style={styles.modalSlideOverlay}>
          <SafeAreaView style={styles.modalSlideContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderTitle}>{title || ''}</Text>
              <TouchableOpacity onPress={onClose} style={styles.modalHeaderCloseButton}>
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color={colors.text.secondary}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>{children}</View>
          </SafeAreaView>
        </View>
      )}
    </NativeModal>
  )
}

const styles = StyleSheet.create({
  // FADE MODAL
  modalFadeOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalFadeSafeArea: {
    width: '100%',
    alignItems: 'center',
  },
  modalFadeContainer: {
    width: '90%',
    backgroundColor: colors.ui.surface,
    borderRadius: themeApp.borders.radius.sm,
    padding: themeApp.spacing.lg,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  // SLIDE MODAL
  modalSlideOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalSlideContainer: {
    // flex: 1,
    rowGap: themeApp.spacing.sm,
    backgroundColor: colors.ui.surface,
    borderTopLeftRadius: themeApp.borders.radius.md,
    borderTopRightRadius: themeApp.borders.radius.md,
    padding: themeApp.spacing.md,
  },
  // COMMON
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.ui.border,
    paddingBottom: themeApp.spacing.md,
    marginBottom: themeApp.spacing.md,
  },
  modalHeaderTitle: {
    flex: 1,
    fontFamily: themeApp.fonts.family.bold,
    fontSize: themeApp.fonts.size.lg,
    color: colors.text.primary,
  },
  modalHeaderCloseButton: {
    padding: 4,
  },
  modalBody: {
    // flex: 1,
    // O conteúdo (children) será estilizado em seus próprios componentes
  },
})
