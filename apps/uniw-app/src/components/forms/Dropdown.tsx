// src/components/forms/Dropdown.tsx

import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  SafeAreaView,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { themeApp, colors } from '@uniw/shared-constants'

type FeatherIconName = keyof typeof Feather.glyphMap

export type DropdownItem = {
  label: string
  value: any
}

interface DropdownProps {
  label?: string
  iconName?: FeatherIconName
  items: DropdownItem[]
  value: any | null
  onValueChange: (value: any | null) => void
  placeholder?: string
  error?: string | null
  disabled?: boolean
}

export const Dropdown = ({
  label,
  iconName,
  items,
  value,
  onValueChange,
  placeholder = 'Selecione uma opção',
  error,
  disabled = false,
}: DropdownProps) => {
  const [modalVisible, setModalVisible] = useState(false)

  const selectedItemLabel = items.find((item) => item.value === value)?.label

  const handleSelect = (item: DropdownItem) => {
    onValueChange(item.value)
    setModalVisible(false)
  }

  const hasError = !!error
  const borderColor = hasError ? colors.semantic.error : colors.ui.border
  const isDisabled = disabled

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={[styles.inputContainer, { borderColor }, isDisabled && styles.disabled]}
        onPress={() => !isDisabled && setModalVisible(true)}
        activeOpacity={0.7}
      >
        {iconName && (
          <Feather
            name={iconName}
            size={20}
            color={colors.text.secondary}
            style={styles.icon}
          />
        )}
        <Text style={[styles.inputText, !selectedItemLabel && styles.placeholderText]}>
          {selectedItemLabel || placeholder}
        </Text>
        <Feather name="chevron-down" size={20} color={colors.text.secondary} />
      </TouchableOpacity>

      {hasError && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <SafeAreaView style={styles.modalContent}>
            <FlatList
              data={items}
              keyExtractor={(item) => String(item.value)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </SafeAreaView>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: themeApp.spacing.sm,
    fontFamily: themeApp.fonts.family.medium,
    fontSize: themeApp.fonts.size.sm,
    color: colors.text.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.ui.background,
    borderRadius: themeApp.borders.radius.sm,
    borderWidth: themeApp.borders.width.thin,
    height: 50,
    paddingHorizontal: themeApp.spacing.md,
  },
  disabled: {
    backgroundColor: '#E9E9E9',
    opacity: 0.7,
  },
  icon: {
    marginRight: themeApp.spacing.sm,
  },
  inputText: {
    flex: 1,
    fontFamily: themeApp.fonts.family.regular,
    fontSize: themeApp.fonts.size.md,
    color: colors.text.primary,
  },
  placeholderText: {
    color: colors.text.secondary,
  },
  errorText: {
    marginTop: themeApp.spacing.xs,
    marginLeft: themeApp.spacing.xs,
    fontFamily: themeApp.fonts.family.regular,
    fontSize: themeApp.fonts.size.xs,
    color: colors.semantic.error,
  },
  // Estilos do Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  modalContent: {
    width: '100%',
    maxHeight: '60%',
    backgroundColor: colors.ui.background,
    borderRadius: themeApp.borders.radius.md,
    overflow: 'hidden',
  },
  optionItem: {
    padding: themeApp.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.ui.border,
  },
  optionText: {
    fontFamily: themeApp.fonts.family.regular,
    fontSize: themeApp.fonts.size.md,
    color: colors.text.primary,
  },
})
