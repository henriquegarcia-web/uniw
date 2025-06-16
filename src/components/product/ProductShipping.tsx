// src/components/ProductShipping.tsx

import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { theme } from '@/styles/theme'
import { Feather } from '@expo/vector-icons'
import { IShippingDetails } from '@/types/products'

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
    rowGap: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderRadius: theme.borders.radius.xs,
    backgroundColor: theme.colors.secondary,
  },
  deliveryBannerTopText: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.lg,
    lineHeight: theme.fonts.size.lg,
    color: theme.colors.text_contrast,
  },
  deliveryBannerBottomText: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.lg,
    lineHeight: theme.fonts.size.lg,
    color: theme.colors.text_contrast,
  },
})
