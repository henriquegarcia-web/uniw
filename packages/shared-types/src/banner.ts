// ─── BANNER TYPES ─────────────────────────────────────────────────────────────

export enum BannerCategory {
  OFFERS = 'offers',
  PRODUCTS = 'products',
}

export enum BannerType {
  OFFER_CAROUSEL = 'offer_carousel',
  OFFER_CTA = 'offer_cta',
  OFFER_CTA_WITH_BANNER = 'offer_cta_with_banner',
  OFFER_SIMPLE = 'offer_simple',
  OFFER_ADVERTISEMENT = 'offer_advertisement',

  PRODUCT_GRID = 'product_grid',
  PRODUCT_FEATURED = 'product_featured',
  PRODUCT_SCROLL = 'product_scroll',
}

interface IBannerBase {
  id: string
  category: BannerCategory
  type: BannerType
}

// --- Interfaces de Banners de Oferta ---

export interface IOfferCarouselBanner extends IBannerBase {
  type: BannerType.OFFER_CAROUSEL
  slides: {
    imageUrl: string
    link: string
  }[]
  autoplay?: boolean
  duration?: number
}

export interface IOfferCtaBanner extends IBannerBase {
  type: BannerType.OFFER_CTA
  title: string
  subtitle?: string
  endDate: number
  cta: {
    label: string
    link: string
  }
}

export interface IOfferCtaWithBannerBanner extends IBannerBase {
  type: BannerType.OFFER_CTA_WITH_BANNER
  title: string
  subtitle?: string
  endDate: number
  cta: {
    label: string
    link: string
  }
  bannerImageUrl: string
}

export interface IOfferSimpleBanner extends IBannerBase {
  type: BannerType.OFFER_SIMPLE
  imageUrl: string
  title: string
  subtitle: string
  link?: string
}

export interface IOfferAdvertisementBanner extends IBannerBase {
  type: BannerType.OFFER_ADVERTISEMENT
  title: 'Patrocinado'
  media: {
    type: 'image' | 'video'
    url: string
  }
  cta: {
    label: string
    link: string
  }
}

export interface IProductFeaturedBanner extends IBannerBase {
  type: BannerType.PRODUCT_FEATURED
  title?: string
  legend?: string
  productId: string
}

export interface IProductListBanner extends IBannerBase {
  type: BannerType.PRODUCT_GRID | BannerType.PRODUCT_SCROLL
  title?: string
  productIds: string[]
}

export type IOfferBanner =
  | IOfferCarouselBanner
  | IOfferCtaBanner
  | IOfferSimpleBanner
  | IOfferCtaWithBannerBanner
  | IOfferAdvertisementBanner

export type IProductBanner = IProductFeaturedBanner | IProductListBanner

export type IBanner = IOfferBanner | IProductBanner

export function isOfferBanner(banner: IBanner): banner is IOfferBanner {
  return banner.category === BannerCategory.OFFERS
}

export function isProductListBanner(banner: IBanner): banner is IProductListBanner {
  return banner.category === BannerCategory.PRODUCTS
}

// ─── BANNER MOCK ──────────────────────────────────────────────────────────────

const sampleProductIds = ['prod-16', 'prod-17', 'prod-2', 'prod-22', 'prod-10']

const mockBanners: IBanner[] = [
  {
    id: 'banner-1',
    category: BannerCategory.OFFERS,
    type: BannerType.OFFER_CAROUSEL,
    slides: [
      {
        imageUrl: 'https://picsum.photos/seed/offer1/800/600',
        link: '/offers/summer-sale',
      },
      {
        imageUrl: 'https://picsum.photos/seed/offer2/800/600',
        link: '/category/cat-5',
      },
      {
        imageUrl: 'https://picsum.photos/seed/offer3/800/600',
        link: '/product/prod-10',
      },
    ],
    autoplay: true,
    duration: 5000,
  },

  {
    id: 'banner-4',
    category: BannerCategory.OFFERS,
    type: BannerType.OFFER_CTA,
    title: 'Ofertas do Dia',
    endDate: Date.now() + 24 * 60 * 60 * 1000,
    cta: {
      label: 'Ver todos',
      link: '/offers/daily',
    },
  },

  {
    id: 'banner-2',
    category: BannerCategory.PRODUCTS,
    type: BannerType.PRODUCT_SCROLL,
    productIds: sampleProductIds.slice(0, 4),
  },

  {
    id: 'banner-3',
    category: BannerCategory.OFFERS,
    type: BannerType.OFFER_SIMPLE,
    title: 'Ofertas Especiais',
    subtitle:
      'Nós garantimos que você obtenha a oferta que precisa com os melhores preços',
    imageUrl: 'https://picsum.photos/seed/specialoffer/400/400',
    link: '/offers/special',
  },

  {
    id: 'banner-22',
    category: BannerCategory.PRODUCTS,
    type: BannerType.PRODUCT_FEATURED,
    title: 'Novidades da Semana',
    legend: 'essa é sua chance, aproveite!',
    productId: sampleProductIds[3]!,
  },

  {
    id: 'banner-4ss',
    category: BannerCategory.OFFERS,
    type: BannerType.OFFER_CTA,
    title: 'Produtos em Alta',
    endDate: Date.now() + 24 * 60 * 60 * 1000,
    cta: {
      label: 'Ver todos',
      link: '/offers/daily',
    },
  },

  {
    id: 'banner-22d',
    category: BannerCategory.PRODUCTS,
    type: BannerType.PRODUCT_SCROLL,
    title: 'Novidades da Semana',
    productIds: sampleProductIds.slice(0, 4),
  },

  {
    id: 'banner-7',
    category: BannerCategory.OFFERS,
    type: BannerType.OFFER_CTA_WITH_BANNER,
    title: 'Plano e Salto',
    subtitle: 'essa é sua chance, aproveite!',
    bannerImageUrl: 'https://picsum.photos/seed/shoesoffer/800/400',
    endDate: Date.now() + 2 * 24 * 60 * 60 * 1000, // 2 dias a partir de agora
    cta: {
      label: 'Ver agora',
      link: '/category/cat-7',
    },
  },

  {
    id: 'banner-5',
    category: BannerCategory.OFFERS,
    type: BannerType.OFFER_ADVERTISEMENT,
    title: 'Patrocinado',
    media: {
      type: 'image',
      url: 'https://picsum.photos/seed/ad1/800/600',
    },
    cta: {
      label: 'Até 50% OFF',
      link: '/brand/sponsor-brand',
    },
  },
]
