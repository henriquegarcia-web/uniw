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
import { theme } from '@/styles/theme'

type FeatherIconName = keyof typeof Feather.glyphMap

interface InputTextProps extends TextInputProps {
  type?: 'default' | 'contrast'
  label?: string
  iconName?: FeatherIconName
  isPassword?: boolean
  error?: string | null
  width?: number
}

export const InputText = forwardRef<TextInput, InputTextProps>(
  ({ type = 'default', label, iconName, isPassword, error, width, ...rest }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const hasError = !!error
    const borderColor = hasError ? theme.colors.error : theme.colors.border
    const backgroundColor =
      type === 'default' ? theme.colors.surface : theme.colors.background

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prevState) => !prevState)
    }

    return (
      <View style={[!width && styles.container, { width: `${width || 100}%` }]}>
        {label && <Text style={styles.label}>{label}</Text>}

        <View style={[styles.inputContainer, { borderColor, backgroundColor }]}>
          {iconName && (
            <Feather
              name={iconName}
              size={20}
              color={theme.colors.text_secondary}
              style={styles.icon}
            />
          )}

          <TextInput
            ref={ref}
            style={styles.input}
            placeholderTextColor={theme.colors.text_secondary}
            secureTextEntry={isPassword && !isPasswordVisible}
            {...rest}
          />

          {isPassword && (
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Feather
                name={isPasswordVisible ? 'eye' : 'eye-off'}
                size={20}
                color={theme.colors.text_secondary}
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
    flex: 1,
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
    paddingHorizontal: theme.spacing.md,
  },
  icon: {
    marginRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    height: 50,
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    color: theme.colors.text,
  },
  errorText: {
    marginTop: theme.spacing.xs,
    marginLeft: theme.spacing.xs,
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.xs,
    color: theme.colors.error,
  },
})
