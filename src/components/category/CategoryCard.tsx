// src/components/category/CategoryCard.tsx

import React from 'react'
import { Text, StyleSheet, TouchableOpacity, ImageBackground, View } from 'react-native'

import { theme } from '@/styles/theme'
import { IProductCategory } from '@/types/products'

interface CategoryCardProps {
  category: IProductCategory
  onPress: (categoryId: string) => void
}

export const CategoryCard = ({ category, onPress }: CategoryCardProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => onPress(category.id)}
    >
      <ImageBackground
        source={{ uri: category.imageUrl }}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>
          <Text style={styles.name}>{category.name}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 90,

    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: theme.borders.radius.sm,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: theme.borders.radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.lg,
    color: theme.colors.background,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
})
