// src/components/InputText.tsx

import React, { useState, forwardRef } from 'react'
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
} from 'react-native'

import { Feather } from '@expo/vector-icons'
import { themeApp, colors } from '@uniw/shared-constants'

type FeatherIconName = keyof typeof Feather.glyphMap

interface InputTextProps extends TextInputProps {
  label?: string
  iconName?: FeatherIconName
  isPassword?: boolean
  error?: string | null
  width?: number
}

export const InputText = forwardRef<TextInput, InputTextProps>(
  ({ label, iconName, isPassword, error, width, ...rest }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const hasError = !!error
    const borderColor = hasError ? colors.semantic.error : colors.ui.border

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prevState) => !prevState)
    }

    return (
      <View style={[!width && styles.container, { width: `${width || 100}%` }]}>
        {label && <Text style={styles.label}>{label}</Text>}

        <View style={[styles.inputContainer, { borderColor }]}>
          {iconName && (
            <Feather
              name={iconName}
              size={20}
              color={colors.text.secondary}
              style={styles.icon}
            />
          )}

          <TextInput
            ref={ref}
            style={styles.input}
            placeholderTextColor={colors.text.secondary}
            secureTextEntry={isPassword && !isPasswordVisible}
            {...rest}
          />

          {isPassword && (
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Feather
                name={isPasswordVisible ? 'eye' : 'eye-off'}
                size={20}
                color={colors.text.secondary}
                // style={styles.icon}
              />
            </TouchableOpacity>
          )}
        </View>

        {hasError && <Text style={styles.errorText}>{error}</Text>}
      </View>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
    borderRadius: themeApp.borders.radius.sm,
    borderWidth: themeApp.borders.width.thin,
    paddingHorizontal: themeApp.spacing.md,
    backgroundColor: colors.ui.background,
  },
  icon: {
    marginRight: themeApp.spacing.sm,
  },
  input: {
    flex: 1,
    height: 50,
    fontFamily: themeApp.fonts.family.regular,
    fontSize: themeApp.fonts.size.md,
    color: colors.text.primary,
    backgroundColor: colors.ui.background,
  },
  errorText: {
    marginTop: themeApp.spacing.xs,
    marginLeft: themeApp.spacing.xs,
    fontFamily: themeApp.fonts.family.regular,
    fontSize: themeApp.fonts.size.xs,
    color: colors.semantic.error,
  },
})
