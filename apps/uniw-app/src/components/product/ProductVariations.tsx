// src/components/product/ProductVariations.tsx

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { themeApp, colors } from '@uniw/shared-constants'
import type { IVariationType } from '@uniw/shared-types'

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
    rowGap: themeApp.spacing.md,
  },
  variationGroup: {},
  variationName: {
    fontFamily: themeApp.fonts.family.semiBold,
    fontSize: themeApp.fonts.size.lg,
    color: colors.text.primary,
    marginBottom: themeApp.spacing.sm,
  },
  selectedOptionLabel: {
    fontFamily: themeApp.fonts.family.bold,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: themeApp.spacing.md,
  },
  optionButton: {
    borderWidth: 2,
    borderColor: colors.brand.secondary,
    borderRadius: themeApp.borders.radius.xs,
    paddingVertical: themeApp.spacing.sm,
    paddingHorizontal: themeApp.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionSelected: {
    backgroundColor: colors.brand.secondary,
    borderColor: colors.brand.secondary,
  },
  optionDisabled: {
    borderColor: colors.ui.disabled,
    backgroundColor: colors.ui.surface,
  },
  optionText: {
    fontFamily: themeApp.fonts.family.semiBold,
    fontSize: themeApp.fonts.size.md,
    color: colors.text.secondary,
  },
  optionTextSelected: {
    color: colors.ui.background,
  },
})
