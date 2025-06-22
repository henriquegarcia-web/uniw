// src/components/ProductShipping.tsx

import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { themeApp, colors } from '@uniw/shared-constants'
import { Feather } from '@expo/vector-icons'
import { IShippingDetails } from '@uniw/shared-types'

type FeatherIconName = keyof typeof Feather.glyphMap

interface ProductShippingProps {
  shippingDetails?: IShippingDetails
}

export const ProductShipping = ({ shippingDetails }: ProductShippingProps) => {
  if (!shippingDetails) return null

  return (
    <View style={styles.deliveryBanner}>
      <Text style={styles.deliveryBannerTopText}>Será postado em até:</Text>
      <Text style={styles.deliveryBannerBottomText}>
        {shippingDetails.shippingLeadTimeDays} dias úteis
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  deliveryBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    rowGap: themeApp.spacing.xs,
    paddingHorizontal: themeApp.spacing.md,
    paddingVertical: themeApp.spacing.md,
    marginBottom: themeApp.spacing.md,
    borderRadius: themeApp.borders.radius.xs,
    backgroundColor: colors.brand.secondary,
  },
  deliveryBannerTopText: {
    fontFamily: themeApp.fonts.family.semiBold,
    fontSize: themeApp.fonts.size.lg,
    lineHeight: themeApp.fonts.size.lg,
    color: colors.text.onBrand,
  },
  deliveryBannerBottomText: {
    fontFamily: themeApp.fonts.family.bold,
    fontSize: themeApp.fonts.size.lg,
    lineHeight: themeApp.fonts.size.lg,
    color: colors.text.onBrand,
  },
})
