// src/components/InputSearch.tsx

import React, { forwardRef } from 'react'
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

interface InputSearchProps extends TextInputProps {
  error?: string | null
  width?: number
  onVoicePress?: () => void
}

export const InputSearch = forwardRef<TextInput, InputSearchProps>(
  ({ error, width, onVoicePress, ...rest }, ref) => {
    const hasError = !!error
    const borderColor = hasError ? theme.colors.error : theme.colors.border

    return (
      <View style={[!width && styles.container, { width: `${width || 100}%` }]}>
        <View style={[styles.inputContainer, { borderColor }]}>
          <Feather
            name="search"
            size={20}
            color={theme.colors.text_secondary}
            style={styles.icon}
          />

          <TextInput
            ref={ref}
            style={styles.input}
            placeholder="Pesquisar produto"
            placeholderTextColor={theme.colors.text_secondary}
            {...rest}
          />

          {onVoicePress && (
            <TouchableOpacity onPress={onVoicePress}>
              <Feather name="mic" size={20} color={theme.colors.text_secondary} />
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.borders.radius.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderWidth: theme.borders.width.thin,
    borderColor: theme.colors.border,
  },
  icon: {
    marginRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    height: 40,
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    color: theme.colors.text,
    marginTop: 2,
  },
  errorText: {
    marginTop: theme.spacing.xs,
    marginLeft: theme.spacing.xs,
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.xs,
    color: theme.colors.error,
  },
})
