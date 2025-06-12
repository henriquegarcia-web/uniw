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
import { theme } from '@/styles/theme'

type FeatherIconName = keyof typeof Feather.glyphMap

export type DropdownItem = {
  label: string
  value: any
}

interface AppDropdownProps {
  label?: string
  iconName?: FeatherIconName
  items: DropdownItem[]
  value: any | null
  onValueChange: (value: any | null) => void
  placeholder?: string
  error?: string | null
  disabled?: boolean
}

export const AppDropdown = ({
  label,
  iconName,
  items,
  value,
  onValueChange,
  placeholder = 'Selecione uma opção',
  error,
  disabled = false,
}: AppDropdownProps) => {
  const [modalVisible, setModalVisible] = useState(false)

  const selectedItemLabel = items.find((item) => item.value === value)?.label

  const handleSelect = (item: DropdownItem) => {
    onValueChange(item.value)
    setModalVisible(false)
  }

  const hasError = !!error
  const borderColor = hasError ? theme.colors.error : theme.colors.border
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
            color={theme.colors.text_secondary}
            style={styles.icon}
          />
        )}
        <Text style={[styles.inputText, !selectedItemLabel && styles.placeholderText]}>
          {selectedItemLabel || placeholder}
        </Text>
        <Feather name="chevron-down" size={20} color={theme.colors.text_secondary} />
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
    marginBottom: theme.spacing.md,
  },
  label: {
    marginBottom: theme.spacing.sm,
    fontFamily: theme.fonts.family.medium,
    fontSize: theme.fonts.size.sm,
    color: theme.colors.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borders.radius.sm,
    borderWidth: theme.borders.width.thin,
    height: 50,
    paddingHorizontal: theme.spacing.md,
  },
  disabled: {
    backgroundColor: '#E9E9E9',
    opacity: 0.7,
  },
  icon: {
    marginRight: theme.spacing.sm,
  },
  inputText: {
    flex: 1,
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    color: theme.colors.text,
  },
  placeholderText: {
    color: theme.colors.text_secondary,
  },
  errorText: {
    marginTop: theme.spacing.xs,
    marginLeft: theme.spacing.xs,
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.xs,
    color: theme.colors.error,
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
    backgroundColor: theme.colors.background,
    borderRadius: theme.borders.radius.md,
    overflow: 'hidden',
  },
  optionItem: {
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  optionText: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    color: theme.colors.text,
  },
})
