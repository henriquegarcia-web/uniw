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

import { themeApp, colors } from '@uniw/shared-constants'

interface ProductImageCarouselProps {
  images?: string[]
  type: 'hero' | 'productDetail'
}

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const ITEM_WIDTH = SCREEN_WIDTH - 2 * themeApp.spacing.lg
const GAP_SIZE = themeApp.spacing.md

export const ProductImageCarousel = ({ images, type }: ProductImageCarouselProps) => {
  const bannerHeight = type === 'hero' ? 240 : ITEM_WIDTH

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
    if (images && activeIndex < images.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      })
    }
  }

  if (!images || images.length === 0)
    return (
      <View style={[styles.container, styles.noImage]}>
        <Image
          source={require('@/assets/backgrounds/product-without-image-placeholder.png')}
          style={styles.noImageImage}
        />
      </View>
    )

  return (
    <View style={[styles.container, { height: bannerHeight }]}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
          </View>
        )}
        keyExtractor={(_, index) => `carousel-item-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        pagingEnabled={false}
        decelerationRate="fast"
        snapToInterval={ITEM_WIDTH + GAP_SIZE}
        snapToAlignment="start"
        contentContainerStyle={styles.listContentContainer}
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

      {type === 'productDetail' && activeIndex > 0 && (
        <TouchableOpacity
          style={[styles.navButton, styles.leftButton]}
          onPress={handlePrev}
        >
          <Feather name="chevron-left" size={22} color={colors.text.primary} />
        </TouchableOpacity>
      )}

      {type === 'productDetail' && activeIndex < images.length - 1 && (
        <TouchableOpacity
          style={[styles.navButton, styles.rightButton]}
          onPress={handleNext}
        >
          <Feather name="chevron-right" size={22} color={colors.text.primary} />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: themeApp.spacing.sm,
  },
  noImage: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: themeApp.borders.radius.md,
    overflow: 'hidden',
    backgroundColor: colors.ui.disabled,
  },
  noImageImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  listContentContainer: {
    gap: GAP_SIZE,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: '100%',
    borderRadius: themeApp.borders.radius.md,
    overflow: 'hidden',
    backgroundColor: colors.ui.surface,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: themeApp.spacing.sm,
    marginTop: themeApp.spacing.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: themeApp.borders.radius.full,
  },
  activeDot: {
    width: 10,
    height: 10,
    backgroundColor: colors.brand.secondary,
  },
  inactiveDot: {
    backgroundColor: colors.ui.disabled,
  },

  navButton: {
    position: 'absolute',
    top: '50%',
    marginTop: -30,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftButton: {
    left: themeApp.spacing.md,
    paddingRight: 2,
  },
  rightButton: {
    right: themeApp.spacing.md,
    paddingLeft: 2,
  },
})
