// src/components/forms/Switch.tsx

import React from 'react'
import {
  View,
  Text,
  Switch as NativeSwitch,
  StyleSheet,
  SwitchProps as NativeSwitchProps,
} from 'react-native'
import { themeApp, colors } from '@uniw/shared-constants'

interface SwitchProps extends NativeSwitchProps {
  label: string
  description?: string
}

export const Switch = ({
  label,
  description,
  value,
  onValueChange,
  ...rest
}: SwitchProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      <NativeSwitch
        trackColor={{ false: colors.ui.disabled, true: colors.brand.primary }}
        thumbColor={value ? colors.ui.background : colors.ui.surface}
        ios_backgroundColor={colors.ui.disabled}
        onValueChange={onValueChange}
        value={value}
        {...rest}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: themeApp.spacing.md,
    backgroundColor: colors.ui.background,
    paddingHorizontal: themeApp.spacing.md,
    borderRadius: themeApp.borders.radius.sm,
    borderWidth: 1,
    borderColor: colors.ui.border,
  },
  textContainer: {
    flex: 1,
    marginRight: themeApp.spacing.md,
  },
  label: {
    fontFamily: themeApp.fonts.family.medium,
    fontSize: themeApp.fonts.size.md,
    color: colors.text.primary,
  },
  description: {
    fontFamily: themeApp.fonts.family.regular,
    fontSize: themeApp.fonts.size.sm,
    color: colors.text.secondary,
    marginTop: 2,
  },
})
