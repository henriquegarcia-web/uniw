// src/components/banners/OffersBanner.tsx

import React, { useEffect, useState } from 'react'
import {
  BannerType,
  IOfferBanner,
  IOfferAdvertisementBanner,
  IOfferCarouselBanner,
  IOfferCtaBanner,
  IOfferCtaWithBannerBanner,
  IOfferSimpleBanner,
} from '@uniw/shared-types'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ProductImageCarousel } from '../product/ProductImageCarousel'
import { Feather } from '@expo/vector-icons'
import { themeApp, colors } from '@uniw/shared-constants'
import { CtaButton } from '../forms/CtaButton'

const useCountdown = (endDate: number) => {
  const [timeLeft, setTimeLeft] = useState(endDate - Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(endDate - Date.now())
    }, 1000)

    return () => clearInterval(interval)
  }, [endDate])

  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60)
  const seconds = Math.floor((timeLeft / 1000) % 60)

  return `${hours.toString().padStart(2, '0')}h ${minutes
    .toString()
    .padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s restante`
}

type OffersBannerProps = {
  banner: IOfferBanner
}

export const OffersBanner = ({ banner }: OffersBannerProps) => {
  const renderOfferBanner = () => {
    switch (banner.type) {
      case BannerType.OFFER_CAROUSEL:
        return <OfferCarousel data={banner} />

      case BannerType.OFFER_CTA:
      case BannerType.OFFER_CTA_WITH_BANNER:
        return <OfferCta data={banner} />

      case BannerType.OFFER_SIMPLE:
        return <OfferSimple data={banner} />

      case BannerType.OFFER_ADVERTISEMENT:
        return <OfferAdvertisement data={banner} />

      default:
        return null
    }
  }

  return <View style={styles.container}>{renderOfferBanner()}</View>
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: themeApp.spacing.lg,
  },
})

// ================================================================

export const OfferCarousel = ({ data }: { data: IOfferCarouselBanner }) => {
  const images = data.slides.map((slide) => slide.imageUrl)
  return (
    <View style={offerCarouselStyles.container}>
      <ProductImageCarousel images={images} type="hero" />
    </View>
  )
}
const offerCarouselStyles = StyleSheet.create({
  container: {},
})

// ================================================================

export const OfferCta = ({
  data,
}: {
  data: IOfferCtaBanner | IOfferCtaWithBannerBanner
}) => {
  const countdown = useCountdown(data.endDate)

  return (
    <TouchableOpacity style={offerCtaStyles.container} activeOpacity={0.9}>
      {data.type === BannerType.OFFER_CTA_WITH_BANNER && (
        <Image source={{ uri: data.bannerImageUrl }} style={offerCtaStyles.bannerImage} />
      )}
      <View style={offerCtaStyles.content}>
        <View style={offerCtaStyles.textContainer}>
          <Text style={offerCtaStyles.title}>{data.title}</Text>
          <Text style={offerCtaStyles.countdown}>
            <Feather name="clock" size={14} /> {countdown}
          </Text>
        </View>
        <CtaButton title={data.cta.label} />
      </View>
    </TouchableOpacity>
  )
}

const offerCtaStyles = StyleSheet.create({
  container: {
    borderRadius: themeApp.borders.radius.sm,
    backgroundColor: colors.brand.secondary,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: 150,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: themeApp.spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: themeApp.fonts.family.bold,
    fontSize: themeApp.fonts.size.xl,
    color: colors.text.onBrand,
  },
  countdown: {
    fontFamily: themeApp.fonts.family.regular,
    fontSize: themeApp.fonts.size.sm,
    color: colors.text.onBrand,
    marginTop: themeApp.spacing.xs,
  },
})

// ================================================================

export const OfferSimple = ({ data }: { data: IOfferSimpleBanner }) => {
  return (
    <TouchableOpacity style={offerSimpleStyles.container} activeOpacity={0.9}>
      <Image source={{ uri: data.imageUrl }} style={offerSimpleStyles.image} />
      <View style={offerSimpleStyles.textContainer}>
        <Text style={offerSimpleStyles.title}>{data.title}</Text>
        <Text style={offerSimpleStyles.subtitle}>{data.subtitle}</Text>
      </View>
    </TouchableOpacity>
  )
}

const offerSimpleStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: themeApp.spacing.lg,
    backgroundColor: colors.brand.secondary,
    borderRadius: themeApp.borders.radius.sm,
    padding: themeApp.spacing.md,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: themeApp.borders.radius.sm,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: themeApp.fonts.family.semiBold,
    fontSize: themeApp.fonts.size.xl,
    color: colors.text.onBrand,
  },
  subtitle: {
    fontFamily: themeApp.fonts.family.regular,
    fontSize: themeApp.fonts.size.md,
    color: colors.text.onBrand,
  },
})

// ================================================================

export const OfferAdvertisement = ({ data }: { data: IOfferAdvertisementBanner }) => {
  return (
    <View style={offerAdvertisementStyles.container}>
      <Text style={offerAdvertisementStyles.sponsoredText}>{data.title}</Text>
      <TouchableOpacity activeOpacity={0.9} style={offerAdvertisementStyles.mainContent}>
        <Image
          source={{ uri: data.media.url }}
          style={offerAdvertisementStyles.mediaImage}
        />
        <View style={offerAdvertisementStyles.ctaContainer}>
          <Text style={offerAdvertisementStyles.ctaText}>{data.cta.label}</Text>
          <Feather name="arrow-right" size={18} color={colors.text.primary} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const offerAdvertisementStyles = StyleSheet.create({
  container: {},
  sponsoredText: {
    fontFamily: themeApp.fonts.family.regular,
    fontSize: themeApp.fonts.size.sm,
    color: colors.text.secondary,
    marginBottom: themeApp.spacing.sm,
  },
  mainContent: {
    borderWidth: 1,
    borderColor: colors.ui.border,
    borderRadius: themeApp.borders.radius.sm,
    backgroundColor: colors.ui.background,
  },
  mediaImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: themeApp.borders.radius.sm,
    borderTopRightRadius: themeApp.borders.radius.sm,
  },
  ctaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: themeApp.spacing.md,
  },
  ctaText: {
    fontFamily: themeApp.fonts.family.semiBold,
    fontSize: themeApp.fonts.size.lg,
    color: colors.text.primary,
  },
})
