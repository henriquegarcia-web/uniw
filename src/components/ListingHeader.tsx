// src/components/ListingHeader.tsx

import React from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  View,
  Text,
} from 'react-native'
import { Octicons } from '@expo/vector-icons'

import { theme } from '@/styles/theme'

type FeatherIconName = keyof typeof Octicons.glyphMap

interface ListingHeaderProps extends TouchableOpacityProps {
  title: string
}

export const ListingHeader = ({ title }: ListingHeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.buttonsContainer}>
        <FilterButton label="Organizar" iconName="arrow-switch" onPress={() => {}} />
        <FilterButton label="Filtros" iconName="filter" onPress={() => {}} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  title: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.xl,
    paddingTop: 2,
  },
  buttonsContainer: {
    flexDirection: 'row',
    columnGap: theme.spacing.sm,
  },
})

// ===============================================

interface FilterButtonProps extends TouchableOpacityProps {
  label: string
  iconName?: FeatherIconName
}

export const FilterButton = ({ label, iconName, ...rest }: FilterButtonProps) => {
  return (
    <TouchableOpacity style={filterButtonStyles.button} activeOpacity={0.8} {...rest}>
      <Text style={filterButtonStyles.label}>{label}</Text>
      {iconName && (
        <Octicons
          name={iconName}
          size={16}
          color={theme.colors.text_secondary}
          style={[
            filterButtonStyles.icon,
            iconName === 'arrow-switch' && filterButtonStyles.iconRotated,
          ]}
        />
      )}
    </TouchableOpacity>
  )
}

const filterButtonStyles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: theme.spacing.sm,
    height: 30,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borders.radius.sm,

    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  label: {
    fontFamily: theme.fonts.family.medium,
    fontSize: theme.fonts.size.sm,
  },
  icon: {},
  iconRotated: {
    transform: 'rotate(90deg)',
  },
})
