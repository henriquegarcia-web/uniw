import { BannerCategory, BannerType, IBanner } from '@uniw/shared-types'

export const sampleProductIds = ['prod-16', 'prod-17', 'prod-2', 'prod-22', 'prod-10']

export const mockBanners: IBanner[] = [
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
    productId: sampleProductIds[3],
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
