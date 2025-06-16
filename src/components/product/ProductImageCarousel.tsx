// src/components/ProductImageCarousel.tsx

import React, { useState, useRef } from 'react'
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  ViewToken,
  TouchableOpacity,
} from 'react-native'
import { Feather } from '@expo/vector-icons'

import { theme } from '@/styles/theme'

interface ProductImageCarouselProps {
  images: string[]
}

const { width } = Dimensions.get('window')

export const ProductImageCarousel = ({ images }: ProductImageCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const flatListRef = useRef<FlatList>(null)

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setActiveIndex(viewableItems[0].index ?? 0)
      }
    },
  ).current

  const handlePrev = () => {
    if (activeIndex > 0) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex - 1,
        animated: true,
      })
    }
  }

  const handleNext = () => {
    if (activeIndex < images.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      })
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
          </View>
        )}
        keyExtractor={(_, index) => `carousel-item-${index}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
      />

      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <View
            key={`pagination-dot-${index}`}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

      {activeIndex > 0 && (
        <TouchableOpacity
          style={[styles.navButton, styles.leftButton]}
          onPress={handlePrev}
        >
          <Feather name="chevron-left" size={28} color={theme.colors.text} />
        </TouchableOpacity>
      )}

      {activeIndex < images.length - 1 && (
        <TouchableOpacity
          style={[styles.navButton, styles.rightButton]}
          onPress={handleNext}
        >
          <Feather name="chevron-right" size={28} color={theme.colors.text} />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: width,
  },
  imageContainer: {
    width: width,
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: theme.spacing.md,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    backgroundColor: theme.colors.secondary,
  },
  inactiveDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },

  navButton: {
    position: 'absolute',
    top: '50%',
    marginTop: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftButton: {
    left: theme.spacing.md,
  },
  rightButton: {
    right: theme.spacing.md,
  },
})
