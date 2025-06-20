// src/components/forms/Switch.tsx

import React from 'react'
import {
  View,
  Text,
  Switch as NativeSwitch,
  StyleSheet,
  SwitchProps as NativeSwitchProps,
} from 'react-native'
import { theme } from '@/styles/theme'

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
        trackColor={{ false: theme.colors.disabled, true: theme.colors.primary }}
        thumbColor={value ? theme.colors.background : theme.colors.surface}
        ios_backgroundColor={theme.colors.disabled}
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
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borders.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  textContainer: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  label: {
    fontFamily: theme.fonts.family.medium,
    fontSize: theme.fonts.size.md,
    color: theme.colors.text,
  },
  description: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.sm,
    color: theme.colors.text_secondary,
    marginTop: 2,
  },
})
