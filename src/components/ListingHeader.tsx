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

import { theme } from '@/styles/theme'
import { Button } from './forms/Button'
import { FilterState, ProductBadge, SortOption, sortOptions } from '@/types/products'
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
        <View style={styles.modalOverlay}>
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
                  color={theme.colors.secondary}
                />
                <Text style={styles.checkboxLabel}>{badge.replace('_', ' ')}</Text>
              </TouchableOpacity>
            ))}

            <View style={{ marginTop: 20 }}>
              <Button title="Aplicar Filtros" onPress={handleApplyFilters} />
            </View>
          </View>
        </View>
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
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.xl,
    paddingTop: 2,
  },
  buttonsContainer: {
    flexDirection: 'row',
    columnGap: theme.spacing.sm,
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
    backgroundColor: theme.colors.background,
    borderRadius: theme.borders.radius.md,
    padding: theme.spacing.lg,
  },
  optionButton: {
    paddingVertical: theme.spacing.md,
  },
  optionText: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.lg,
  },
  selectedOptionText: {
    fontFamily: theme.fonts.family.bold,
    color: theme.colors.secondary,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  modalTitle: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.xl,
    textAlign: 'center',
    flex: 1,
  },
  clearButtonText: {
    fontFamily: theme.fonts.family.medium,
    color: theme.colors.secondary,
    fontSize: theme.fonts.size.md,
  },
  filterSectionTitle: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.lg,
    color: theme.colors.text,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  priceRangeContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  checkboxLabel: {
    marginLeft: theme.spacing.sm,
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    textTransform: 'capitalize',
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
    backgroundColor: theme.colors.background,

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
