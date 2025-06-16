// src/components/product/ProductVariations.tsx

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { theme } from '@/styles/theme'
import type { IVariationType } from '@/types/products'

interface ProductVariationsProps {
  variationTypes: IVariationType[]
  selectedVariations: { [key: string]: string }
  onSelectVariation: (variationName: string, optionValue: string) => void
  isOptionDisabled: (variationName: string, optionValue: string) => boolean
}

export const ProductVariations = ({
  variationTypes,
  selectedVariations,
  onSelectVariation,
  isOptionDisabled,
}: ProductVariationsProps) => {
  if (!variationTypes || variationTypes.length === 0) {
    return null
  }

  return (
    <View style={styles.container}>
      {variationTypes.map((variationType) => {
        const currentSelection = selectedVariations[variationType.name]
        const selectedLabel = variationType.options.find(
          (opt) => opt.value === currentSelection,
        )?.label

        return (
          <View key={variationType.name} style={styles.variationGroup}>
            <Text style={styles.variationName}>
              {variationType.name}:{' '}
              <Text style={styles.selectedOptionLabel}>{selectedLabel}</Text>
            </Text>

            <View style={styles.optionsContainer}>
              {variationType.options.map((option) => {
                const isSelected = currentSelection === option.value
                const isDisabled = isOptionDisabled(variationType.name, option.value)

                return (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.optionButton,
                      isSelected && styles.optionSelected,
                      isDisabled && styles.optionDisabled,
                    ]}
                    onPress={() => onSelectVariation(variationType.name, option.value)}
                    disabled={isDisabled}
                  >
                    <Text
                      style={[styles.optionText, isSelected && styles.optionTextSelected]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    rowGap: theme.spacing.md,
  },
  variationGroup: {},
  variationName: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.lg,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  selectedOptionLabel: {
    fontFamily: theme.fonts.family.bold,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  optionButton: {
    borderWidth: 2,
    borderColor: theme.colors.secondary,
    borderRadius: theme.borders.radius.xs,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionSelected: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.secondary,
  },
  optionDisabled: {
    borderColor: theme.colors.disabled,
    backgroundColor: theme.colors.surface,
  },
  optionText: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.md,
    color: theme.colors.text_secondary,
  },
  optionTextSelected: {
    color: theme.colors.background,
  },
})
