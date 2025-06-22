// src/components/ListingHeader.tsx

import React, { useEffect, useState } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  View,
  Text,
  Modal,
} from 'react-native'
import { Feather, Octicons } from '@expo/vector-icons'

import { themeApp, colors } from '@uniw/shared-constants'
import { Button } from './forms/Button'
import { FilterState, ProductBadge, SortOption, sortOptions } from '@uniw/shared-types'
import { InputText } from './forms/InputText'

type FeatherIconName = keyof typeof Octicons.glyphMap

interface ListingHeaderProps extends TouchableOpacityProps {
  title: string
  currentSort: SortOption
  currentFilters: FilterState
  onSortChange: (option: SortOption) => void
  onFiltersApply: (filters: FilterState) => void
}

export const ListingHeader = ({
  title,
  currentSort,
  currentFilters,
  onSortChange,
  onFiltersApply,
}: ListingHeaderProps) => {
  const [sortModalVisible, setSortModalVisible] = useState(false)
  const [filterModalVisible, setFilterModalVisible] = useState(false)

  const [tempMinPrice, setTempMinPrice] = useState(String(currentFilters.minPrice || ''))
  const [tempMaxPrice, setTempMaxPrice] = useState(String(currentFilters.maxPrice || ''))
  const [tempBadges, setTempBadges] = useState<ProductBadge[]>(
    currentFilters.badges || [],
  )

  const isFilterActive =
    (currentFilters.minPrice != null && currentFilters.minPrice > 0) ||
    (currentFilters.maxPrice != null && currentFilters.maxPrice > 0) ||
    (currentFilters.badges != null && currentFilters.badges.length > 0)

  useEffect(() => {
    if (filterModalVisible) {
      setTempMinPrice(String(currentFilters.minPrice || ''))
      setTempMaxPrice(String(currentFilters.maxPrice || ''))
      setTempBadges(currentFilters.badges || [])
    }
  }, [filterModalVisible, currentFilters])

  const handleSelectSort = (option: SortOption) => {
    onSortChange(option)
    setSortModalVisible(false)
  }

  const handleApplyFilters = () => {
    const newFilters: FilterState = {
      minPrice: tempMinPrice ? parseFloat(tempMinPrice) : undefined,
      maxPrice: tempMaxPrice ? parseFloat(tempMaxPrice) : undefined,
      badges: tempBadges.length > 0 ? tempBadges : undefined,
    }
    onFiltersApply(newFilters)
    setFilterModalVisible(false)
  }

  const handleClearFilters = () => {
    setTempMinPrice('')
    setTempMaxPrice('')
    setTempBadges([])
  }

  const handleBadgeToggle = (badge: ProductBadge) => {
    setTempBadges((prevBadges) =>
      prevBadges.includes(badge)
        ? prevBadges.filter((b) => b !== badge)
        : [...prevBadges, badge],
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.buttonsContainer}>
        <FilterButton
          label="Organizar"
          iconName="arrow-switch"
          onPress={() => setSortModalVisible(true)}
        />
        <FilterButton
          label="Filtros"
          iconName="filter"
          onPress={() => setFilterModalVisible(true)}
          activeIndicator={isFilterActive}
        />
      </View>

      <Modal
        visible={sortModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSortModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setSortModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Organizar por</Text>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.optionButton}
                onPress={() => handleSelectSort(option.value)}
              >
                <Text
                  style={[
                    styles.optionText,
                    currentSort === option.value && styles.selectedOptionText,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* MODAL DE FILTROS (IMPLEMENTAÇÃO COMPLETA) */}
      <Modal
        visible={filterModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setFilterModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtros</Text>
              <TouchableOpacity onPress={handleClearFilters}>
                <Text style={styles.clearButtonText}>Limpar</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.filterSectionTitle}>Faixa de Preço</Text>
            <View style={styles.priceRangeContainer}>
              <InputText
                placeholder="Mínimo"
                keyboardType="numeric"
                value={tempMinPrice}
                onChangeText={setTempMinPrice}
              />
              <InputText
                placeholder="Máximo"
                keyboardType="numeric"
                value={tempMaxPrice}
                onChangeText={setTempMaxPrice}
              />
            </View>

            <Text style={styles.filterSectionTitle}>Emblemas</Text>
            {Object.values(ProductBadge).map((badge) => (
              <TouchableOpacity
                key={badge}
                style={styles.checkboxContainer}
                onPress={() => handleBadgeToggle(badge)}
              >
                <Feather
                  name={tempBadges.includes(badge) ? 'check-square' : 'square'}
                  size={24}
                  color={colors.brand.secondary}
                />
                <Text style={styles.checkboxLabel}>{badge.replace('_', ' ')}</Text>
              </TouchableOpacity>
            ))}

            <View style={{ marginTop: 20, height: 50 }}>
              <Button
                title="Aplicar Filtros"
                onPress={handleApplyFilters}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: themeApp.fonts.family.semiBold,
    fontSize: themeApp.fonts.size.xl,
    paddingTop: 2,
  },
  buttonsContainer: {
    flexDirection: 'row',
    columnGap: themeApp.spacing.sm,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: colors.ui.background,
    borderRadius: themeApp.borders.radius.md,
    padding: themeApp.spacing.lg,
  },
  optionButton: {
    paddingVertical: themeApp.spacing.md,
  },
  optionText: {
    fontFamily: themeApp.fonts.family.regular,
    fontSize: themeApp.fonts.size.lg,
  },
  selectedOptionText: {
    fontFamily: themeApp.fonts.family.bold,
    color: colors.brand.secondary,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: themeApp.spacing.lg,
  },
  modalTitle: {
    fontFamily: themeApp.fonts.family.bold,
    fontSize: themeApp.fonts.size.xl,
    textAlign: 'center',
    flex: 1,
  },
  clearButtonText: {
    fontFamily: themeApp.fonts.family.medium,
    color: colors.brand.secondary,
    fontSize: themeApp.fonts.size.md,
  },
  filterSectionTitle: {
    fontFamily: themeApp.fonts.family.semiBold,
    fontSize: themeApp.fonts.size.lg,
    color: colors.text.primary,
    marginTop: themeApp.spacing.md,
    marginBottom: themeApp.spacing.sm,
  },
  priceRangeContainer: {
    flexDirection: 'row',
    gap: themeApp.spacing.md,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: themeApp.spacing.sm,
  },
  checkboxLabel: {
    marginLeft: themeApp.spacing.sm,
    fontFamily: themeApp.fonts.family.regular,
    fontSize: themeApp.fonts.size.md,
    textTransform: 'capitalize',
  },
})

// ===============================================

interface FilterButtonProps extends TouchableOpacityProps {
  label: string
  iconName?: FeatherIconName
  activeIndicator?: boolean
}

export const FilterButton = ({
  label,
  iconName,
  activeIndicator,
  ...rest
}: FilterButtonProps) => {
  return (
    <TouchableOpacity style={filterButtonStyles.button} activeOpacity={0.8} {...rest}>
      <Text style={filterButtonStyles.label}>{label}</Text>
      {iconName && (
        <Octicons
          name={iconName}
          size={16}
          color={colors.text.secondary}
          style={[
            filterButtonStyles.icon,
            iconName === 'arrow-switch' && filterButtonStyles.iconRotated,
          ]}
        />
      )}
      {activeIndicator && <View style={filterButtonStyles.activeFilterIndicator} />}
    </TouchableOpacity>
  )
}

const filterButtonStyles = StyleSheet.create({
  button: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: themeApp.spacing.sm,
    height: 30,
    paddingHorizontal: themeApp.spacing.sm,
    borderRadius: themeApp.borders.radius.sm,
    backgroundColor: colors.ui.background,

    borderWidth: 1,
    borderColor: colors.ui.border,
  },
  label: {
    fontFamily: themeApp.fonts.family.medium,
    fontSize: themeApp.fonts.size.sm,
  },
  icon: {},
  iconRotated: {
    transform: 'rotate(90deg)',
  },
  activeFilterIndicator: {
    position: 'absolute',
    top: -1,
    right: -4,
    width: 8,
    height: 8,
    borderRadius: themeApp.borders.radius.full,
    backgroundColor: colors.semantic.error,
  },
})
