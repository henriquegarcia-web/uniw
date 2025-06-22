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
import { themeApp, colors } from '@uniw/shared-constants'
import { useNavigation } from '@react-navigation/native'
import { AppStackParamList } from '@uniw/shared-types'
import { useSearch } from '@/contexts/SearchProvider'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

interface InputSearchProps extends TextInputProps {
  error?: string | null
  width?: number
  onVoicePress?: () => void
}

export const InputSearch = forwardRef<TextInput, InputSearchProps>(
  ({ error, width, onVoicePress, ...rest }, ref) => {
    const hasError = !!error
    const borderColor = hasError ? colors.semantic.error : colors.ui.border

    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

    const { searchTerm, setSearchTerm, clearSearch } = useSearch()

    const handleSearch = () => {
      if (!searchTerm || searchTerm.trim() === '') return

      navigation.navigate('SearchResults', {
        searchTerm: searchTerm,
      })
    }

    const handleClearSearch = () => {
      clearSearch()

      // navigation.navigate('SearchStack', {
      //   screen: 'SearchResults',
      //   params: { searchTerm: '' },
      // })
    }

    return (
      <View style={[!width && styles.container, { width: `${width || 100}%` }]}>
        <View style={[styles.inputContainer, { borderColor }]}>
          <Feather
            name="search"
            size={20}
            color={colors.text.secondary}
            style={styles.icon}
          />

          <TextInput
            ref={ref}
            style={styles.input}
            placeholder="Pesquisar produto"
            placeholderTextColor={colors.text.secondary}
            value={searchTerm}
            onChangeText={setSearchTerm}
            onSubmitEditing={() => handleSearch()}
            returnKeyType="search"
            {...rest}
          />

          {searchTerm && searchTerm.trim() !== '' && (
            <TouchableOpacity onPress={handleClearSearch}>
              <Feather name="x-circle" size={20} color={colors.text.secondary} />
            </TouchableOpacity>
          )}

          {onVoicePress && (!searchTerm || searchTerm.trim() === '') && (
            <TouchableOpacity onPress={onVoicePress}>
              <Feather name="mic" size={20} color={colors.text.secondary} />
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
    borderRadius: themeApp.borders.radius.sm,
    paddingHorizontal: themeApp.spacing.md,
    backgroundColor: colors.ui.background,
    borderWidth: themeApp.borders.width.thin,
    borderColor: colors.ui.border,
  },
  icon: {
    marginRight: themeApp.spacing.sm,
  },
  input: {
    flex: 1,
    height: 40,
    fontFamily: themeApp.fonts.family.regular,
    fontSize: themeApp.fonts.size.md,
    color: colors.text.primary,
    marginTop: 2,
  },
  errorText: {
    marginTop: themeApp.spacing.xs,
    marginLeft: themeApp.spacing.xs,
    fontFamily: themeApp.fonts.family.regular,
    fontSize: themeApp.fonts.size.xs,
    color: colors.semantic.error,
  },
})
